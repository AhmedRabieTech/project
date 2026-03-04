import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { dummyArticles } from '../data/articles';

const ArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const lang = isRtl ? 'ar' : 'en';

    // Find the article by ID
    const article = dummyArticles.find(a => a.id === parseInt(id));

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!article) {
        return (
            <div className="container py-5 text-center">
                <h2>{isRtl ? 'المقال غير موجود' : 'Article Not Found'}</h2>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/articles')}>
                    {isRtl ? 'العودة للمقالات' : 'Back to Articles'}
                </button>
            </div>
        );
    }

    return (
        <div className={`article-detail-page bg-light min-vh-100 pb-5 ${isRtl ? 'text-end' : 'text-start'}`}>
            {/* Full-width Cover Image */}
            <div className="article-hero-cover w-100 position-relative" style={{ height: '500px' }}>
                <img
                    src={article.image}
                    alt={article.title[lang]}
                    className="w-100 h-100 object-cover"
                    style={{ filter: 'brightness(0.8)' }}
                />
                <div className="position-absolute bottom-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}></div>

                {/* Float Back Button */}
                <button
                    onClick={() => navigate('/articles')}
                    className={`btn btn-light rounded-circle shadow position-absolute z-3 hover-scale ${isRtl ? 'end-0 me-5' : 'start-0 ms-5'}`}
                    style={{ top: '30px', width: '50px', height: '50px' }}
                >
                    <i className={`fas fa-arrow-${isRtl ? 'right' : 'left'}`}></i>
                </button>
            </div>

            {/* Content Container */}
            <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white">
                            <div className="card-body p-4 p-md-5">
                                {/* Category and Time */}
                                <div className="d-flex align-items-center mb-4">
                                    <span className="badge bg-primary px-3 py-2 rounded-pill fw-bold me-3">
                                        {t(`articles_page.categories.${article.category}`)}
                                    </span>
                                    <span className="text-muted small fw-bold">
                                        <i className="far fa-clock me-1"></i> {article.readTime}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="display-4 fw-extra-bold text-dark mb-4" style={{ letterSpacing: '-1px', lineHeight: '1.2' }}>
                                    {article.title[lang]}
                                </h1>

                                {/* Author and Date */}
                                <div className="d-flex align-items-center justify-content-between mb-5 pb-4 border-bottom dashed-border">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-gradient-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '60px', height: '60px', fontSize: '1.4rem', background: 'linear-gradient(45deg, var(--primary), var(--secondary))' }}>
                                            {article.author.name.charAt(0)}
                                        </div>
                                        <div className={`ms-3 ${isRtl ? 'me-3 ms-0' : ''}`}>
                                            <h5 className="fw-bold text-dark mb-1">{article.author.name}</h5>
                                            <span className="text-primary fw-medium">{article.author.role}</span>
                                        </div>
                                    </div>
                                    <div className="text-muted text-end">
                                        <div className="fw-bold"><i className="far fa-calendar-alt me-2"></i> {article.date}</div>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="article-full-content px-lg-4">
                                    {article.content[lang].split('\n\n').map((paragraph, i) => (
                                        <p key={i} className="mb-4" style={{ fontSize: '1.2rem', lineHeight: '2.1', color: '#334155' }}>
                                            {i === 0 && (
                                                <span className={`float-${isRtl ? 'end' : 'start'} fw-extra-bold text-primary display-2 lh-1 me-3 drop-cap`} style={{ fontFamily: 'Georgia, serif' }}>
                                                    {paragraph.charAt(0)}
                                                </span>
                                            )}
                                            {i === 0 ? paragraph.substring(1) : paragraph}
                                        </p>
                                    ))}
                                </div>

                                {/* Footer Navigation */}
                                <div className="mt-5 pt-5 border-top text-center">
                                    <button onClick={() => navigate('/articles')} className="btn btn-dark rounded-pill px-5 py-3 fw-bold hover-scale transition-all shadow">
                                        <i className={`fas fa-th-large ${isRtl ? 'ms-2' : 'me-2'}`}></i>
                                        {isRtl ? 'العودة لمكتبة المقالات' : 'Back to Articles Library'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .object-cover { object-fit: cover; }
                .fw-extra-bold { font-weight: 800; }
                .dashed-border { border-bottom: 1px dashed rgba(0,0,0,0.1) !important; }
                .hover-scale { transition: transform 0.3s ease; }
                .hover-scale:hover { transform: scale(1.05); }
                .drop-cap { margin-top: 0.1em; }
            `}} />
        </div>
    );
};

export default ArticlePage;
