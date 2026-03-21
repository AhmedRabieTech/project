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

    const [currentTime, setCurrentTime] = useState(new Date());
    const [prayerTimes, setPrayerTimes] = useState(null);

    // 1. Live Clock Timer
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 2. Fetch User Location & Prayer Times
    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                let city = 'Cairo', country = 'Egypt';
                // Try to get location from IP
                try {
                    const locRes = await fetch('https://ipapi.co/json/');
                    if (locRes.ok) {
                        const locData = await locRes.json();
                        if (locData.city) city = locData.city;
                        if (locData.country_name) country = locData.country_name;
                    }
                } catch (e) {
                    console.log("Could not fetch IP location, defaulting to Cairo.");
                }

                // Fetch timings from Aladhan API
                const date = new Date();
                const dd = String(date.getDate()).padStart(2, '0');
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const yyyy = date.getFullYear();
                const url = `https://api.aladhan.com/v1/timingsByCity/${dd}-${mm}-${yyyy}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=5`;
                const res = await fetch(url);
                const data = await res.json();
                if (data?.data?.timings) {
                    setPrayerTimes(data.data.timings);
                }
            } catch (error) {
                console.error("Prayer API error", error);
            }
        };
        fetchPrayerTimes();
    }, []);

    // 3. Compute Next Prayer
    const getNextPrayer = () => {
        if (!prayerTimes) return null;
        const prayers = [
            { en: 'Fajr', ar: 'الفجر', key: 'Fajr' },
            { en: 'Sunrise', ar: 'الشروق', key: 'Sunrise' },
            { en: 'Dhuhr', ar: 'الظهر', key: 'Dhuhr' },
            { en: 'Asr', ar: 'العصر', key: 'Asr' },
            { en: 'Maghrib', ar: 'المغرب', key: 'Maghrib' },
            { en: 'Isha', ar: 'العشاء', key: 'Isha' }
        ];
        const now = currentTime;
        const curMins = now.getHours() * 60 + now.getMinutes();
        
        let next = prayers[0], minDiff = Infinity;
        for (let p of prayers) {
            const ts = prayerTimes[p.key];
            if (!ts) continue;
            const pm = Number(ts.split(':')[0]) * 60 + Number(ts.split(':')[1]);
            const diff = pm - curMins;
            if (diff > 0 && diff < minDiff) { 
                minDiff = diff; 
                next = { ...p, time: ts }; 
            }
        }
        if (minDiff === Infinity) {
            next = { ...prayers[0], time: prayerTimes['Fajr'] };
        }
        return next;
    };

    const nextPrayer = getNextPrayer();
    const formattedDate = currentTime.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = currentTime.toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

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
        <header className={`modern-navbar ${scrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
            {/* Top Bar for extra info */}
            <div className="top-bar">
                <div className="top-bar-container d-flex justify-content-between align-items-center w-100 px-3">
                    <div className="top-bar-info d-flex gap-4 align-items-center flex-wrap">
                        <div className="d-flex align-items-center gap-2">
                            <i className="far fa-calendar-alt opacity-75"></i>
                            <span style={{ fontSize: '0.85rem' }}>{formattedDate}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <i className="far fa-clock opacity-75"></i>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{formattedTime}</span>
                        </div>
                    </div>

                    {nextPrayer ? (
                        <div className="top-bar-info d-flex align-items-center gap-2">
                            <i className="fas fa-mosque opacity-75"></i>
                            <span style={{ fontSize: '0.85rem' }}>
                                {isRtl ? 'الصلاة القادمة: ' : 'Next Prayer: '}
                                <strong className="text-white mx-1">{isRtl ? nextPrayer.ar : nextPrayer.en}</strong>
                                <span className="badge bg-primary rounded-pill px-2 ms-1">{nextPrayer.time}</span>
                            </span>
                        </div>
                    ) : (
                        <div className="top-bar-info d-flex align-items-center gap-2 opacity-50">
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                            <span style={{ fontSize: '0.8rem' }}>{isRtl ? 'جلب المواقيت...' : 'Loading Timings...'}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="navbar-container">
                {/* 1. Left Section: Logo */}
                <Link to="/" className="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="logo-text">graduate <span className="logo-accent">career</span></span>
                </Link>

                {/* 2. Middle Section: Navigation Links & Mobile Menu Items */}
                <nav className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-links">
                        <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link></li>
                        <li><Link to="/career-paths" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.services')}</Link></li>
                        <li><Link to="/recommendation" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.guidance')}</Link></li>
                        <li><Link to="/articles" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.articles')}</Link></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setIsUniModalOpen(true); setIsMobileMenuOpen(false); }}>{isRtl ? 'الجامعات الشريكة' : 'Partner Universities'}</a></li>
                        <li><Link to="/support" onClick={() => setIsMobileMenuOpen(false)}>{isRtl ? 'مصادر التعلم' : 'Learning Resources'}</Link></li>
                    </ul>
                    
                    {/* Quick actions for mobile only (shown inside the menu drawer) */}
                    <div className="quick-actions mobile-only-flex">
                        <button className="minimal-action-btn" onClick={toggleLanguage} title={isRtl ? 'English' : 'عربي'}>
                            <span>{isRtl ? 'EN' : 'عربي'}</span>
                        </button>
                        <button className="minimal-action-btn" onClick={toggleTheme} title={isRtl ? 'تغيير المظهر' : 'Toggle Theme'}>
                            <span>{isDarkMode ? (isRtl ? 'النهار' : 'Light') : (isRtl ? 'الليل' : 'Dark')}</span>
                        </button>
                    </div>
                </nav>

                {/* 3. Right Section: Auth Buttons & Desk Quick Actions */}
                <div className="navbar-right">
                    <div className="quick-actions desktop-only-flex">
                        <button className="minimal-action-btn" onClick={toggleLanguage} title={isRtl ? 'English' : 'عربي'}>
                            {isRtl ? 'EN' : 'AR'}
                        </button>
                        <button className="minimal-action-btn" onClick={toggleTheme} title={isRtl ? 'تغيير المظهر' : 'Toggle Theme'}>
                            {isDarkMode ? 'Light' : 'Dark'}
                        </button>
                    </div>

                    <div className="auth-buttons">
                        {user ? (
                            <div className="user-dropdown-wrapper" ref={userRef}>
                                <button className="user-avatar-btn" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                                    <div className="avatar-circle">{user.name?.charAt(0) || 'U'}</div>
                                </button>
                                {isUserDropdownOpen && (
                                    <div className="user-dropdown-menu">
                                        <div className="user-dropdown-header"><strong>{user.name}</strong><span>{user.email}</span></div>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/profile" className="dropdown-item" onClick={() => { setIsUserDropdownOpen(false); setIsMobileMenuOpen(false); }}>{isRtl ? 'الملف الشخصي' : 'Profile'}</Link>
                                        {isAdmin && <Link to="/add-career" className="dropdown-item" onClick={() => { setIsUserDropdownOpen(false); setIsMobileMenuOpen(false); }}>{t('nav.admin')}</Link>}
                                        <div className="dropdown-divider"></div>
                                        <button onClick={handleLogout} className="dropdown-item text-danger">{t('nav.logout')}</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button onClick={openLogin} className="btn-login-text">
                                    {t('nav.login')}
                                </button>
                                <button onClick={openRegister} className="btn-signup-text">
                                    {t('nav.signup')}
                                </button>
                            </>
                        )}
                    </div>

                    <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>

            <LoginModal isOpen={isLoginModalOpen} initialStep={modalInitialStep} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
            <UniversityModal isOpen={isUniModalOpen} onClose={() => setIsUniModalOpen(false)} />
        </header>
    );
};

export default Navbar;
