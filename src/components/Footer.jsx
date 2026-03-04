import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');

    return (
        <footer className="modern-footer" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="footer-top-shape">
                <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 48H1440V0C1440 0 1140 48 720 48C300 48 0 0 0 0V48Z" fill="currentColor"></path>
                </svg>
            </div>

            <div className="footer-container">
                <div className="footer-grid">
                    {/* About Section */}
                    <div className="footer-section about-section">
                        <Link to="/" className="footer-logo">
                            <div className="logo-icon-footer">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <span className="logo-text-footer">Career<span>Guidance</span></span>
                        </Link>
                        <p className="footer-description">
                            {t('footer.tagline') || (isRtl ? 'نحن نساعدك على اكتشاف شغفك ورسم مسارك المهني بأفضل الطرق الحديثة والموثوقة.' : 'We help you discover your passion and design your career path with modern and reliable approaches.')}
                        </p>

                        <div className="social-icons">
                            <a href="https://facebook.com/careerguidance" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com/careerguidance" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="https://instagram.com/careerguidance" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="https://linkedin.com/company/careerguidance" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://youtube.com/c/careerguidance" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section links-section">
                        <h4 className="footer-title">{t('footer.links_title') || (isRtl ? 'روابط سريعة' : 'Quick Links')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/">{t('nav.home') || (isRtl ? 'الرئيسية' : 'Home')}</Link></li>
                            <li><Link to="/career-paths">{t('nav.services') || (isRtl ? 'الخدمات' : 'Services')}</Link></li>
                            <li><Link to="/recommendation">{t('nav.guidance') || (isRtl ? 'التوجيه المهني' : 'Career Guidance')}</Link></li>
                            <li><Link to="/articles">{t('nav.articles') || (isRtl ? 'مقالات' : 'Articles')}</Link></li>
                            <li><Link to="/support">{t('nav.support') || (isRtl ? 'الدعم الفني' : 'Support')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section contact-section">
                        <h4 className="footer-title">{t('footer.contact_title') || (isRtl ? 'معلومات التواصل' : 'Contact Us')}</h4>
                        <ul className="contact-info">
                            <li>
                                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                                <span className="contact-link no-hover" style={{ cursor: 'default' }}>
                                    {isRtl ? 'شارع التسعين، التجمع الخامس، القاهرة، مصر' : '90th Street, New Cairo, Cairo, Egypt'}
                                </span>
                            </li>
                            <li>
                                <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                                <span dir="ltr" className="contact-link no-hover" style={{ cursor: 'default' }}>+20 100 123 4567</span>
                            </li>
                            <li>
                                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                                <a href="mailto:support@careerguidance.com" className="contact-link">support@careerguidance.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="footer-section newsletter-section">
                        <h4 className="footer-title">{isRtl ? 'النشرة البريدية' : 'Newsletter'}</h4>
                        <p className="newsletter-text">
                            {isRtl ? 'اشترك للحصول على أحدث المقالات والنصائح المهنية' : 'Subscribe to receive the latest articles and career tips'}
                        </p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder={t('footer.placeholder') || (isRtl ? 'البريد الإلكتروني' : 'Email address')} required />
                            <button type="submit">
                                <i className={`fas fa-paper-plane ${isRtl ? 'fa-flip-horizontal' : ''}`}></i>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        &copy; {new Date().getFullYear()} <strong>CareerGuidance</strong>. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
                    </div>
                    <div className="footer-bottom-links">
                        <Link to="#">{t('footer.privacy') || (isRtl ? 'سياسة الخصوصية' : 'Privacy Policy')}</Link>
                        <Link to="#">{t('footer.terms') || (isRtl ? 'الشروط والأحكام' : 'Terms of Service')}</Link>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .modern-footer {
                    background: linear-gradient(135deg, #0a1128 0%, #112233 100%);
                    color: rgba(255, 255, 255, 0.7);
                    position: relative;
                    font-family: 'Cairo', 'Inter', sans-serif;
                    margin-top: 5rem;
                }

                .footer-top-shape {
                    position: absolute;
                    top: -47px;
                    left: 0;
                    width: 100%;
                    height: 48px;
                    color: #0a1128;
                    overflow: hidden;
                    line-height: 0;
                }

                .footer-top-shape svg {
                    width: 100%;
                    height: 100%;
                }

                .footer-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 4rem 1.5rem 1.5rem;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
                    gap: 3rem;
                    margin-bottom: 3rem;
                }

                .footer-title {
                    color: #ffffff;
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    position: relative;
                    display: inline-block;
                }

                .footer-title::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    background: #0F4CFF;
                    height: 3px;
                    border-radius: 3px;
                }

                [dir="ltr"] .footer-title::after { left: 0; width: 40px; }
                [dir="rtl"] .footer-title::after { right: 0; width: 40px; }

                .footer-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    margin-bottom: 1.25rem;
                }

                .logo-icon-footer {
                    width: 36px;
                    height: 36px;
                    background: #0F4CFF;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .logo-text-footer {
                    font-size: 1.3rem;
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.02em;
                }

                .logo-text-footer span {
                    color: #0F4CFF;
                }

                .footer-description {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                    color: rgba(255, 255, 255, 0.65);
                }

                /* Social Icons */
                .social-icons {
                    display: flex;
                    gap: 1rem;
                }

                .social-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .social-icon:hover {
                    background: #0F4CFF;
                    color: #ffffff;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(15, 76, 255, 0.4);
                }

                /* Footer Links */
                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .footer-links li {
                    margin-bottom: 0.8rem;
                }

                .footer-links a {
                    color: rgba(255, 255, 255, 0.65);
                    text-decoration: none;
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                }

                .footer-links a:hover {
                    color: #0F4CFF;
                    transform: translateX(4px);
                }

                [dir="rtl"] .footer-links a:hover {
                    transform: translateX(-4px);
                }

                /* Contact Info */
                .contact-info {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .contact-info li {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                    gap: 1rem;
                }

                .contact-icon {
                    color: #0F4CFF;
                    font-size: 1.1rem;
                    margin-top: 2px;
                }

                .contact-link {
                    font-size: 0.95rem;
                    line-height: 1.5;
                    color: rgba(255, 255, 255, 0.65);
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .contact-link:not(.no-hover):hover {
                    color: #0F4CFF;
                }

                /* Newsletter */
                .newsletter-text {
                    font-size: 0.95rem;
                    margin-bottom: 1.25rem;
                }

                .newsletter-form {
                    position: relative;
                    display: flex;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                    transition: border-color 0.3s ease;
                }

                .newsletter-form:focus-within {
                    border-color: #0F4CFF;
                }

                .newsletter-form input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    padding: 0.8rem 1rem;
                    color: white;
                    outline: none;
                    font-size: 0.9rem;
                }

                .newsletter-form input::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                }

                .newsletter-form button {
                    background: #0F4CFF;
                    border: none;
                    color: white;
                    padding: 0 1.25rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .newsletter-form button:hover {
                    background: #0036cc;
                }

                /* Footer Bottom */
                .footer-bottom {
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 0.85rem;
                }

                .copyright strong {
                    color: white;
                }

                .footer-bottom-links {
                    display: flex;
                    gap: 1.5rem;
                }

                .footer-bottom-links a {
                    color: rgba(255, 255, 255, 0.6);
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .footer-bottom-links a:hover {
                    color: white;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 2.5rem;
                    }
                }

                @media (max-width: 640px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                    }

                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }

                    .footer-bottom-links {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
            `}} />
        </footer>
    );
};

export default Footer;
