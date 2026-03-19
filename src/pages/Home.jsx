import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCareerImage } from '../utils/images';

const Home = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const [selectedCareer, setSelectedCareer] = useState(null);

    const handleShowDetails = (roleKey) => {
        setSelectedCareer(roleKey);
    };

    React.useEffect(() => {
        const carouselEl = document.getElementById('heroCarousel');
        if (carouselEl && window.bootstrap) {
            const carousel = new window.bootstrap.Carousel(carouselEl, {
                interval: 3000,
                ride: 'carousel'
            });
            carousel.cycle();
        }
    }, [isRtl]);

    return (
        <div className={`home-page ${isRtl ? 'text-end' : 'text-start'}`}>
            {/* Hero Section */}
            <div className="container-fluid px-0 hero-header overflow-hidden">
                <div className="container-fluid px-lg-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7 d-flex flex-column align-items-center text-center">
                            <h4 className="mb-3 text-secondary fw-bold" style={{ letterSpacing: '2px' }}>{t('hero.subtitle')}</h4>
                            <h1 className="mb-4 display-3 text-primary fw-extra-bold" style={{ lineHeight: '1.2' }}>{t('hero.title')}</h1>
                            <p className="fs-5 mb-5 w-100 mx-auto" style={{ maxWidth: '600px' }}>{t('hero.description')}</p>

                            <div className="search-container mt-2 w-100 mx-auto" style={{ maxWidth: '700px' }}>
                                <div className="search-wrapper d-flex align-items-center bg-white rounded-pill shadow-xl p-2 border border-2 border-primary">
                                    <div className={isRtl ? 'pe-4' : 'ps-4'}>
                                        <i className="fas fa-search text-primary fs-4"></i>
                                    </div>
                                    <input
                                        type="text"
                                        className={`form-control border-0 bg-transparent py-3 ${isRtl ? 'text-end' : ''}`}
                                        placeholder={t('hero.search_placeholder')}
                                        style={{ fontSize: '1.2rem', boxShadow: 'none' }}
                                    />
                                    <button className="btn btn-primary rounded-pill h-100 px-5 fw-bold ms-auto transition-all shadow-lg hover-scale">
                                        {t('hero.search_button')}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={`col-12 col-lg-5 ${isRtl ? 'ps-lg-5' : 'pe-lg-5'} mt-5 mt-lg-0`}>
                            <div id="heroCarousel" className="carousel slide shadow-2xl rounded-4 overflow-hidden border border-primary border-4" data-bs-ride="carousel" data-bs-interval="3000">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
                                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
                                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
                                </div>
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active rounded" data-bs-interval="3000">
                                        <div className="position-relative">
                                            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80" className="img-fluid w-100 bg-secondary hero-slide-img" alt="Career" />
                                            <div className={`position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white d-flex align-items-center gap-4 transition-all ${isRtl ? 'flex-row-reverse text-end' : 'text-start'}`}
                                                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(6px)' }}>
                                                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-lg" style={{ width: '55px', height: '55px', opacity: 0.9 }}>
                                                    <i className="fas fa-rocket text-white fa-lg"></i>
                                                </div>
                                                <div style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                                    <p className="mb-1 fw-bold" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>{t('hero.carousel.empowering')}</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: '1rem', fontWeight: '500' }}>{t('hero.carousel.career_step')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item rounded" data-bs-interval="3000">
                                        <div className="position-relative">
                                            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80" className="img-fluid w-100 bg-secondary hero-slide-img" alt="Success" />
                                            <div className={`position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white d-flex align-items-center gap-4 transition-all ${isRtl ? 'flex-row-reverse text-end' : 'text-start'}`}
                                                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(6px)' }}>
                                                <div className="bg-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-lg" style={{ width: '55px', height: '55px', opacity: 0.9 }}>
                                                    <i className="fas fa-check-double text-white fa-lg"></i>
                                                </div>
                                                <div style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                                    <p className="mb-1 fw-bold" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>{t('hero.carousel.promising')}</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: '1rem', fontWeight: '500' }}>{t('hero.carousel.success_path')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item rounded" data-bs-interval="3000">
                                        <div className="position-relative">
                                            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80" className="img-fluid w-100 bg-secondary hero-slide-img" alt="Consultation" />
                                            <div className={`position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white d-flex align-items-center gap-4 transition-all ${isRtl ? 'flex-row-reverse text-end' : 'text-start'}`}
                                                style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(6px)' }}>
                                                <div className="bg-info rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-lg" style={{ width: '55px', height: '55px', opacity: 0.9 }}>
                                                    <i className="fas fa-user-tie text-white fa-lg"></i>
                                                </div>
                                                <div style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                                    <p className="mb-1 fw-bold" style={{ fontSize: '1.5rem', letterSpacing: '0.5px' }}>{t('hero.carousel.guidance')}</p>
                                                    <p className="mb-0 text-white" style={{ fontSize: '1rem', fontWeight: '500' }}>{t('hero.carousel.expert_talk')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">{t('hero.carousel.prev')}</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">{t('hero.carousel.next')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container-fluid py-5 bg-white position-relative" style={{ zIndex: 10, marginTop: '-60px' }}>
                <div className="container py-lg-4">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded-4 bg-white p-5 shadow-lg border-0 h-100 transition-all hover-translate">
                                <div className="featurs-icon btn-square rounded-circle bg-primary-soft mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '90px', height: '90px' }}>
                                    <i className="fas fa-graduation-cap fa-3x text-primary"></i>
                                </div>
                                <div className="featurs-content">
                                    <h5 className="fw-bold mb-3">{t('features.growth.title')}</h5>
                                    <p className="mb-0 text-muted small px-3">{t('features.growth.desc')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded-4 bg-white p-5 shadow-lg border-0 h-100 transition-all hover-translate">
                                <div className="featurs-icon btn-square rounded-circle bg-primary-soft mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '90px', height: '90px' }}>
                                    <i className="fas fa-user-shield fa-3x text-primary"></i>
                                </div>
                                <div className="featurs-content">
                                    <h5 className="fw-bold mb-3">{t('features.secure.title')}</h5>
                                    <p className="mb-0 text-muted small px-3">{t('features.secure.desc')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded-4 bg-white p-5 shadow-lg border-0 h-100 transition-all hover-translate">
                                <div className="featurs-icon btn-square rounded-circle bg-primary-soft mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '90px', height: '90px' }}>
                                    <i className="fas fa-brain fa-3x text-primary"></i>
                                </div>
                                <div className="featurs-content">
                                    <h5 className="fw-bold mb-3">{t('features.ai.title')}</h5>
                                    <p className="mb-0 text-muted small px-3">{t('features.ai.desc')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded-4 bg-white p-5 shadow-lg border-0 h-100 transition-all hover-translate">
                                <div className="featurs-icon btn-square rounded-circle bg-primary-soft mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: '90px', height: '90px' }}>
                                    <i className="fas fa-headset fa-3x text-primary"></i>
                                </div>
                                <div className="featurs-content">
                                    <h5 className="fw-bold mb-3">{t('features.support.title')}</h5>
                                    <p className="mb-0 text-muted small px-3">{t('features.support.desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Industries Section */}
            <div className={`container-fluid py-5 bg-light ${isRtl ? 'text-end' : 'text-start'}`}>
                <div className="container py-5">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
                        <h1 className="display-4 fw-bold">{t('industries.title')}</h1>
                        <p className="text-muted fs-5">{t('industries.subtitle')}</p>
                    </div>
                    <div className="tab-class text-center">
                        <div className="d-flex justify-content-center mb-5 overflow-auto pb-3">
                            <ul className="nav nav-pills d-inline-flex text-center bg-white shadow-sm p-2 rounded-pill flex-wrap flex-md-nowrap justify-content-center">
                                <li className="nav-item">
                                    <a className="nav-link rounded-pill active px-4 fw-bold" data-bs-toggle="pill" href="#tab-1">{t('industries.tabs.all')}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link rounded-pill px-4 fw-bold" data-bs-toggle="pill" href="#tab-2">{t('industries.tabs.dev')}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link rounded-pill px-4 fw-bold" data-bs-toggle="pill" href="#tab-3">{t('industries.tabs.data')}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link rounded-pill px-4 fw-bold" data-bs-toggle="pill" href="#tab-4">{t('industries.tabs.marketing')}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link rounded-pill px-4 fw-bold" data-bs-toggle="pill" href="#tab-5">{t('industries.tabs.design')}</a>
                                </li>
                            </ul>
                        </div>
                        <div className={`tab-content ${isRtl ? 'text-end' : 'text-start'}`}>
                            {/* Tab 1: All (Non-Software) */}
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('data')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Analysis"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.data')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.analyst')}</h4>
                                                <p className="text-muted small">{t('industries.roles.analyst_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-info-soft text-info px-3 py-2 rounded-pill">{t('industries.categories.in_demand')}</span>
                                                    <button
                                                        onClick={() => handleShowDetails('data')}
                                                        className="btn btn-outline-primary rounded-pill px-3 fw-bold"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#careerDetailsModal"
                                                    >
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('marketing')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Marketing Strategy"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.marketing')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.marketing_spec')}</h4>
                                                <p className="text-muted small">{t('industries.roles.marketing_spec_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-warning-soft text-warning px-3 py-2 rounded-pill">{t('industries.categories.diverse')}</span>
                                                    <button
                                                        onClick={() => handleShowDetails('marketing')}
                                                        className="btn btn-outline-primary rounded-pill px-3 fw-bold"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#careerDetailsModal"
                                                    >
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('android')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Android Developer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.software')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.android')}</h4>
                                                <p className="text-muted small">{t('industries.roles.android_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-success-soft text-success px-3 py-2 rounded-pill">{t('industries.categories.in_demand')}</span>
                                                    <button
                                                        onClick={() => handleShowDetails('android')}
                                                        className="btn btn-outline-primary rounded-pill px-3 fw-bold"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#careerDetailsModal"
                                                    >
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tab 2: Software Engineering */}
                            <div id="tab-2" className="tab-pane fade p-0">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('frontend')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Frontend Developer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.software')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.frontend')}</h4>
                                                <p className="text-muted small">{t('industries.roles.frontend_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-success-soft text-success px-3 py-2 rounded-pill">{t('industries.categories.in_demand')}</span>
                                                    <button onClick={() => handleShowDetails('frontend')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('backend')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Backend Developer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.software')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.backend')}</h4>
                                                <p className="text-muted small">{t('industries.roles.backend_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill">{t('industries.categories.high_growth')}</span>
                                                    <button onClick={() => handleShowDetails('backend')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('devops')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="DevOps Engineer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.software')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.devops')}</h4>
                                                <p className="text-muted small">{t('industries.roles.devops_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-warning-soft text-warning px-3 py-2 rounded-pill">{t('industries.categories.diverse')}</span>
                                                    <button onClick={() => handleShowDetails('devops')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tab 3: Data Science */}
                            <div id="tab-3" className="tab-pane fade p-0">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('data')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Data Analyst"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.data')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.analyst')}</h4>
                                                <p className="text-muted small">{t('industries.roles.analyst_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-info-soft text-info px-3 py-2 rounded-pill">{t('industries.categories.in_demand')}</span>
                                                    <button onClick={() => handleShowDetails('data')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('data_scientist')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Data Scientist"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.data')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.data_scientist')}</h4>
                                                <p className="text-muted small">{t('industries.roles.data_scientist_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill">{t('industries.categories.high_growth')}</span>
                                                    <button onClick={() => handleShowDetails('data_scientist')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('ml_engineer')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="ML Engineer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.data')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.ml_engineer')}</h4>
                                                <p className="text-muted small">{t('industries.roles.ml_engineer_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-warning-soft text-warning px-3 py-2 rounded-pill">{t('industries.categories.diverse')}</span>
                                                    <button onClick={() => handleShowDetails('ml_engineer')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tab 4: Marketing Strategy */}
                            <div id="tab-4" className="tab-pane fade p-0">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('marketing_spec')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Marketing Specialist"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.marketing')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.marketing_spec')}</h4>
                                                <p className="text-muted small">{t('industries.roles.marketing_spec_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill">{t('industries.categories.high_growth')}</span>
                                                    <button onClick={() => handleShowDetails('marketing_spec')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('seo')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="SEO Specialist"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.marketing')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.seo')}</h4>
                                                <p className="text-muted small">{t('industries.roles.seo_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-success-soft text-success px-3 py-2 rounded-pill">{t('industries.categories.in_demand')}</span>
                                                    <button onClick={() => handleShowDetails('seo')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('social_media')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Social Media Manager"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.marketing')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.social_media')}</h4>
                                                <p className="text-muted small">{t('industries.roles.social_media_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-warning-soft text-warning px-3 py-2 rounded-pill">{t('industries.categories.diverse')}</span>
                                                    <button onClick={() => handleShowDetails('social_media')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="tab-5" className="tab-pane fade p-0">
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('uiux')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="UI/UX Designer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.design')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.uiux')}</h4>
                                                <p className="text-muted small">{t('industries.roles.uiux_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-success-soft text-success px-3 py-2 rounded-pill">{t('industries.categories.in_demand')}</span>
                                                    <button onClick={() => handleShowDetails('uiux')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('graphic_designer')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Graphic Designer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.design')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.graphic_designer')}</h4>
                                                <p className="text-muted small">{t('industries.roles.graphic_designer_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-info-soft text-info px-3 py-2 rounded-pill">{t('industries.categories.diverse')}</span>
                                                    <button onClick={() => handleShowDetails('graphic_designer')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden fruite-item">
                                            <div className="position-relative overflow-hidden">
                                                <img
                                                    src={getCareerImage('motion_graphic')}
                                                    className="img-fluid w-100"
                                                    style={{ height: '230px', objectFit: 'cover' }}
                                                    alt="Motion Graphics Designer"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
                                                    }}
                                                />
                                                <div className="bg-primary text-white px-3 py-1 rounded-pill position-absolute" style={{ top: '15px', [isRtl ? 'left' : 'right']: '15px' }}>{t('industries.categories.design')}</div>
                                            </div>
                                            <div className="card-body p-4">
                                                <h4 className="fw-bold">{t('industries.roles.motion_graphic')}</h4>
                                                <p className="text-muted small">{t('industries.roles.motion_graphic_desc')}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">
                                                    <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill">{t('industries.categories.high_growth')}</span>
                                                    <button onClick={() => handleShowDetails('motion_graphic')} className="btn btn-outline-primary rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#careerDetailsModal">
                                                        {t('industries.actions.details')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Career Details Modal */}
            <div className="modal fade" id="careerDetailsModal" tabIndex="-1" aria-labelledby="careerDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-2xl rounded-4">
                        <div className="modal-header bg-primary text-white py-4 rounded-top-4 border-0">
                            <h5 className="modal-title fw-bold fs-3" id="careerDetailsModalLabel">
                                {selectedCareer ? t(`industries.roles.${selectedCareer === 'software' ? 'fullstack' : selectedCareer === 'data' ? 'analyst' : selectedCareer === 'marketing' ? 'marketing_spec' : selectedCareer}`) : ''}
                            </h5>
                            <button type="button" className={`btn-close btn-close-white ${isRtl ? 'ms-0 me-auto' : ''}`} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            {selectedCareer && (
                                <div className="career-modal-content">
                                    <div className="position-relative">
                                        <img
                                            src={getCareerImage(selectedCareer)}
                                            className="img-fluid w-100"
                                            style={{ height: '300px', objectFit: 'cover' }}
                                            alt={selectedCareer}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80';
                                            }}
                                        />
                                        <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                            <h3 className="fw-bold mb-0">{t(`industries.roles.${selectedCareer === 'software' ? 'fullstack' : selectedCareer === 'data' ? 'analyst' : selectedCareer === 'marketing' ? 'marketing_spec' : selectedCareer}`)}</h3>
                                        </div>
                                    </div>
                                    <div className="p-4 p-md-5">
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-primary">
                                                    <h6 className="text-primary fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                                                        <i className="fas fa-map-signs me-2"></i> {t('industries.details_modal.roadmap')}
                                                    </h6>
                                                    <p className="mb-0 " style={{ lineHeight: '1.6' }}>{t(`industries.roles_details.${selectedCareer}.roadmap`)}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-success">
                                                    <h6 className="text-success fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                                                        <i className="fas fa-tools me-2"></i> {t('industries.details_modal.skills')}
                                                    </h6>
                                                    <p className="mb-0 " style={{ lineHeight: '1.6' }}>{t(`industries.roles_details.${selectedCareer}.skills`)}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-warning">
                                                    <h6 className="text-warning fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                                                        <i className="fas fa-money-bill-wave me-2"></i> {t('industries.details_modal.salary')}
                                                    </h6>
                                                    <p className="mb-0  fw-bold" style={{ fontSize: '1.1rem' }}>{t(`industries.roles_details.${selectedCareer}.salary`)}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-4 bg-light rounded-4 h-100 border-start border-4 border-info">
                                                    <h6 className="text-info fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                                                        <i className="fas fa-tasks me-2"></i> {t('industries.details_modal.responsibilities')}
                                                    </h6>
                                                    <p className="mb-0 " style={{ lineHeight: '1.6' }}>{t(`industries.roles_details.${selectedCareer}.responsibilities`)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer border-0 p-4 pt-0">
                                        <button type="button" className="btn btn-secondary rounded-pill px-5 fw-bold" data-bs-dismiss="modal">{t('industries.details_modal.close')}</button>
                                        <Link to="/career-paths" className="btn btn-primary rounded-pill px-5 fw-bold" data-bs-dismiss="modal">{t('industries.actions.explore')}</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
