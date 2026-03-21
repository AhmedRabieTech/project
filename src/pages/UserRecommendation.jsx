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
        <div className={`recommendation-page bg-light pb-5 text-start`}> {/* Use text-start, which becomes text-end with dir="rtl" */}
            {/* Split Professional Hero */}
            <div className="position-relative bg-white pt-5 pb-5 overflow-hidden border-bottom border-light">
                <div className="container position-relative z-index-1 mt-5 pt-4 pb-5">
                    <div className="row align-items-center">
                        <div className={`col-lg-6 ${isRtl ? 'text-end ps-lg-5' : 'text-start pe-lg-5'}`}>
                            <span className="badge px-3 py-2 rounded-pill mb-4 fw-bold animate__animated animate__fadeInDown d-inline-block shadow" style={{ background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                                <i className="fas fa-sparkles me-2 text-warning"></i> {isRtl ? 'توصيات مدعومة بالذكاء الاصطناعي' : 'AI-Powered Recommendations'}
                            </span>
                            <h1 className="display-4 fw-bold text-dark animate__animated animate__fadeInLeft" style={{ letterSpacing: '-1px', lineHeight: '1.2' }}>
                                {t('recommend.title')}
                            </h1>
                            <p className="lead text-secondary mt-4 mb-5 animate__animated animate__fadeInLeft animate__delay-1s" style={{ fontSize: '1.2rem', lineHeight: '1.7', maxWidth: '600px' }}>
                                {t('recommend.subtitle')}
                            </p>

                            {/* Stacked Minimalist Form */}
                            <form onSubmit={handleRecommend} className="animate__animated animate__fadeInUp animate__delay-1s w-100" style={{ maxWidth: '520px' }}>
                                <div className="mb-4">
                                    <label className="fw-bold fs-6 mb-2 text-dark">{t('recommend.skills_label')}</label>
                                    <div className="position-relative">
                                        <div className={`position-absolute top-50 translate-middle-y ${isRtl ? 'pe-4' : 'ps-4'}`}>
                                            <i className="fas fa-laptop-code text-primary opacity-50"></i>
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg bg-light border-0 py-3 shadow-none focus-ring ${isRtl ? 'pe-5' : 'ps-5'}`}
                                            placeholder={t('recommend.skills_placeholder')}
                                            value={selectedSkills}
                                            onChange={(e) => setSelectedSkills(e.target.value)}
                                            required
                                            style={{ borderRadius: '12px' }}
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="fw-bold fs-6 mb-2 text-dark">{t('recommend.interests_label')}</label>
                                    <div className="position-relative">
                                        <div className={`position-absolute top-50 translate-middle-y ${isRtl ? 'pe-4' : 'ps-4'}`}>
                                            <i className="fas fa-lightbulb text-secondary opacity-50"></i>
                                        </div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg bg-light border-0 py-3 shadow-none focus-ring ${isRtl ? 'pe-5' : 'ps-5'}`}
                                            placeholder={t('recommend.interests_placeholder')}
                                            value={selectedInterests}
                                            onChange={(e) => setSelectedInterests(e.target.value)}
                                            style={{ borderRadius: '12px' }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-bold border-0 hover-translate d-flex align-items-center justify-content-center mt-3"
                                    disabled={isAnalyzing}
                                    style={{ background: 'var(--primary-blue)', borderRadius: '12px', padding: '16px 20px', fontSize: '17px' }}
                                >
                                    {isAnalyzing ? (
                                        <><span className="spinner-border spinner-border-sm me-3" role="status"></span>{isRtl ? 'جاري التحليل...' : 'Analyzing...'}</>
                                    ) : (
                                        <>{t('recommend.button')} <i className={`fas fa-arrow-${isRtl ? 'left' : 'right'} ${isRtl ? 'me-3' : 'ms-3'}`}></i></>
                                    )}
                                </button>
                            </form>
                        </div>
                        
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="position-relative w-100 animate__animated animate__zoomIn" style={{ height: '550px' }}>
                                {/* Abstract Graphic Element */}
                                <div className="position-absolute top-50 start-50 translate-middle w-100 h-100" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)' }}></div>
                                <div className="position-absolute rounded-circle shadow-lg d-flex align-items-center justify-content-center hover-float" style={{ width: '130px', height: '130px', background: '#fff', top: '15%', left: '15%', zIndex: 2, border: '1px solid #f1f5f9' }}>
                                    <i className="fas fa-chart-line text-primary" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <div className="position-absolute rounded-circle shadow-lg d-flex align-items-center justify-content-center hover-float" style={{ width: '180px', height: '180px', background: 'linear-gradient(135deg, #2563eb, #8b5cf6)', top: '35%', right: '10%', zIndex: 3, animationDelay: '0.4s' }}>
                                    <i className="fas fa-brain text-white" style={{ fontSize: '4rem' }}></i>
                                </div>
                                <div className="position-absolute rounded-circle shadow-lg d-flex align-items-center justify-content-center hover-float" style={{ width: '110px', height: '110px', background: '#fff', bottom: '15%', left: '35%', zIndex: 2, border: '1px solid #f1f5f9', animationDelay: '0.8s' }}>
                                    <i className="fas fa-bullseye text-warning" style={{ fontSize: '2.5rem' }}></i>
                                </div>
                                {/* Decorative line paths */}
                                <svg width="100%" height="100%" className="position-absolute top-0 start-0 z-index-0 opacity-25" style={{ pointerEvents: 'none' }}>
                                    <path d="M 80 200 Q 250 100 450 300 T 800 150" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="10 10" />
                                </svg>
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
                            <h3 className="fw-black animate__animated animate__pulse animate__infinite" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {isRtl ? 'جاري تحليل التوافق الذكي وصياغة التوصيات...' : 'Analyzing Patterns & Crafting AI Recommendations...'}
                            </h3>
                            <p className="text-muted mt-2"><i className="fas fa-microchip me-2"></i>CareerPilot AI Engine V2.0</p>
                        </div>
                    ) : (
                        <div className="recommendations-results animate__animated animate__fadeInUp">
                            <div className="text-center mb-5">
                                <span className="badge bg-primary-soft text-primary px-4 py-2 rounded-pill mb-3 fw-bold fs-6 border border-primary border-opacity-25">
                                    <i className="fas fa-check-circle me-2"></i> {isRtl ? 'اكتمل التحليل الذكي' : 'AI Match Complete'}
                                </span>
                                <h2 className="display-5 fw-bold ">{t('recommend.results_title')}</h2>
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
                                                        <div className="d-flex align-items-center mb-2">
                                                            <span className="badge bg-secondary text-white px-3 py-1 rounded-pill">
                                                                <i className="fas fa-layer-group me-1"></i>
                                                                {path.industry}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-white mb-0 fw-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{path.title}</h4>
                                                    </div>
                                                </div>

                                                <div className="card-body p-4 bg-white d-flex flex-column">
                                                    <p className={`text-muted mb-4 ${isRtl ? 'text-end' : 'text-start'}`} style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                                                        {path.description}
                                                    </p>

                                                    <div className="mt-auto">
                                                        <div className={`d-flex align-items-center mb-3 ${isRtl ? 'flex-row-reverse justify-content-between' : 'justify-content-between'}`}>
                                                            <h6 className="fw-bold  mb-0">
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

                                                <div className="card-footer bg-white border-0 mt-auto p-4 pt-2">
                                                    <button className="w-100 rounded-pill py-2 fw-bold" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', border: 'none', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #8b5cf6)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(37, 99, 235, 0.1)'; e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.boxShadow = 'none'; }}>
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
                                            <h3 className="fw-bold  mb-3">{t('recommend.no_matches')}</h3>
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

            <style dangerouslySetInnerHTML={{ __html: `
                .recommendation-page { min-height: 100vh; }
                .hover-translate { transition: all 0.3s ease; }
                .hover-translate:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2) !important; }
                .transform-hover { transition: transform 0.3s ease; }
                .transform-hover:hover { transform: scale(1.1); }
                .bg-primary-soft { background-color: rgba(37, 99, 235, 0.1); }
                .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.04); }
                .fw-black { font-weight: 900; }
                .form-control.focus-ring:focus { box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15) !important; }
                .hover-float { transition: transform 0.3s ease; }
                .hover-float:hover { transform: translateY(-10px); }
                .animate__animated { animation-duration: 0.8s; }
                @media (max-width: 768px) { .display-4 { font-size: 2.2rem; } }
            `}} />
        </div>
    );
};

export default UserRecommendation;
