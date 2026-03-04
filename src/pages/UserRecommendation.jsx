import React, { useState, useEffect } from 'react';
import { getCareerPaths } from '../utils/storage';
import { useTranslation } from 'react-i18next';
import { getCareerImage } from '../utils/images';

const UserRecommendation = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const [allPaths, setAllPaths] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState('');
    const [selectedInterests, setSelectedInterests] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        setAllPaths(getCareerPaths());
    }, []);

    const handleRecommend = (e) => {
        e.preventDefault();
        setIsAnalyzing(true);
        setIsSubmitted(false);

        // Simulate AI analysis delay for premium feel
        setTimeout(() => {
            const skillsArr = selectedSkills.toLowerCase().split(',').map(s => s.trim()).filter(s => s !== '');
            const interestsArr = selectedInterests.toLowerCase().split(',').map(i => i.trim()).filter(i => i !== '');

            const matches = allPaths.map(path => {
                let score = 0;

                // Skill matches
                path.skills.forEach(skill => {
                    if (skillsArr.includes(skill.toLowerCase())) {
                        score += 5; // Weighted more for skills
                    }
                });

                // Interest/Industry matches
                if (interestsArr.includes(path.industry.toLowerCase())) {
                    score += 4;
                }

                // Description match
                interestsArr.forEach(interest => {
                    if (path.description.toLowerCase().includes(interest)) {
                        score += 2;
                    }
                });

                // Normalize score to max 100 for display (Approximation based on max typical score)
                const maxPossible = 20;
                let matchPercentage = Math.min(100, Math.round((score / maxPossible) * 100 + (score > 0 ? 40 : 0)));

                return { ...path, score, matchPercentage };
            })
                .filter(path => path.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 6); // Display top 6 recommendations

            setRecommendations(matches);
            setIsAnalyzing(false);
            setIsSubmitted(true);

            // Scroll to results smoothly
            setTimeout(() => {
                document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);

        }, 1500); // 1.5 seconds delay for visual feedback
    };

    return (
        <div className={`recommendation-page bg-light pb-5 ${isRtl ? 'text-end' : 'text-start'}`}>
            {/* Dynamic Hero Section */}
            <div className="position-relative overflow-hidden pt-5" style={{ background: 'linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%)', minHeight: '500px' }}>
                {/* Decorative background circles */}
                <div className="position-absolute rounded-circle" style={{ width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', top: '-100px', right: '-100px' }}></div>
                <div className="position-absolute rounded-circle" style={{ width: '300px', height: '300px', background: 'rgba(0,168,204,0.1)', bottom: '-50px', left: '-50px' }}></div>

                <div className="container position-relative z-index-1 mt-5 pt-5 pb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="display-4 text-white fw-bold mb-4 animate__animated animate__fadeInDown">
                                <i className="fas fa-compass mb-3 d-block text-secondary" style={{ fontSize: '3rem' }}></i>
                                {t('recommend.title')}
                            </h1>
                            <p className="lead text-white-50 mb-5 animate__animated animate__fadeInUp animate__delay-1s">
                                {t('recommend.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Glassmorphism Interactive Form */}
            <div className="container position-relative" style={{ marginTop: '-120px', zIndex: 10 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-9 text-center animate__animated animate__zoomIn">
                        <div className="card border-0 shadow-2xl rounded-4" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)' }}>
                            <div className="card-body p-4 p-md-5">
                                <form onSubmit={handleRecommend}>
                                    <div className="row g-4 justify-content-center">
                                        <div className="col-md-6">
                                            <div className="form-group text-start">
                                                <label className={`form-label fw-bold text-dark mb-3 px-1 fs-5 ${isRtl ? 'w-100 text-end' : ''}`}>
                                                    <div className={`d-inline-flex align-items-center justify-content-center text-white bg-primary rounded-circle shadow-sm ${isRtl ? 'ms-2' : 'me-2'}`} style={{ width: '35px', height: '35px' }}>
                                                        <i className="fas fa-laptop-code small"></i>
                                                    </div>
                                                    {t('recommend.skills_label')}
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control form-control-lg border-2 bg-light shadow-inner rounded-3 py-3 ${isRtl ? 'text-end' : ''}`}
                                                    placeholder={t('recommend.skills_placeholder')}
                                                    value={selectedSkills}
                                                    onChange={(e) => setSelectedSkills(e.target.value)}
                                                    required
                                                    style={{ transition: 'all 0.3s ease' }}
                                                />
                                                <small className={`text-muted mt-2 d-block ${isRtl ? 'text-end' : 'text-start'}`}>
                                                    <i className={`fas fa-info-circle opacity-50 ${isRtl ? 'ms-1' : 'me-1'}`}></i> {t('recommend.skills_hint')}
                                                </small>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group text-start">
                                                <label className={`form-label fw-bold text-dark mb-3 px-1 fs-5 ${isRtl ? 'w-100 text-end' : ''}`}>
                                                    <div className={`d-inline-flex align-items-center justify-content-center text-white bg-secondary rounded-circle shadow-sm ${isRtl ? 'ms-2' : 'me-2'}`} style={{ width: '35px', height: '35px' }}>
                                                        <i className="fas fa-lightbulb small"></i>
                                                    </div>
                                                    {t('recommend.interests_label')}
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control form-control-lg border-2 bg-light shadow-inner rounded-3 py-3 ${isRtl ? 'text-end' : ''}`}
                                                    placeholder={t('recommend.interests_placeholder')}
                                                    value={selectedInterests}
                                                    onChange={(e) => setSelectedInterests(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 mt-5">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold text-white shadow-lg w-100 w-md-75 hover-translate"
                                                disabled={isAnalyzing}
                                                style={{ background: 'linear-gradient(45deg, var(--primary), var(--secondary))', border: 'none', letterSpacing: '1px' }}
                                            >
                                                {isAnalyzing ? (
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                ) : (
                                                    <i className={`fas fa-magic ${isRtl ? 'ms-2' : 'me-2'}`}></i>
                                                )}
                                                {isAnalyzing ? (isRtl ? 'جاري التحليل المعرفي...' : 'Synthesizing Data...') : t('recommend.button')}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {(isSubmitted || isAnalyzing) && (
                <div id="results-section" className="container py-5 mt-5">
                    {isAnalyzing ? (
                        <div className="text-center py-5">
                            <div className="spinner-grow text-primary mb-4" style={{ width: '4rem', height: '4rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <h3 className="fw-bold text-dark animate__animated animate__pulse animate__infinite">
                                {isRtl ? 'جاري تحليل ذكاء الأعمال وصياغة التوصيات...' : 'Analyzing Patterns & Crafting Recommendations...'}
                            </h3>
                            <p className="text-muted mt-2"><i className="fas fa-microchip me-2"></i>CareerPilot AI Engine V2.0</p>
                        </div>
                    ) : (
                        <div className="recommendations-results animate__animated animate__fadeInUp">
                            <div className="text-center mb-5">
                                <span className="badge bg-primary-soft text-primary px-4 py-2 rounded-pill mb-3 fw-bold fs-6 border border-primary border-opacity-25">
                                    <i className="fas fa-check-circle me-2"></i> {isRtl ? 'اكتمل التحليل الذكي' : 'AI Match Complete'}
                                </span>
                                <h2 className="display-5 fw-bold text-dark">{t('recommend.results_title')}</h2>
                                <div className="mx-auto mt-3" style={{ width: '60px', height: '4px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                            </div>

                            <div className="row g-4 justify-content-center">
                                {recommendations.length > 0 ? (
                                    recommendations.map((path, idx) => (
                                        <div key={path.id} className="col-xl-4 col-md-6 animate__animated animate__fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                                            <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden"
                                                style={{ transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
                                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(42, 82, 190, 0.15)'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; }}>

                                                <div className="position-relative overflow-hidden">
                                                    <img
                                                        src={getCareerImage(path.id)}
                                                        className="img-fluid w-100"
                                                        style={{ height: '240px', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                        alt={path.title}
                                                    />
                                                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)' }}></div>

                                                    {/* Match Badge */}
                                                    <div className={`position-absolute top-0 ${isRtl ? 'start-0' : 'end-0'} m-3`}>
                                                        <div className="bg-white rounded-circle d-flex flex-column align-items-center justify-content-center shadow-lg transform-hover" style={{ width: '70px', height: '70px', border: `4px solid ${path.matchPercentage >= 80 ? '#10b981' : path.matchPercentage >= 60 ? '#f59e0b' : '#3b82f6'}` }}>
                                                            <span className="fw-black fs-5 mb-0" style={{ color: path.matchPercentage >= 80 ? '#10b981' : path.matchPercentage >= 60 ? '#f59e0b' : '#3b82f6', fontWeight: '900' }}>
                                                                {path.matchPercentage}%
                                                            </span>
                                                            <span className="text-muted" style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>{t('recommend.match')}</span>
                                                        </div>
                                                    </div>

                                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 pb-3 text-white">
                                                        <div className={`d-flex align-items-center mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                            <span className="badge bg-secondary text-white px-3 py-1 rounded-pill">
                                                                <i className={`fas fa-layer-group ${isRtl ? 'ms-1' : 'me-1'}`}></i>
                                                                {path.industry}
                                                            </span>
                                                        </div>
                                                        <h4 className={`text-white mb-0 fw-bold ${isRtl ? 'text-end' : 'text-start'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{path.title}</h4>
                                                    </div>
                                                </div>

                                                <div className="card-body p-4 bg-white d-flex flex-column">
                                                    <p className={`text-muted mb-4 ${isRtl ? 'text-end' : 'text-start'}`} style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                                                        {path.description}
                                                    </p>

                                                    <div className="mt-auto">
                                                        <div className={`d-flex align-items-center mb-3 ${isRtl ? 'flex-row-reverse justify-content-between' : 'justify-content-between'}`}>
                                                            <h6 className="fw-bold text-dark mb-0">
                                                                <i className={`fas fa-star text-warning ${isRtl ? 'ms-2' : 'me-2'}`}></i>
                                                                {t('recommend.matching_skills')}
                                                            </h6>
                                                        </div>

                                                        <div className={`d-flex flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                            {path.skills.map((skill, index) => {
                                                                const isMatch = selectedSkills.toLowerCase().includes(skill.toLowerCase());
                                                                return (
                                                                    <span key={index} className={`badge rounded-pill px-3 py-2 fw-medium border ${isMatch ? 'bg-primary text-white border-primary shadow-sm' : 'bg-light text-secondary border-light'}`} style={{ fontSize: '0.85rem' }}>
                                                                        {isMatch && <i className={`fas fa-check-circle ${isRtl ? 'ms-1' : 'me-1'}`}></i>}
                                                                        {skill}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-footer bg-white border-top border-light p-4 pt-3">
                                                    <button className="btn btn-outline-primary w-100 rounded-pill py-2 fw-bold hover-fill border-2" style={{ transition: 'all 0.3s ease' }}>
                                                        {t('industries.actions.explore')} <i className={`fas fa-arrow-${isRtl ? 'left' : 'right'} ${isRtl ? 'me-2' : 'ms-2'}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-lg-8 animate__animated animate__zoomIn">
                                        <div className="card border-0 shadow-lg rounded-4 p-5 text-center bg-white" style={{ borderTop: '5px solid var(--accent) !important' }}>
                                            <div className="mx-auto bg-light rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '100px', height: '100px' }}>
                                                <i className="fas fa-search-minus fa-3x text-muted opacity-50"></i>
                                            </div>
                                            <h3 className="fw-bold text-dark mb-3">{t('recommend.no_matches')}</h3>
                                            <p className="text-muted lead mb-4">{t('recommend.no_matches_desc')}</p>
                                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm hover-translate">
                                                <i className={`fas fa-redo ${isRtl ? 'ms-2' : 'me-2'}`}></i>
                                                {isRtl ? 'حاول مجدداً بمعايير مختلفة' : 'Try Again with Different Criteria'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style jsx="true">{`
                .recommendation-page {
                    min-height: 100vh;
                }
                .hover-translate {
                    transition: all 0.3s ease;
                }
                .hover-translate:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(42, 82, 190, 0.3) !important;
                }
                .transform-hover {
                    transition: transform 0.3s ease;
                }
                .transform-hover:hover {
                    transform: scale(1.1);
                }
                .bg-primary-soft {
                    background-color: rgba(42, 82, 190, 0.1);
                }
                .shadow-inner {
                    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04);
                }
                .fw-black {
                    font-weight: 900;
                }
                .form-control:focus {
                    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04), 0 0 0 4px rgba(42, 82, 190, 0.1) !important;
                    border-color: var(--primary) !important;
                    background-color: #fff !important;
                }
                .animate__animated {
                    animation-duration: 0.8s;
                }
                @media (max-width: 768px) {
                    .display-4 {
                        font-size: 2.2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default UserRecommendation;
