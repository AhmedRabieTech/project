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
                            <div key={path.id} className="col-lg-4 col-md-6">
                                <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden career-card transition-all hover-translate">
                                    <div className="position-relative overflow-hidden">
                                        <img
                                            src={path.image || getCareerImage(path.id, path.title)}
                                            className="img-fluid w-100 career-img"
                                            style={{ height: '240px', objectFit: 'cover' }}
                                            alt={t(`industries.roles.${path.id}`, path.title)}
                                            onError={handleImageError}
                                        />
                                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
                                        <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white">
                                            <span className="badge bg-primary mb-2 px-3 py-2 rounded-pill shadow-lg" style={{ fontSize: '0.8rem' }}>
                                                {t(`industries.tabs.${path.id}`, path.industry)}
                                            </span>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <h4 className="text-white mb-0 fw-bold">{t(`industries.roles.${path.id}`, path.title)}</h4>
                                                <span className="badge bg-white text-primary rounded-pill small" style={{ fontSize: '0.65rem' }}>{path.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4">
                                        <p className="text-muted mb-4" style={{ height: '72px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                            {t(`industries.roles.${path.id}_desc`, path.description)}
                                        </p>
                                        <div className="mb-4">
                                            <h6 className="fw-bold mb-3 d-flex align-items-center">
                                                <i className={`fas fa-bolt text-warning ${isRtl ? 'ms-2' : 'me-2'}`}></i>
                                                {t('browse.key_skills')}
                                            </h6>
                                            <div className={`d-flex flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                {(path.skills || []).slice(0, 4).map((skill, index) => (
                                                    <span key={index} className="badge bg-light text-primary border border-primary-subtle rounded-pill px-3 py-2" style={{ fontSize: '0.75rem' }}>
                                                        {skill}
                                                    </span>
                                                ))}
                                                {(path.skills || []).length > 4 && (
                                                    <span className="badge bg-light text-muted border rounded-pill px-3 py-2" style={{ fontSize: '0.75rem' }}>
                                                        +{(path.skills || []).length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-transparent border-0 p-4 pt-0">
                                        <div className={`d-flex justify-content-between align-items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                                            <button
                                                onClick={() => handleShowDetails(path)}
                                                className="btn btn-outline-primary rounded-pill px-4 fw-bold hover-fill"
                                                data-bs-toggle="modal"
                                                data-bs-target="#careerDetailsModal"
                                            >
                                                {t('browse.details')}
                                            </button>
                                            <div className="d-flex gap-2">
                                                <Link to="/recommendation" className="btn btn-light rounded-circle shadow-sm" title={t('nav.recommendation')}>
                                                    <i className={`${getFieldIcon(path.industry || path.id || path.category)} text-primary`}></i>
                                                </Link>
                                                {isAdmin && (
                                                    <>
                                                        <button className="btn btn-light rounded-circle shadow-sm text-warning" title="Edit">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(path.id)}
                                                            className="btn btn-light rounded-circle shadow-sm text-danger"
                                                            title="Delete"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </>
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
                                <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center shadow-inner" style={{ width: '120px', height: '120px' }}>
                                    <i className="fas fa-search-minus fa-4x text-muted opacity-50"></i>
                                </div>
                            </div>
                            <h3 className="fw-bold ">{t('browse.no_results')}</h3>
                            <p className="text-muted fs-5">{t('browse.no_results_desc')}</p>
                            <button className="btn btn-primary rounded-pill px-5 py-3 mt-3 fw-bold" onClick={() => { setSearchTerm(''); setSelectedIndustry(''); }}>
                                <i className="fas fa-sync-alt me-2"></i> Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Career Details Modal */}
            <div className="modal fade" id="careerDetailsModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-2xl rounded-4 overflow-hidden">
                        {selectedCareer && (
                            <>
                                <div className="modal-header bg-primary text-white py-4 border-0 position-relative">
                                    <div className="d-flex align-items-center gap-3">
                                        <h5 className="modal-title fw-bold fs-3 pe-5 mb-0">
                                            {t(`industries.roles.${selectedCareer.id}`, selectedCareer.title)}
                                        </h5>
                                        <span className="badge bg-white text-primary rounded-pill">{selectedCareer.level}</span>
                                    </div>
                                    <button type="button" className={`btn-close btn-close-white position-absolute top-50 translate-middle-y ${isRtl ? 'start-0 ms-4' : 'end-0 me-4'}`} data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body p-0">
                                    <div className="position-relative">
                                        <img
                                            src={selectedCareer.image || getCareerImage(selectedCareer.id, selectedCareer.title)}
                                            className="img-fluid w-100"
                                            style={{ height: '320px', objectFit: 'cover' }}
                                            alt={selectedCareer.title}
                                            onError={handleImageError}
                                        />
                                        <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                            <span className="badge bg-primary px-3 py-2 rounded-pill mb-2">{t(`industries.tabs.${selectedCareer.id}`, selectedCareer.industry)}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 p-md-5">
                                        <div className="row g-4">
                                            <div className="col-12 mb-2">
                                                <h5 className="fw-bold border-bottom pb-3 mb-4">{t('admin_panel.label_desc')}</h5>
                                                <p className="text-muted fs-5" style={{ lineHeight: '1.8' }}>
                                                    {t(`industries.roles.${selectedCareer.id}_desc`, selectedCareer.description)}
                                                </p>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-primary shadow-sm">
                                                    <h6 className="text-primary fw-bold text-uppercase mb-3">
                                                        <i className={`fas fa-map-signs ${isRtl ? 'ms-2' : 'me-2'}`}></i> {t('industries.details_modal.roadmap')}
                                                    </h6>
                                                    <p className="mb-0  small">{t(`industries.roles_details.${selectedCareer.id}.roadmap`, 'Defined professional path from junior to senior levels.')}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-success shadow-sm">
                                                    <h6 className="text-success fw-bold text-uppercase mb-3">
                                                        <i className={`fas fa-tools ${isRtl ? 'ms-2' : 'me-2'}`}></i> {t('industries.details_modal.skills')}
                                                    </h6>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {(selectedCareer.skills || []).map((skill, i) => (
                                                            <span key={i} className="badge bg-white text-success border border-success-subtle rounded-pill px-2 py-1">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-warning shadow-sm">
                                                    <h6 className="text-warning fw-bold text-uppercase mb-3">
                                                        <i className={`fas fa-money-bill-wave ${isRtl ? 'ms-2' : 'me-2'}`}></i> {t('industries.details_modal.salary')}
                                                    </h6>
                                                    <p className="mb-0  fw-bold">{t(`industries.roles_details.${selectedCareer.id}.salary`, 'Competitive Market Salary')}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-info shadow-sm">
                                                    <h6 className="text-info fw-bold text-uppercase mb-3">
                                                        <i className={`fas fa-tasks ${isRtl ? 'ms-2' : 'me-2'}`}></i> {t('industries.details_modal.responsibilities')}
                                                    </h6>
                                                    <p className="mb-0  small">{t(`industries.roles_details.${selectedCareer.id}.responsibilities`, 'Key operational tasks and strategic objectives.')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 p-4 pt-0 bg-light">
                                    <button type="button" className="btn btn-secondary rounded-pill px-5 fw-bold shadow-sm" data-bs-dismiss="modal">{t('industries.details_modal.close')}</button>
                                    <Link to="/recommendation" className="btn btn-primary rounded-pill px-5 fw-bold shadow-lg hover-scale" data-bs-dismiss="modal">
                                        {t('hero.search_button')}
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCareerPaths;


