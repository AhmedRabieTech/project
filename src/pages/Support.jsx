import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Support = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'New Feature',
        text: ''
    });

    const [suggestions, setSuggestions] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    // Load suggestions from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('user_suggestions');
        if (saved) {
            setSuggestions(JSON.parse(saved));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSuggestion = {
            id: Date.now(),
            ...formData,
            date: new Date().toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        const updatedSuggestions = [newSuggestion, ...suggestions];
        setSuggestions(updatedSuggestions);
        localStorage.setItem('user_suggestions', JSON.stringify(updatedSuggestions));

        setFormData({
            name: '',
            email: '',
            type: 'New Feature',
            text: ''
        });

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className={`support-page pb-5 ${isRtl ? 'text-end' : 'text-start'}`}>
            {/* Hero Section */}
            <div className="support-hero position-relative overflow-hidden py-5 mb-5" style={{ background: 'var(--hero-gradient)', minHeight: '300px' }}>
                <div className="container position-relative z-2 text-center py-4">
                    <h1 className="display-4 fw-extra-bold text-white mb-3 pt-5 animate__animated animate__fadeInDown">
                        {isRtl ? 'صفحة الدعم – مقترحاتكم تهمنا' : 'Support Page – Your Suggestions Matter'}
                    </h1>
                    <p className="lead text-white-50 mb-0 animate__animated animate__fadeInUp">
                        {isRtl
                            ? 'نحن نقدر رأيك! ساعدنا في تحسين منصتنا من خلال مشاركة أفكارك أو الإبلاغ عن المشكلات.'
                            : 'We value your opinion! Help us improve our platform by sharing your ideas or reporting issues.'}
                    </p>
                </div>
                {/* Decorative blobs */}
                <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 1, opacity: 0.1 }}>
                    <div className="position-absolute rounded-circle bg-white" style={{ width: '300px', height: '300px', top: '-150px', left: '-150px' }}></div>
                    <div className="position-absolute rounded-circle bg-white" style={{ width: '200px', height: '200px', bottom: '-100px', right: '10%' }}></div>
                </div>
            </div>

            <div className="container">
                <div className="row g-5">
                    {/* Form Section */}
                    <div className="col-lg-5">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden sticky-top" style={{ top: '100px' }}>
                            <div className="card-header bg-primary text-white p-4 border-0">
                                <h4 className="mb-0 fw-bold">
                                    <i className={`fas fa-paper-plane ${isRtl ? 'ms-2' : 'me-2'}`}></i>
                                    {isRtl ? 'تقديم مقترح' : 'Submit Suggestion'}
                                </h4>
                            </div>
                            <div className="card-body p-4 p-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{isRtl ? 'الاسم (اختياري)' : 'Name (Optional)'}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control form-control-lg rounded-3 bg-light border-0"
                                            placeholder={isRtl ? 'أدخل اسمك...' : 'Enter your name...'}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{isRtl ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg rounded-3 bg-light border-0"
                                            placeholder="example@mail.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{isRtl ? 'نوع المقترح' : 'Suggestion Type'}</label>
                                        <select
                                            name="type"
                                            className="form-select form-select-lg rounded-3 bg-light border-0"
                                            value={formData.type}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="New Feature">{isRtl ? 'ميزة جديدة' : 'New Feature'}</option>
                                            <option value="Bug">{isRtl ? 'إبلاغ عن خطأ' : 'Bug Report'}</option>
                                            <option value="UX Improvement">{isRtl ? 'تحسين تجربة المستخدم' : 'UX Improvement'}</option>
                                            <option value="Other">{isRtl ? 'أخرى' : 'Other'}</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{isRtl ? 'وصف المقترح' : 'Suggestion Text'}</label>
                                        <textarea
                                            name="text"
                                            className="form-control form-control-lg rounded-3 bg-light border-0"
                                            rows="5"
                                            placeholder={isRtl ? 'اكتب مقترحك هنا بالتفصيل...' : 'Write your suggestion here in detail...'}
                                            value={formData.text}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm py-3 transition-all hover-translate">
                                        {isRtl ? 'إرسال المقترح' : 'Submit Suggestion'}
                                    </button>

                                    {submitted && (
                                        <div className="alert alert-success mt-3 rounded-3 animate__animated animate__fadeIn">
                                            {isRtl ? 'تم إرسال مقترحك بنجاح! شكرًا لك.' : 'Your suggestion was submitted successfully! Thank you.'}
                                        </div>
                                    )}
                                </form>

                                <div className="mt-5 pt-4 border-top">
                                    <h6 className="fw-bold mb-3">{isRtl ? 'تواصل معنا مباشرة:' : 'Contact us directly:'}</h6>
                                    <div className="d-flex gap-3 mt-3">
                                        <a href="https://www.facebook.com/share/1BQQ1JbHdY/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary rounded-circle shadow-sm" style={{ width: '45px', height: '45px', display: 'grid', placeItems: 'center' }}>
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="https://www.instagram.com/rby296938?igsh=cnZlbHRtbGcycXEx" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger rounded-circle shadow-sm" style={{ width: '45px', height: '45px', display: 'grid', placeItems: 'center' }}>
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a href="mailto:support@careerpilot.com" className="btn btn-outline-info rounded-circle shadow-sm" style={{ width: '45px', height: '45px', display: 'grid', placeItems: 'center' }}>
                                            <i className="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Suggestions List Section */}
                    <div className="col-lg-7">
                        <div className="d-flex align-items-center justify-content-between mb-4 mt-lg-0 mt-5">
                            <h3 className="fw-bold mb-0">
                                {isRtl ? 'المقترحات الأخيرة' : 'Recent Suggestions'}
                                <span className="badge bg-primary rounded-pill ms-3 fs-6 px-3">{suggestions.length}</span>
                            </h3>
                        </div>

                        {suggestions.length === 0 ? (
                            <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
                                <i className="fas fa-comments display-1 text-light mb-4"></i>
                                <h4 className="text-muted">{isRtl ? 'لا يوجد مقترحات بعد' : 'No suggestions yet'}</h4>
                                <p className="text-muted-50">{isRtl ? 'كن أول من يشاركنا أفكاره!' : 'Be the first to share your thoughts!'}</p>
                            </div>
                        ) : (
                            <div className="suggestions-list d-flex flex-column gap-4">
                                {suggestions.map(s => (
                                    <div key={s.id} className="card border-0 shadow-sm rounded-4 overflow-hidden animate__animated animate__fadeInUp">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                                                            {(s.name || 'A').charAt(0).toUpperCase()}
                                                        </div>
                                                    </div>
                                                    <div className={`ms-3 ${isRtl ? 'me-3 ms-0' : ''}`}>
                                                        <h5 className="fw-bold mb-0">{s.name || (isRtl ? 'زائر مجهول' : 'Anonymous User')}</h5>
                                                        <span className="text-muted small">{s.date}</span>
                                                    </div>
                                                </div>
                                                <span className={`badge rounded-pill px-3 py-2 ${s.type === 'Bug' ? 'bg-danger-subtle text-danger' :
                                                        s.type === 'New Feature' ? 'bg-success-subtle text-success' :
                                                            s.type === 'UX Improvement' ? 'bg-info-subtle text-info' :
                                                                'bg-secondary-subtle text-secondary'
                                                    }`}>
                                                    {isRtl ? (
                                                        s.type === 'Bug' ? 'خطأ تقني' :
                                                            s.type === 'New Feature' ? 'ميزة جديدة' :
                                                                s.type === 'UX Improvement' ? 'تجربة المستخدم' :
                                                                    'أخرى'
                                                    ) : s.type}
                                                </span>
                                            </div>
                                            <div className="p-3 bg-light rounded-3">
                                                <p className="mb-0 " style={{ lineHeight: '1.7', whiteSpace: 'pre-line' }}>{s.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .support-hero {
                    margin-top: -24px;
                }
                .fw-extra-bold { font-weight: 800; }
                .hover-translate { transition: transform 0.3s ease; }
                .hover-translate:hover { transform: translateY(-3px); }
                .bg-danger-subtle { background-color: rgba(220, 53, 69, 0.1); }
                .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1); }
                .bg-info-subtle { background-color: rgba(13, 202, 240, 0.1); }
                .bg-secondary-subtle { background-color: rgba(108, 117, 125, 0.1); }
                
                body.dark-mode .card {
                    background-color: var(--glass-card-bg) !important;
                }
                body.dark-mode .bg-light {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                }
            `}</style>
        </div>
    );
};

export default Support;
