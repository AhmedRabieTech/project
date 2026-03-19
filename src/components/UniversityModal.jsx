import React from 'react';
import { useTranslation } from 'react-i18next';

const UniversityModal = ({ isOpen, onClose }) => {
    const { i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');

    if (!isOpen) return null;

    const universities = [
        {
            name: "Massachusetts Institute of Technology",
            arabicName: "معهد ماساتشوستس للتكنولوجيا",
            url: "https://web.mit.edu",
            image: `${import.meta.env.BASE_URL}images/mit.png`
        },
        {
            name: "Stanford University",
            arabicName: "جامعة ستانفورد",
            url: "https://stanford.edu",
            image: `${import.meta.env.BASE_URL}images/stanford.png`
        },
        {
            name: "Harvard University",
            arabicName: "جامعة هارفارد",
            url: "https://harvard.edu",
            image: `${import.meta.env.BASE_URL}images/harvard.png`
        },
        {
            name: "Carnegie Mellon University",
            arabicName: "جامعة كارنيجي ميلون",
            url: "https://cmu.edu",
            image: `${import.meta.env.BASE_URL}images/cmu.png`
        },
        {
            name: "University of Oxford",
            arabicName: "جامعة أكسفورد",
            url: "https://ox.ac.uk",
            image: `${import.meta.env.BASE_URL}images/oxford.png`
        }
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`uni-modal-container ${isRtl ? 'rtl' : ''}`} onClick={e => e.stopPropagation()}>
                <header className="modal-header-modern">
                    <h3 className="modal-title-custom">
                        {isRtl ? 'أفضل الجامعات التكنولوجية' : 'Top Tech Universities'}
                    </h3>
                    <button className="modal-close-icon" onClick={onClose} aria-label="Close">
                        <i className="fas fa-times"></i>
                    </button>
                </header>

                <main className="modal-body-scrollable">
                    <div className="uni-responsive-grid">
                        {universities.map((uni, idx) => (
                            <a
                                key={idx}
                                href={uni.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="uni-interactive-card"
                            >
                                <div className="uni-logo-frame">
                                    <img src={uni.image} alt={uni.name} className="uni-logo-fixed" />
                                </div>
                                <div className="uni-card-details">
                                    <h5 className="uni-card-title">{isRtl ? uni.arabicName : uni.name}</h5>
                                    <div className="uni-cta-wrapper">
                                        <span className="uni-action-label">
                                            {isRtl ? 'زيارة الموقع' : 'Visit Official Site'}
                                        </span>
                                        <i className={`fas fa-external-link-alt ${isRtl ? 'me-2' : 'ms-2'}`}></i>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </main>

                <footer className="modal-footer-fixed">
                    <button className="btn-confirm-close" onClick={onClose}>
                        {isRtl ? 'إغلاق' : 'Close'}
                    </button>
                </footer>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap');

                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.75);
                    backdrop-filter: blur(12px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    animation: modalFadeIn 0.3s ease-out;
                    padding: 20px;
                }

                .uni-modal-container {
                    background: var(--bg-color);
                    width: 100%;
                    max-width: 950px;
                    max-height: 85vh;
                    border-radius: 20px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    font-family: 'Poppins', 'Inter', sans-serif;
                    position: relative;
                    border: 1px solid var(--border-color);
                }

                .rtl { direction: rtl; }

                .modal-header-modern {
                    padding: 24px 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--border-color);
                    flex-shrink: 0;
                }

                .modal-title-custom {
                    font-weight: 700;
                    color: var(--heading-color);
                    margin: 0;
                    font-size: 1.4rem;
                }

                .modal-close-icon {
                    background: var(--card-bg);
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-color);
                    transition: all 0.2s;
                    border: 1px solid var(--border-color);
                }

                .modal-close-icon:hover {
                    background: #fee2e2;
                    color: #ef4444;
                }

                .modal-body-scrollable {
                    padding: 32px;
                    overflow-y: auto;
                    flex-grow: 1;
                    background: var(--bg-color);
                }

                /* Responsive Grid */
                .uni-responsive-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 24px;
                }

                .uni-interactive-card {
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 24px;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid var(--border-color);
                    text-align: center;
                }

                .uni-interactive-card:hover, .uni-interactive-card:focus {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                    border-color: var(--primary);
                    outline: none;
                }

                /* Uniform Image Handling */
                .uni-logo-frame {
                    width: 100px;
                    height: 100px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px;
                    background: white; /* Keep white for logos that expect it */
                    border-radius: 8px;
                }

                .uni-logo-fixed {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }

                .uni-card-details {
                    width: 100%;
                }

                .uni-card-title {
                    font-weight: 600;
                    color: var(--heading-color);
                    font-size: 1rem;
                    margin-bottom: 12px;
                    line-height: 1.5;
                }

                .uni-cta-wrapper {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 0.85rem;
                    font-weight: 600;
                    padding: 8px 16px;
                    background: var(--primary);
                    border-radius: 6px;
                    transition: 0.2s;
                    width: 100%;
                }

                .uni-interactive-card:hover .uni-cta-wrapper {
                    background: var(--nav-blue-dark);
                    color: white;
                }

                .modal-footer-fixed {
                    padding: 16px 32px;
                    background: var(--bg-color);
                    border-top: 1px solid var(--border-color);
                    display: flex;
                    justify-content: flex-end;
                    flex-shrink: 0;
                }

                .btn-confirm-close {
                    padding: 10px 24px;
                    border-radius: 8px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    font-weight: 600;
                    transition: 0.2s;
                }

                .btn-confirm-close:hover {
                    background: #ef4444;
                    transform: scale(1.05);
                }

                @keyframes modalFadeIn { 
                    from { opacity: 0; transform: scale(0.98); } 
                    to { opacity: 1; transform: scale(1); } 
                }

                @media (max-width: 640px) {
                    .uni-responsive-grid { grid-template-columns: 1fr; }
                    .uni-modal-container { height: 90vh; }
                    .modal-body-scrollable { padding: 20px; }
                }
            `}</style>
        </div>
    );
};

export default UniversityModal;
