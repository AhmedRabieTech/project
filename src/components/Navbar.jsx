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

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const userRef = useRef(null);
    const isAdmin = authService.isAdmin();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            root.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            root.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

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
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <header className={`modern-navbar ${scrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark-mode' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
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
                {/* Logo Section */}
                <Link to="/" className="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="logo-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="logo-text">graduate<span>_career</span></span>
                </Link>

                {/* Mobile Burger Menu */}
                <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
                </button>

                {/* Navigation and Actions */}
                <nav className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>

                    {/* Navigation Links Section */}
                    <ul className="nav-links">
                        <li>
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                <i className="bi bi-house"></i> <span>{t('nav.home')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/career-paths" onClick={() => setIsMobileMenuOpen(false)}>
                                <i className="bi bi-briefcase"></i> <span>{t('nav.services')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/recommendation" onClick={() => setIsMobileMenuOpen(false)}>
                                <i className="bi bi-diagram-3"></i> <span>{t('nav.guidance')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/articles" onClick={() => setIsMobileMenuOpen(false)}>
                                <i className="bi bi-journal-text"></i> <span>{t('nav.articles')}</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsUniModalOpen(true); setIsMobileMenuOpen(false); }}>
                                <i className="bi bi-buildings"></i> <span>{isRtl ? 'الجامعات الشريكة' : 'Partner Universities'}</span>
                            </a>
                        </li>
                        <li>
                            <Link to="/support" onClick={() => setIsMobileMenuOpen(false)}>
                                <i className="bi bi-mortarboard"></i> <span>{isRtl ? 'مصادر التعلم' : 'Learning Resources'}</span>
                            </Link>
                        </li>
                    </ul>

                    {/* Actions Section */}
                    <div className="nav-actions">

                        <div className="quick-actions">
                            {/* Language Toggle */}
                            <button className="action-icon-btn" onClick={toggleLanguage} title={isRtl ? 'English' : 'عربي'}>
                                <i className="bi bi-translate"></i>
                            </button>

                            {/* Theme Toggle */}
                            <button className="action-icon-btn" onClick={toggleTheme} title="Toggle Theme">
                                <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}></i>
                            </button>
                        </div>

                        {/* Login/Register or User Dropdown */}
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
                    --nav-height: 80px;
                    --top-bar-height: 36px;
                    --nav-bg-color: var(--bg-color);
                    --nav-border-color: var(--border-color);
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
                    background: var(--nav-bg-color);
                    border-bottom: 1px solid var(--nav-border-color);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-family: Cairo, Inter, sans-serif;
                }

                .modern-navbar.scrolled {
                    box-shadow: var(--nav-shadow);
                }
                
                .modern-navbar.scrolled .top-bar {
                    height: 0;
                    overflow: hidden;
                    opacity: 0;
                    padding: 0;
                }

                .top-bar {
                    background: var(--nav-blue);
                    color: #ffffff;
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
                    gap: 1.5rem;
                }

                .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    z-index: 1060;
                    flex-shrink: 0;
                }

                .logo-icon {
                    width: 40px;
                    height: 40px;
                    background: var(--nav-blue);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .logo-text {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--nav-text-color);
                    letter-spacing: -0.02em;
                }

                .logo-text span {
                    color: var(--nav-blue);
                }

                .navbar-menu {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex: 1;
                    /* Ensure navigation doesn't cross logo */
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    flex: 1;
                }

                .nav-links a {
                    text-decoration: none;
                    color: var(--nav-text-color);
                    font-size: 0.95rem;
                    font-weight: 600;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                }

                .nav-links a i {
                    font-size: 1.15rem;
                    color: var(--nav-gray);
                    transition: color 0.2s ease;
                    display: flex;
                    align-items: center;
                }

                .nav-links a:hover,
                .nav-links a:hover i {
                    color: var(--nav-blue);
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-shrink: 0;
                }

                .quick-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .action-icon-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    color: var(--nav-text-color) !important;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    font-size: 1.2rem;
                    z-index: 1061;
                }

                .action-icon-btn:hover {
                    color: var(--nav-blue);
                    background: var(--nav-gray-light);
                }

                .auth-buttons {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    padding-inline-start: 1rem;
                    border-inline-start: 1px solid var(--nav-border);
                }

                .btn-login {
                    background: transparent;
                    color: var(--nav-text-color);
                    border: 2px solid transparent;
                    font-weight: 700;
                    font-size: 0.95rem;
                    padding: 0.5rem 1.25rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }

                .btn-login:hover {
                    background: var(--nav-gray-light);
                    border-color: var(--nav-border);
                }

                .btn-signup {
                    background: var(--nav-blue);
                    color: #ffffff;
                    border: 2px solid var(--nav-blue);
                    font-weight: 700;
                    font-size: 0.95rem;
                    padding: 0.5rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 10px rgba(15, 76, 255, 0.2);
                    white-space: nowrap;
                }

                .btn-signup:hover {
                    background: var(--nav-blue-dark);
                    border-color: var(--nav-blue-dark);
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
                    border-color: var(--nav-blue);
                }

                .avatar-circle {
                    width: 40px;
                    height: 40px;
                    background: var(--nav-blue);
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
                    background: var(--nav-bg-color);
                    border-radius: 12px;
                    box-shadow: var(--nav-shadow);
                    border: 1px solid var(--nav-border);
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
                    color: var(--nav-text-color);
                }

                .user-dropdown-header span {
                    display: block;
                    font-size: 0.8rem;
                    color: var(--nav-gray);
                    margin-top: 2px;
                }

                .dropdown-divider {
                    height: 1px;
                    background: var(--nav-border);
                    margin: 0.25rem 0;
                }

                .dropdown-item {
                    display: block;
                    width: 100%;
                    text-align: match-parent;
                    padding: 0.6rem 1rem;
                    border-radius: 8px;
                    color: var(--nav-text-color);
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
                    color: var(--nav-blue);
                }

                .dropdown-item.text-danger:hover {
                    background: #fef2f2;
                    color: #ef4444;
                }

                .mobile-toggle {
                    display: none;
                    background: none;
                    border: none;
                    color: var(--nav-text-color);
                    cursor: pointer;
                    padding: 0.5rem;
                    z-index: 1060;
                    transition: color 0.2s;
                    font-size: 1.5rem;
                }
                
                .mobile-toggle:hover {
                    color: var(--nav-blue);
                }

                @media (max-width: 1100px) {
                    .nav-links {
                        gap: 1rem;
                    }
                    .nav-links a {
                        font-size: 0.85rem;
                    }
                    .btn-login, .btn-signup {
                        padding: 0.4rem 1rem;
                    }
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
                        background: var(--nav-bg-color);
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
                        justify-content: flex-start;
                    }

                    .nav-links a {
                        font-size: 1.2rem;
                        display: flex;
                        width: 100%;
                        padding-bottom: 0.8rem;
                        border-bottom: 1px solid var(--nav-border);
                    }

                    .nav-actions {
                        width: 100%;
                        flex-direction: column;
                        align-items: flex-start;
                        margin-top: 2rem;
                        padding-top: 1rem;
                        gap: 1.5rem;
                    }

                    .quick-actions {
                        justify-content: flex-start;
                        width: 100%;
                        gap: 1rem;
                    }

                    .action-icon-btn {
                        background: var(--nav-gray-light);
                        border-radius: 8px;
                        width: 100%;
                        padding: 0.8rem;
                        justify-content: center;
                        gap: 0.5rem;
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
                        border: 2px solid var(--nav-border);
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
