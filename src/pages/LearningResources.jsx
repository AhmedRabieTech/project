import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const categories = [
    {
        id: 'frontend',
        icon: 'bi bi-code-slash',
        image: '/images/frontend.png',
        color: '#0F4CFF',
        description: {
            en: 'Master the art of building beautiful, interactive user interfaces with modern web standards.',
            ar: 'أتقن فن بناء واجهات مستخدم جميلة وتفاعلية باستخدام أحدث معايير الويب العالمية.'
        },
        resources: [
            { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', desc: 'Comprehensive curriculum for web development basics.' },
            { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', desc: 'The most trusted source for web technology documentation.' },
            { name: 'W3Schools', url: 'https://www.w3schools.com', desc: 'Simple, interactive tutorials for beginners.' },
            { name: 'CSS-Tricks', url: 'https://css-tricks.com', desc: 'Advanced techniques and tips for modern CSS.' },
        ],
    },
    {
        id: 'backend',
        icon: 'bi bi-database',
        image: '/images/backend.png',
        color: '#10B981',
        description: {
            en: 'Deep dive into server-side logic, databases, and APIs to power scalable applications.',
            ar: 'تعمق في منطق الخادم، قواعد البيانات، وواجهات برمجة التطبيقات لبناء تطبيقات قابلة للتوسع.'
        },
        resources: [
            { name: 'Node.js Docs', url: 'https://nodejs.org/en/docs', desc: 'Detailed API references for the Node.js runtime.' },
            { name: 'Express.js Guide', url: 'https://expressjs.com', desc: 'Standard framework for building web apps on Node.js.' },
            { name: 'Postman Academy', url: 'https://learning.postman.com', desc: 'Master API development and testing tools.' },
            { name: 'The Odin Project', url: 'https://www.theodinproject.com', desc: 'A full-stack path including Ruby on Rails and Node.' },
        ],
    },
    {
        id: 'ai',
        icon: 'bi bi-cpu',
        image: '/images/ai.png',
        color: '#8B5CF6',
        description: {
            en: 'Explore the future of intelligence through machine learning, neural networks, and data science.',
            ar: 'استكشف مستقبل الذكاء من خلال تعلم الآلة، الشبكات العصبية، وعلوم البيانات المتقدمة.'
        },
        resources: [
            { name: 'Coursera AI', url: 'https://www.coursera.org/browse/data-science/machine-learning', desc: 'Certificates from Google, Stanford, and IBM.' },
            { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', desc: 'Bite-sized courses on data science and ML.' },
            { name: 'Fast.ai', url: 'https://www.fast.ai', desc: 'Deep learning for coders with a practical approach.' },
            { name: 'Hugging Face', url: 'https://huggingface.co/learn', desc: 'The open-source community for NLP and Transformers.' },
        ],
    },
    {
        id: 'cybersecurity',
        icon: 'bi bi-shield-check',
        image: '/images/cybersecurity.png',
        color: '#EF4444',
        description: {
            en: 'Learn to protect systems, networks, and data from digital attacks and threats.',
            ar: 'تعلم كيفية حماية الأنظمة، الشبكات، والبيانات من الهجمات والتهديدات الرقمية المتطورة.'
        },
        resources: [
            { name: 'TryHackMe', url: 'https://tryhackme.com', desc: 'Hands-on laboratories for hacking and defense.' },
            { name: 'Hack The Box', url: 'https://www.hackthebox.com', desc: 'Advanced penetration testing training platform.' },
            { name: 'OWASP Top 10', url: 'https://owasp.org', desc: 'Critical security risks for web applications.' },
            { name: 'Cybrary', url: 'https://www.cybrary.it', desc: 'Career-focused cybersecurity training paths.' },
        ],
    },
];

const categoryTitles = {
    en: {
        frontend: 'Frontend Mastery',
        backend: 'Backend & Infrastructure',
        ai: 'Artificial Intelligence',
        cybersecurity: 'Cyber Security',
    },
    ar: {
        frontend: 'احتراف الواجهات الأمامية',
        backend: 'الخوادم والبنية التحتية',
        ai: 'الذكاء الاصطناعي',
        cybersecurity: 'الأمن السيبراني',
    },
};

const ResourceCard = ({ cat, idx, lang, isRtl }) => {
    const [phase, setPhase] = useState(0); // 0: Title, 1: Desc, 2: List

    return (
        <motion.article
            className="resource-card"
            style={{ '--accent-color': cat.color }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
        >
            <div className="card-top">
                <div className="card-image-section">
                    <motion.div
                        className="card-image-container"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{
                            scale: 1.05,
                            rotateY: isRtl ? -10 : 10,
                            rotateX: 5,
                            z: 50
                        }}
                    >
                        <img src={cat.image} alt={cat.id} className="card-image-png" />
                    </motion.div>
                    <div className="image-overlay-glow"></div>
                    <div className="card-inner-shadow"></div>
                </div>
                <div className="card-header-section">
                    <div className="category-icon-box">
                        <i className={cat.icon}></i>
                    </div>
                    <div className="title-container">
                        <TypeAnimation
                            sequence={[
                                categoryTitles[lang][cat.id],
                                500,
                                () => setPhase(1)
                            ]}
                            wrapper="h2"
                            className={`category-name ${phase >= 1 ? 'hide-internal-cursor' : ''}`}
                            speed={50}
                            cursor={true}
                        />
                    </div>
                </div>
            </div>

            <div className="card-content">
                <div className="description-container mb-4">
                    {phase >= 1 && (
                        <TypeAnimation
                            sequence={[
                                cat.description[lang],
                                500,
                                () => setPhase(2)
                            ]}
                            wrapper="p"
                            className={`category-description ${phase >= 2 ? 'hide-internal-cursor' : ''}`}
                            speed={70}
                            cursor={true}
                        />
                    )}
                </div>

                <AnimatePresence>
                    {phase >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="resource-list-section"
                        >
                            <div className="resource-list-header mb-3">
                                {isRtl ? 'أفضل المنصات التعليمية:' : 'Top Learning Platforms:'}
                            </div>
                            <div className="links-grid">
                                {cat.resources.map((res, ridx) => (
                                    <motion.div
                                        key={res.name}
                                        initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: ridx * 0.1 }}
                                    >
                                        <a href={res.url} target="_blank" rel="noopener noreferrer" className="resource-item-link">
                                            <div className="item-dot"></div>
                                            <div className="item-meta">
                                                <span className="item-name">{res.name}</span>
                                                <span className="item-desc">{res.desc}</span>
                                            </div>
                                            <i className="bi bi-arrow-up-right arrow-icon"></i>
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.article>
    );
};

const LearningResources = () => {
    const { i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const lang = isRtl ? 'ar' : 'en';

    return (
        <div className={`resources-page ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            <header className="resources-header">
                <div className="header-overlay"></div>
                <div className="container text-center py-5">
                    <motion.span
                        className="premium-label"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <i className="bi bi-stars me-2"></i>
                        {isRtl ? 'بوابتك للتميز التقني' : 'Your Tech Excellence Gateway'}
                    </motion.span>
                    <motion.h1
                        className="header-title"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {isRtl ? 'مصادر التعلم المميزة' : 'Curated Learning Resources'}
                    </motion.h1>
                    <motion.p
                        className="header-desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {isRtl
                            ? 'اكتشف رحلتك التعليمية القادمة مع أفضل المنصات التقنية في العالم.'
                            : 'Discover your next learning journey with the world’s top technical platforms.'}
                    </motion.p>
                </div>
            </header>

            <main className="container py-5">
                <div className="row g-4">
                    {categories.map((cat, idx) => (
                        <div key={cat.id} className="col-lg-6">
                            <ResourceCard cat={cat} idx={idx} lang={lang} isRtl={isRtl} />
                        </div>
                    ))}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .resources-page {
                    font-family: 'Inter', 'Cairo', sans-serif;
                    background-color: var(--bg-color);
                    min-height: 100vh;
                }
                .resources-header {
                    position: relative;
                    background: var(--hero-gradient);
                    color: white;
                    padding: 80px 0;
                    overflow: hidden;
                    text-align: center;
                }
                .header-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                    opacity: 0.3;
                }
                .premium-label {
                    background: rgba(255,255,255,0.15);
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 6px 16px;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    display: inline-block;
                    margin-bottom: 20px;
                }
                .header-title { font-size: 3rem; font-weight: 800; margin-bottom: 15px; }
                .header-desc { font-size: 1.1rem; color: rgba(255,255,255,0.8); max-width: 600px; margin: 0 auto; }

                .resource-card {
                    background: var(--card-bg);
                    border-radius: 24px;
                    border: 1px solid var(--border-color);
                    height: 100%;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }
                .resource-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    border-color: var(--accent-color);
                }

                .card-top { 
                    background: rgba(0,0,0,0.02);
                    border-bottom: 1px solid var(--border-color);
                }
                .card-image-section { 
                    height: 260px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    position: relative; 
                    padding: 40px;
                    background: var(--bg-color);
                    overflow: hidden;
                    perspective: 1200px;
                }
                .card-image-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 5;
                    transform-style: preserve-3d;
                    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .card-image-png { 
                    max-width: 85%; 
                    max-height: 85%; 
                    object-fit: contain; 
                    filter: drop-shadow(0 25px 35px rgba(0,0,0,0.2));
                    z-index: 6;
                }
                .image-overlay-glow { 
                    position: absolute; 
                    width: 70%; 
                    height: 70%; 
                    background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
                    filter: blur(50px); 
                    opacity: 0.2; 
                    z-index: 1;
                }
                .card-inner-shadow {
                    position: absolute;
                    inset: 0;
                    box-shadow: inset 0 0 40px rgba(0,0,0,0.03);
                    pointer-events: none;
                    z-index: 3;
                }

                .card-header-section { 
                    padding: 25px 30px; 
                    display: flex; 
                    align-items: center; 
                    gap: 15px; 
                    background: var(--card-bg);
                    border-top: 1px solid var(--border-color);
                }
                .category-icon-box { 
                    width: 45px; 
                    height: 45px; 
                    background: var(--bg-color); 
                    border-radius: 12px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: var(--accent-color); 
                    font-size: 1.3rem; 
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05); 
                }
                .category-name { 
                    font-size: 1.4rem !important; 
                    font-weight: 800; 
                    margin: 0; 
                    color: var(--heading-color) !important; 
                }
                
                /* Real typing cursor that hides after finish */
                .hide-internal-cursor::after {
                    display: none !important;
                }

                .card-content { padding: 25px; }
                .category-description { color: var(--nav-gray); line-height: 1.6; min-height: 3em; margin-bottom: 20px; }

                .resource-list-header { font-size: 0.8rem; font-weight: 700; color: var(--nav-gray); text-transform: uppercase; letter-spacing: 1px; }
                .links-grid { display: flex; flex-direction: column; gap: 10px; }
                .resource-item-link { display: flex; align-items: center; gap: 12px; padding: 12px 15px; background: rgba(0,0,0,0.02); border-radius: 15px; text-decoration: none; transition: all 0.2s ease; border: 1px solid transparent; }
                .resource-item-link:hover { background: var(--hover-bg); border-color: var(--accent-color); transform: translateX(5px); }
                .rtl .resource-item-link:hover { transform: translateX(-5px); }
                
                .item-dot { width: 6px; height: 6px; border-radius: 50%; background: #ddd; }
                .resource-item-link:hover .item-dot { background: var(--accent-color); transform: scale(1.3); }
                .item-meta { flex: 1; }
                .item-name { display: block; font-weight: 700; color: var(--text-color); font-size: 0.95rem; }
                .item-desc { display: block; font-size: 0.8rem; color: var(--nav-gray); }
                .arrow-icon { font-size: 0.8rem; color: #ddd; opacity: 0; transition: 0.2s; }
                .resource-item-link:hover .arrow-icon { opacity: 1; color: var(--accent-color); }

                @media (max-width: 768px) {
                    .header-title { font-size: 2rem; }
                    .card-image-section { height: 180px; }
                }

                .dark-mode .card-top { background: rgba(255,255,255,0.03); }
                .dark-mode .resource-item-link { background: rgba(255,255,255,0.05); }
                .dark-mode .category-icon-box { background: #2a2a2a; }
            ` }} />
        </div>
    );
};

export default LearningResources;