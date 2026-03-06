import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dummyArticles } from '../data/articles';

const Articles = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const lang = isRtl ? 'ar' : 'en';

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [flippedId, setFlippedId] = useState(null);

    const categories = [
        { id: 'all', icon: 'fa-globe' },
        { id: 'tech', icon: 'fa-laptop-code' },
        { id: 'career', icon: 'fa-chart-line' },
        { id: 'soft_skills', icon: 'fa-users' },
        { id: 'industry', icon: 'fa-building' }
    ];

    const filteredArticles = dummyArticles.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const searchInput = searchTerm.toLowerCase();
        const matchesSearch = article.title[lang].toLowerCase().includes(searchInput) ||
            article.excerpt[lang].toLowerCase().includes(searchInput);
        return matchesCategory && matchesSearch;
    });

    const toggleFlip = (id, e) => {
        if (e) e.stopPropagation();
        setFlippedId(flippedId === id ? null : id);
    };

    return (
        <div className={`articles-page bg-light pb-5 ${isRtl ? 'text-end' : 'text-start'}`} style={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <div className="position-relative overflow-hidden pt-5" style={{ background: 'var(--hero-gradient)', minHeight: '350px' }}>
                <div className="container position-relative z-1 text-center text-white py-5">
                    <span className="badge bg-primary px-3 py-2 rounded-pill fw-bold mb-3">
                        {isRtl ? 'استعراض المقالات' : 'Explore Our Articles'}
                    </span>
                    <h1 className="display-4 fw-extra-bold mb-4 text-white" style={{ letterSpacing: '-1.5px', color: 'white' }}>
                        {isRtl ? 'مكتبة المعرفة' : 'Knowledge Hub'}
                    </h1>

                    {/* Search Bar Container */}
                    <div className="max-w-xl mx-auto position-relative">
                        <div className="input-group input-group-lg shadow-lg rounded-pill overflow-hidden bg-white border-0">
                            <span className="input-group-text bg-white border-0 ps-4">
                                <i className="fas fa-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-0 py-3 shadow-none"
                                placeholder={isRtl ? 'ابحث عن مقال...' : 'Search for an article...'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="container mt-n4 position-relative z-2">
                <div className="bg-white p-3 rounded-4 shadow-sm d-flex align-items-center justify-content-start flex-nowrap overflow-auto hide-scrollbar gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`btn rounded-pill px-4 py-2 fw-bold whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'btn-primary shadow-sm' : 'btn-light text-muted'}`}
                        >
                            <i className={`fas ${cat.icon} ${isRtl ? 'ms-2' : 'me-2'}`}></i>
                            {t(`articles_page.categories.${cat.id}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container mb-5 mt-5">
                <div className="row g-4" style={{ minHeight: '400px' }}>
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article, idx) => {
                            const isFlipped = flippedId === article.id;

                            return (
                                <div key={article.id} className="col-lg-4 col-md-6" style={{ perspective: '2000px' }}>
                                    <div
                                        className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: '600px',
                                            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transformStyle: 'preserve-3d',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => !isFlipped && toggleFlip(article.id)}
                                    >

                                        {/* FRONT FACE */}
                                        <div className="flip-card-front" style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            zIndex: 2,
                                            transform: 'rotateY(0deg)'
                                        }}>
                                            <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm bg-white d-flex flex-column">
                                                <div className="position-relative" style={{ height: '240px' }}>
                                                    <img src={article.image} className="w-100 h-100 object-cover" alt={article.title[lang]} />
                                                    <div className="position-absolute top-0 start-0 p-3">
                                                        <span className="badge bg-primary rounded-pill px-3 py-2 fw-bold shadow">
                                                            {t(`articles_page.categories.${article.category}`)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-body p-4 d-flex flex-column">
                                                    <div className="mb-2 text-muted small fw-bold">
                                                        <i className="far fa-calendar-alt me-2"></i> {article.date}
                                                    </div>
                                                    <h4 className="fw-extra-bold mb-3" style={{ lineHeight: '1.4' }}>{article.title[lang]}</h4>
                                                    <p className="text-muted mb-0 flex-grow-1" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{article.excerpt[lang]}</p>
                                                    <div className="mt-4 pt-3 border-top d-flex align-items-center">
                                                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px', fontSize: '0.8rem' }}>
                                                            {article.author.name.charAt(0)}
                                                        </div>
                                                        <div className="ms-2">
                                                            <div className="fw-bold small">{article.author.name}</div>
                                                            <div className="text-primary smaller fw-medium">{article.author.role}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* BACK FACE (Full Article) */}
                                        <div className="flip-card-back" style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            zIndex: 1
                                        }}>
                                            <div className="card h-100 border-0 rounded-4 shadow-lg bg-white p-4 d-flex flex-column" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div className="flex-grow-1 overflow-auto custom-scrollbar pe-2">
                                                    <div className="mb-4 text-center">
                                                        <span className="badge bg-primary-soft text-primary rounded-pill px-3 py-1 mb-2 fw-bold">
                                                            {t(`articles_page.categories.${article.category}`)}
                                                        </span>
                                                        <h4 className="fw-extra-bold">{article.title[lang]}</h4>
                                                        <hr className="my-3 opacity-10" />
                                                    </div>
                                                    <div className="article-full-text" style={{ lineHeight: '2', fontSize: '1.05rem' }}>
                                                        {article.content[lang].split('\n\n').map((para, i) => (
                                                            <p key={i} className="mb-3">{para}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-3 border-top">
                                                    <button
                                                        onClick={(e) => toggleFlip(article.id, e)}
                                                        className="btn btn-dark rounded-pill py-2 fw-bold w-100 shadow-sm"
                                                    >
                                                        <i className={`fas fa-arrow-left ${isRtl ? 'ms-2' : 'me-2'}`}></i>
                                                        {isRtl ? 'العودة' : 'Back'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-12 text-center py-5">
                            <h3 className="text-muted">{isRtl ? 'لا توجد مقالات' : 'No articles found'}</h3>
                        </div>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .is-flipped { transform: rotateY(180deg); }
                .fw-extra-bold { font-weight: 800; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
                .object-cover { object-fit: cover; }
                .bg-primary-soft { background-color: rgba(42, 82, 190, 0.1); }
                .smaller { font-size: 0.75rem; }
                .article-full-text p:first-of-type::first-letter {
                    font-size: 2.5rem;
                    font-weight: 800;
                    float: ${isRtl ? 'right' : 'left'};
                    line-height: 1;
                    margin: 0.1em 0.1em 0 0;
                    color: var(--primary);
                }
            `}} />
        </div>
    );
};

export default Articles;
