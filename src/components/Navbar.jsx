import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useTranslation } from 'react-i18next';
import LoginModal from './LoginModal';
import UniversityModal from './UniversityModal';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const navigate = useNavigate();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isUniModalOpen, setIsUniModalOpen] = useState(false);
    const [modalInitialStep, setModalInitialStep] = useState(1);
    const [user, setUser] = useState(authService.getCurrentUser());

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const userRef = useRef(null);
    const isAdmin = authService.isAdmin();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userRef.current && !userRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        setIsUserDropdownOpen(false);
        navigate('/');
    };

    const handleLoginSuccess = (loggedInUser) => setUser(loggedInUser);

    const openLogin = () => {
        setModalInitialStep(3);
        setIsLoginModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const openRegister = () => {
        setModalInitialStep(1);
        setIsLoginModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const toggleLanguage = () => i18n.changeLanguage(isRtl ? 'en' : 'ar');

    return (
        <header className={`modern-navbar ${scrolled ? 'scrolled' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Top Blue Bar */}
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="top-bar-info">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span>{isRtl ? 'برنامج التميز المهني للتوجيه بعد التخرج' : 'Career Excellence Program'}</span>
                    </div>
                </div>
            </div>

            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="logo-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="logo-text">Career<span>Guidance</span></span>
                </Link>

                {/* Mobile Burger Menu */}
                <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMobileMenuOpen ? (
                            <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
                        ) : (
                            <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
                        )}
                    </svg>
                </button>

                {/* Navigation and Actions */}
                <nav className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link></li>
                        <li><Link to="/career-paths" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.services')}</Link></li>
                        <li><Link to="/recommendation" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.guidance')}</Link></li>
                        <li><Link to="/articles" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.articles')}</Link></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setIsUniModalOpen(true); setIsMobileMenuOpen(false); }}>{isRtl ? 'الجامعات الشريكة' : 'Partner Universities'}</a></li>
                        <li><Link to="/support" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.support')}</Link></li>
                    </ul>

                    <div className="nav-actions">
                        <button className="action-btn text-btn" onClick={toggleLanguage}>
                            {isRtl ? 'English' : 'عربي'}
                        </button>



                        <div className="auth-buttons">
                            {user ? (
                                <div className="user-dropdown-wrapper" ref={userRef}>
                                    <button className="user-avatar-btn" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                                        <div className="avatar-circle">{user.name?.charAt(0) || 'U'}</div>
                                    </button>
                                    {isUserDropdownOpen && (
                                        <div className="user-dropdown-menu">
                                            <div className="user-dropdown-header">
                                                <strong>{user.name}</strong>
                                                <span>{user.email}</span>
                                            </div>
                                            <div className="dropdown-divider"></div>
                                            <Link to="/profile" className="dropdown-item" onClick={() => { setIsUserDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                                                {isRtl ? 'الملف الشخصي' : 'Profile'}
                                            </Link>
                                            {isAdmin && (
                                                <Link to="/add-career" className="dropdown-item" onClick={() => { setIsUserDropdownOpen(false); setIsMobileMenuOpen(false); }}>
                                                    {t('nav.admin')}
                                                </Link>
                                            )}
                                            <div className="dropdown-divider"></div>
                                            <button onClick={handleLogout} className="dropdown-item text-danger">
                                                {t('nav.logout')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <button onClick={openLogin} className="btn-login">{t('nav.login')}</button>
                                    <button onClick={openRegister} className="btn-signup">{t('nav.signup')}</button>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>

            <LoginModal isOpen={isLoginModalOpen} initialStep={modalInitialStep} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
            <UniversityModal isOpen={isUniModalOpen} onClose={() => setIsUniModalOpen(false)} />

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

                :root {
                    --color-blue: #0F4CFF;
                    --color-blue-dark: #0036cc;
                    --color-white: #ffffff;
                    --color-dark: #112233;
                    --color-gray: #64748b;
                    --color-gray-light: #f1f5f9;
                    --nav-height: 80px;
                    --top-bar-height: 36px;
                    --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }

                body {
                    padding-top: calc(var(--nav-height) + var(--top-bar-height));
                }

                .modern-navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1050;
                    background: var(--color-white);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-family: 'Cairo', 'Inter', sans-serif;
                }

                .modern-navbar.scrolled {
                    box-shadow: var(--shadow-sm);
                }
                
                .modern-navbar.scrolled .top-bar {
                    height: 0;
                    overflow: hidden;
                    opacity: 0;
                    padding: 0;
                }

                .top-bar {
                    background: var(--color-blue);
                    color: var(--color-white);
                    height: var(--top-bar-height);
                    display: flex;
                    align-items: center;
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    opacity: 1;
                }

                .top-bar-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    width: 100%;
                    padding: 0 1.5rem;
                }

                .top-bar-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    opacity: 0.9;
                }

                .navbar-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    height: var(--nav-height);
                    padding: 0 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    z-index: 1060;
                }

                .logo-icon {
                    width: 40px;
                    height: 40px;
                    background: var(--color-blue);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .logo-text {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--color-dark);
                    letter-spacing: -0.02em;
                }

                .logo-text span {
                    color: var(--color-blue);
                }

                .navbar-menu {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex: 1;
                    margin-left: 2.5rem;
                }

                [dir="rtl"] .navbar-menu {
                    margin-left: 0;
                    margin-right: 2.5rem;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 1.8rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-links a {
                    text-decoration: none;
                    color: var(--color-dark);
                    font-size: 0.95rem;
                    font-weight: 600;
                    transition: color 0.2s ease;
                }

                .nav-links a:hover {
                    color: var(--color-blue);
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .action-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    color: var(--color-dark);
                }

                .text-btn {
                    font-size: 0.95rem;
                    font-weight: 700;
                    padding: 0.5rem 0.5rem;
                }

                .search-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--color-gray-light);
                    color: var(--color-dark);
                }

                .action-btn:hover {
                    color: var(--color-blue);
                }
                
                .search-btn:hover {
                    background: #e2e8f0;
                }

                .auth-buttons {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    padding-inline-start: 1rem;
                }

                .btn-login {
                    background: transparent;
                    color: var(--color-dark);
                    border: 2px solid transparent;
                    font-weight: 700;
                    font-size: 0.95rem;
                    padding: 0.5rem 1.25rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-login:hover {
                    background: var(--color-gray-light);
                    border-color: #e2e8f0;
                }

                .btn-signup {
                    background: var(--color-blue);
                    color: var(--color-white);
                    border: 2px solid var(--color-blue);
                    font-weight: 700;
                    font-size: 0.95rem;
                    padding: 0.5rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 10px rgba(15, 76, 255, 0.2);
                }

                .btn-signup:hover {
                    background: var(--color-blue-dark);
                    border-color: var(--color-blue-dark);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(15, 76, 255, 0.3);
                }

                .user-dropdown-wrapper {
                    position: relative;
                }

                .user-avatar-btn {
                    background: none;
                    border: 2px solid transparent;
                    padding: 2px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .user-avatar-btn:hover {
                    border-color: var(--color-blue);
                }

                .avatar-circle {
                    width: 40px;
                    height: 40px;
                    background: var(--color-blue);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 1.1rem;
                }

                .user-dropdown-menu {
                    position: absolute;
                    top: calc(100% + 10px);
                    background: white;
                    border-radius: 12px;
                    box-shadow: var(--shadow-md);
                    border: 1px solid rgba(0,0,0,0.05);
                    min-width: 220px;
                    padding: 0.5rem;
                    z-index: 1060;
                    animation: dropFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                }

                [dir="ltr"] .user-dropdown-menu { right: 0; }
                [dir="rtl"] .user-dropdown-menu { left: 0; }

                @keyframes dropFade {
                    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .user-dropdown-header {
                    padding: 0.75rem 1rem;
                }

                .user-dropdown-header strong {
                    display: block;
                    font-size: 0.95rem;
                    color: var(--color-dark);
                }

                .user-dropdown-header span {
                    display: block;
                    font-size: 0.8rem;
                    color: var(--color-gray);
                    margin-top: 2px;
                }

                .dropdown-divider {
                    height: 1px;
                    background: rgba(0,0,0,0.05);
                    margin: 0.25rem 0;
                }

                .dropdown-item {
                    display: block;
                    width: 100%;
                    text-align: match-parent;
                    padding: 0.6rem 1rem;
                    border-radius: 8px;
                    color: var(--color-dark);
                    font-weight: 600;
                    font-size: 0.9rem;
                    text-decoration: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                [dir="rtl"] .dropdown-item { text-align: right; }
                [dir="ltr"] .dropdown-item { text-align: left; }

                .dropdown-item:hover {
                    background: rgba(15, 76, 255, 0.05);
                    color: var(--color-blue);
                }

                .dropdown-item.text-danger:hover {
                    background: #fef2f2;
                    color: #ef4444;
                }

                .mobile-toggle {
                    display: none;
                    background: none;
                    border: none;
                    color: var(--color-dark);
                    cursor: pointer;
                    padding: 0.5rem;
                    z-index: 1060;
                    transition: color 0.2s;
                }
                
                .mobile-toggle:hover {
                    color: var(--color-blue);
                }

                @media (max-width: 1024px) {
                    body {
                        padding-top: var(--nav-height);
                    }
                    
                    .top-bar {
                        display: none;
                    }
                    
                    .mobile-toggle {
                        display: block;
                    }

                    .navbar-menu {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: var(--color-white);
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-start;
                        padding: calc(var(--nav-height) + 1rem) 2rem 2rem;
                        margin: 0 !important;
                        opacity: 0;
                        visibility: hidden;
                        transform: translateX(100%);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        overflow-y: auto;
                    }
                    
                    [dir="rtl"] .navbar-menu {
                        transform: translateX(-100%);
                    }

                    .navbar-menu.open {
                        opacity: 1;
                        visibility: visible;
                        transform: translateX(0);
                    }

                    .nav-links {
                        flex-direction: column;
                        align-items: flex-start;
                        width: 100%;
                        gap: 1.2rem;
                    }

                    .nav-links a {
                        font-size: 1.2rem;
                        display: block;
                        width: 100%;
                        padding-bottom: 0.8rem;
                        border-bottom: 1px solid var(--color-gray-light);
                    }

                    .nav-actions {
                        width: 100%;
                        flex-direction: column;
                        align-items: flex-start;
                        margin-top: 2rem;
                        padding-top: 1rem;
                        gap: 1rem;
                    }

                    .auth-buttons {
                        width: 100%;
                        flex-direction: column;
                        align-items: stretch;
                        padding: 0;
                        border: none;
                        gap: 1rem;
                        margin-top: 1rem;
                    }

                    .btn-login {
                        width: 100%;
                        text-align: center;
                        padding: 0.8rem;
                        font-size: 1rem;
                        border: 2px solid var(--color-gray-light);
                    }
                    
                    .btn-signup {
                        width: 100%;
                        text-align: center;
                        padding: 0.8rem;
                        font-size: 1rem;
                    }
                }
            `}} />
        </header>
    );
};

export default Navbar;
