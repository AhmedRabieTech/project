import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useTranslation } from 'react-i18next';
import LoginModal from './LoginModal';
import UniversityModal from './UniversityModal';
import './Navbar.css';

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
                    <span className="logo-text">graduate<span> career</span></span>
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
        </header>
    );
};

export default Navbar;
