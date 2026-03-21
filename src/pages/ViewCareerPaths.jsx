import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsService } from '../services/jobsService';
import { useDebounce } from '../hooks/useDebounce';
import { authService } from '../services/authService';
import { useTranslation } from 'react-i18next';
import { getCareerImage, DEFAULT_CAREER_IMAGE } from '../utils/images';

const ViewCareerPaths = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const [paths, setPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedCareer, setSelectedCareer] = useState(null);
    const isAdmin = authService.isAdmin();

    // Use debounced search term to avoid excessive re-filtering
    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        setLoading(true);
        try {
            const data = await jobsService.fetchJobs();
            setPaths(data);
        } catch (error) {
            console.error("Failed to load jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t('browse.confirm_delete'))) {
            await jobsService.deleteJob(id);
            loadJobs();
        }
    };

    const handleShowDetails = (path) => {
        setSelectedCareer(path);
    };

    const handleImageError = (e) => {
        e.target.onerror = null; // Prevent infinite loop
        e.target.src = DEFAULT_CAREER_IMAGE;
    };

    const getFieldIcon = (industry) => {
        const ind = (industry || '').toLowerCase();
        if (ind.includes('software') || ind.includes('engineering') || ind.includes('dev')) return 'fas fa-laptop-code';
        if (ind.includes('data') || ind.includes('science') || ind.includes('analysis')) return 'fas fa-chart-pie';
        if (ind.includes('marketing') || ind.includes('advertising') || ind.includes('market')) return 'fas fa-bullhorn';
        if (ind.includes('design') || ind.includes('creative') || ind.includes('ui') || ind.includes('ux')) return 'fas fa-palette';
        return 'fas fa-briefcase';
    };

    // Dynamically derive industry list from current data
    const industries = jobsService.getUniqueCategories(paths);

    const filteredPaths = paths.filter(path => {
        const translatedTitle = t(`industries.roles.${path.id}`, path.title);
        const translatedIndustry = t(`industries.tabs.${path.id}`, path.industry);

        const matchesSearch = (path.title || '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            (translatedTitle || '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            (path.skills || []).some(skill => skill.toLowerCase().includes(debouncedSearch.toLowerCase()));

        const matchesIndustry = selectedIndustry === '' ||
            path.industry === selectedIndustry ||
            translatedIndustry === selectedIndustry ||
            (path.industry === 'Software Engineering' && selectedIndustry === t('industries.tabs.dev')) ||
            (path.industry === 'Data Science' && selectedIndustry === t('industries.tabs.data')) ||
            (path.industry === 'Strategic Marketing' && selectedIndustry === t('industries.tabs.marketing')) ||
            (path.industry === 'Creative Design' && selectedIndustry === t('industries.tabs.design'));

        return matchesSearch && matchesIndustry;
    });

    return (
        <div className={`container-fluid py-5 mt-5 ${isRtl ? 'text-end' : 'text-start'}`}>
            <div className="container py-5">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
                    <h1 className="display-3 text-primary fw-extra-bold mb-3" style={{ letterSpacing: '-1px' }}>
                        {t('browse.title')}
                    </h1>
                    <p className="lead text-muted px-lg-5">{t('browse.subtitle')}</p>
                </div>

                {/* Unified Search Section */}
                <div className="mb-5">
                    <div className="unified-search-container">
                        <div className="search-input-group">
                            <i className="fas fa-search text-primary"></i>
                            <input
                                type="text"
                                className="premium-input"
                                placeholder={t('browse.search_placeholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="dropdown-input-group">
                            <i className="fas fa-filter text-primary me-2 ms-0 ms-rtl-2"></i>
                            <select
                                className="premium-select-inline"
                                value={selectedIndustry}
                                onChange={(e) => setSelectedIndustry(e.target.value)}
                            >
                                <option value="">{t('browse.all_industries')}</option>
                                {industries.map(ind => (
                                    <option key={ind} value={ind}>{ind}</option>
                                ))}
                            </select>
                        </div>
                        <div className="p-1">
                            {isAdmin ? (
                                <Link to="/add-career" className="btn btn-primary unified-search-btn h-100 d-flex align-items-center">
                                    <i className={`fas fa-plus ${isRtl ? 'ms-2' : 'me-2'}`}></i> {t('browse.add_new')}
                                </Link>
                            ) : (
                                <button
                                    className="btn btn-primary unified-search-btn h-100"
                                    onClick={loadJobs}
                                >
                                    <i className={`fas fa-sync ${isRtl ? 'ms-2' : 'me-2'}`}></i> {t('hero.search_button')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results Grid or Loading State */}
                <div className="row g-4 min-vh-50">
                    {loading ? (
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3 text-muted fw-bold">تحميل المسارات المهنية...</p>
                        </div>
                    ) : filteredPaths.length > 0 ? (
                        filteredPaths.map((path) => (
                            <div key={path.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item career-card-main transition-all">
                                    <div className="position-relative overflow-hidden">
                                        <img
                                            src={getCareerImage(path.id)}
                                            className="img-fluid w-100"
                                            style={{ height: '230px', objectFit: 'cover' }}
                                            alt={path.title}
                                            onError={handleImageError}
                                        />
                                        <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>
                                            {path.industry}
                                        </div>
                                    </div>
                                    <div className="card-body p-4 d-flex flex-column text-start">
                                        <h4 className="fw-bold mb-3">{t(`industries.roles.${path.id}`, path.title)}</h4>
                                        {/* Description matches Home page's roles_desc style */}
                                        <p className="text-muted small mb-4 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {path.description}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            {(() => {
                                                const id = path.id;
                                                const statusKey = ['fullstack', 'frontend', 'backend', 'ml_engineer', 'data_scientist'].includes(id) ? 'high_growth' : 
                                                                ['analyst', 'android', 'uiux', 'devops', 'seo'].includes(id) ? 'in_demand' : 'diverse';
                                                const statusClass = statusKey === 'high_growth' ? 'bg-primary-soft text-primary' : 
                                                                  statusKey === 'in_demand' ? 'bg-info-soft text-info' : 'bg-warning-soft text-warning';
                                                
                                                return <span className={`badge ${statusClass} px-3 py-2 rounded-pill fw-bold`}>{t(`industries.categories.${statusKey}`)}</span>;
                                            })()}
                                            <div className="d-flex align-items-center gap-2">
                                                <button
                                                    onClick={() => handleShowDetails(path)}
                                                    className="btn btn-outline-primary rounded-pill px-3 fw-bold"
                                                >
                                                    {t('industries.actions.details')}
                                                </button>
                                                {isAdmin && (
                                                    <button
                                                        className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{ width: '32px', height: '32px' }}
                                                        onClick={() => handleDelete(path.id)}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <div className="mb-4">
                                <i className="fas fa-search-minus fa-4x text-muted opacity-25"></i>
                            </div>
                            <h3>{t('browse.no_results')}</h3>
                            <p className="text-muted">{t('browse.no_results_desc')}</p>
                            <button
                                className="btn btn-primary rounded-pill px-4 mt-3"
                                onClick={() => { setSearchTerm(''); setSelectedIndustry(''); }}
                            >
                                {t('browse.clear_filters')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Career Details Modal - Matched with Home Page Design */}
            {selectedCareer && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 2000 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 shadow-2xl rounded-4 overflow-hidden">
                            <div className="modal-header bg-primary py-4 rounded-top-4 border-0 shadow-sm">
                                <h5 className="modal-title fw-black fs-2 text-white">
                                    {t(`industries.roles.${selectedCareer.id}`, selectedCareer.title)}
                                </h5>
                                {/* Close X removed as requested */}
                            </div>
                            <div className="modal-body p-0">
                                <div className="career-modal-content">
                                    <div className="position-relative">
                                        <img
                                            src={getCareerImage(selectedCareer.id)}
                                            className="img-fluid w-100"
                                            style={{ height: '300px', objectFit: 'cover' }}
                                            alt={selectedCareer.title}
                                            onError={handleImageError}
                                        />
                                        <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}>
                                            <h3 className="fw-black mb-0 text-white shadow-sm">{t(`industries.roles.${selectedCareer.id}`, selectedCareer.title)}</h3>
                                            <span className="badge bg-primary mt-2 border border-white border-opacity-25 px-3 py-2">{selectedCareer.industry}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 p-md-5">
                                        {/* Description */}
                                        <div className="mb-5">
                                            <p className="text-secondary fs-5" style={{ lineHeight: '1.7' }}>
                                                {selectedCareer.description}
                                            </p>
                                        </div>

                                        <div className="row g-4">
                                            {(() => {
                                                const detailKey = selectedCareer.id === 'fullstack' ? 'software' :
                                                    selectedCareer.id === 'analyst' ? 'data' :
                                                        selectedCareer.id === 'marketing_spec' ? 'marketing' :
                                                            selectedCareer.id;

                                                return (
                                                    <>
                                                        <div className="col-md-6">
                                                            <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-primary">
                                                                <h6 className="text-primary fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                                                                    <i className="fas fa-route me-2"></i> {t('industries.details_modal.roadmap')}
                                                                </h6>
                                                                <p className="mb-0 text-dark small fw-medium" style={{ lineHeight: '1.6' }}>
                                                                    {t(`industries.roles_details.${detailKey}.roadmap`)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-success">
                                                                <h6 className="text-success fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                                                                    <i className="fas fa-tools me-2"></i> {t('industries.details_modal.skills')}
                                                                </h6>
                                                                <p className="mb-0 text-dark small fw-medium" style={{ lineHeight: '1.6' }}>
                                                                    {t(`industries.roles_details.${detailKey}.skills`)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-warning">
                                                                <h6 className="text-warning fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                                                                    <i className="fas fa-money-bill-wave me-2"></i> {t('industries.details_modal.salary')}
                                                                </h6>
                                                                <p className="mb-0 text-dark fw-bold" style={{ fontSize: '1.1rem' }}>
                                                                    {t(`industries.roles_details.${detailKey}.salary`)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-info">
                                                                <h6 className="text-info fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                                                                    <i className="fas fa-tasks me-2"></i> {t('industries.details_modal.responsibilities')}
                                                                </h6>
                                                                <p className="mb-0 text-dark small fw-medium" style={{ lineHeight: '1.6' }}>
                                                                    {t(`industries.roles_details.${detailKey}.responsibilities`)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                    <div className="modal-footer border-0 p-4 pt-0">
                                        <button type="button" className="btn btn-secondary btn-close-hover rounded-pill px-5 fw-bold transition-all" onClick={() => setSelectedCareer(null)}>
                                            {t('industries.details_modal.close')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx="true">{`
                .career-card-main {
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    position: relative;
                    z-index: 1;
                    cursor: pointer;
                }
                .career-card-main:hover {
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
                    transform: translateY(-8px);
                    z-index: 5;
                }
                .fw-black { font-weight: 900; }
                .text-slate-dark { color: #1e293b; }
                .hover-primary:hover { color: #2a52be !important; }
                .btn-close-hover:hover { 
                    background-color: #dc3545 !important; 
                    border-color: #dc3545 !important; 
                    color: white !important;
                    transform: scale(1.05);
                }
                .tracking-widest { letter-spacing: 0.1em; }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
                .shadow-primary-sm { box-shadow: 0 4px 10px rgba(42, 82, 190, 0.2); }
                .bg-primary-soft { background-color: rgba(42, 82, 190, 0.1); }
                .bg-info-soft { background-color: rgba(13, 202, 240, 0.1); }
                .bg-warning-soft { background-color: rgba(255, 193, 7, 0.1); }
                
                .detail-card {
                    border-radius: 24px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid transparent;
                }

                .premium-card-blue { background: linear-gradient(135deg, rgba(42, 82, 190, 0.05), rgba(42, 82, 190, 0.12)); border-color: rgba(42, 82, 190, 0.1); }
                .premium-card-purple { background: linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(147, 51, 234, 0.12)); border-color: rgba(147, 51, 234, 0.1); }
                .premium-card-teal { background: linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(20, 184, 166, 0.12)); border-color: rgba(20, 184, 166, 0.1); }

                .icon-wrapper-blue { width: 45px; height: 45px; background: #2a52be; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(42, 82, 190, 0.2); }
                .icon-wrapper-purple { width: 45px; height: 45px; background: #9333ea; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(147, 51, 234, 0.2); }
                .icon-wrapper-teal { width: 45px; height: 45px; background: #14b8a6; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px rgba(20, 184, 166, 0.2); }

                .text-dark-blue { color: #1e3a8a; }
                .text-dark-purple { color: #581c87; }
                .text-dark-teal { color: #0f766e; }

                .detail-card:hover { transform: translateX(10px); background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }

                .hover-primary:hover { background: #2a52be !important; color: #fff !important; }
                .animate__delay-100ms { animation-delay: 0.1s; }
                .animate__delay-200ms { animation-delay: 0.2s; }
                
                @media (max-width: 991px) {
                    .modal-dialog { margin: 0.5rem; }
                    .fs-2 { font-size: 1.5rem !important; }
                }
                .hover-translate {
                    transition: all 0.3s ease;
                }
                .hover-translate:hover {
                    transform: translateX(5px);
                }
                .premium-input {
                    border: none;
                    background: transparent;
                    width: 100%;
                    padding: 8px;
                    outline: none;
                }
                .premium-select-inline {
                    border: none;
                    background: transparent;
                    width: 100%;
                    padding: 8px;
                    outline: none;
                    cursor: pointer;
                }
                .unified-search-container {
                    display: flex;
                    align-items: center;
                    background: white;
                    border-radius: 50px;
                    padding: 8px 15px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    max-width: 900px;
                    margin: 0 auto;
                }
                .search-input-group {
                    flex: 2;
                    display: flex;
                    align-items: center;
                    padding: 0 15px;
                    border-right: 1px solid #eee;
                }
                .dropdown-input-group {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding: 0 15px;
                }
                @media (max-width: 768px) {
                    .unified-search-container {
                        flex-direction: column;
                        border-radius: 20px;
                    }
                    .search-input-group {
                        border-right: none;
                        border-bottom: 1px solid #eee;
                        width: 100%;
                        padding: 10px;
                    }
                    .dropdown-input-group {
                        width: 100%;
                        padding: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ViewCareerPaths;
