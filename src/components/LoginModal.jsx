import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useTranslation } from 'react-i18next';

const LoginModal = ({ isOpen, onClose, onLoginSuccess, initialStep = 1 }) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');

    // Auth States: 1: Role Selection, 2: Registration, 3: Login
    const [step, setStep] = useState(initialStep);

    useEffect(() => {
        if (isOpen) {
            setStep(initialStep);
        }
    }, [isOpen, initialStep]);
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });

    // Validation States
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');

    // Lock page scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const resetFlow = () => {
        setStep(initialStep);
        setRole('');
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        setNameError('');
        setEmailError('');
        setPassError('');
        setShowPassword(false);
        setPasswordStrength({ score: 0, label: '', color: '' });
        setLoading(false);
    };

    const calculatePasswordStrength = (pass) => {
        let score = 0;
        if (!pass) return { score: 0, label: '', color: '' };

        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[a-z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[!@#$%^&*]/.test(pass)) score++;

        let label = '';
        let color = '';

        if (score <= 2) {
            label = isRtl ? 'ضعيف' : 'Weak';
            color = 'text-danger';
        } else if (score <= 4) {
            label = isRtl ? 'متوسط' : 'Medium';
            color = 'text-warning';
        } else {
            label = isRtl ? 'قوي' : 'Strong';
            color = 'text-success';
        }

        return { score, label, color };
    };

    const handlePasswordChange = (e) => {
        const newPass = e.target.value;
        setPassword(newPass);
        setPassError('');
        setPasswordStrength(calculatePasswordStrength(newPass));
    };

    const validateEmail = (mail) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    };

    const validatePasswordStrict = (pass) => {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        return regex.test(pass) && pass.length >= 8;
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep(2); // Proceed directly to Registration
    };

    const handleRegisterStep = async (e) => {
        e.preventDefault();
        setError('');
        setNameError('');
        setEmailError('');
        setPassError('');

        // Validation
        let isValid = true;
        if (!name.trim()) {
            setNameError(isRtl ? 'الاسم مطلوب' : 'Name is required');
            isValid = false;
        }
        if (!validateEmail(email)) {
            setEmailError(isRtl ? 'البريد الإلكتروني غير صالح' : 'Invalid email address');
            isValid = false;
        }
        if (!validatePasswordStrict(password)) {
            setPassError(isRtl ? 'يجب أن تحتوي كلمة المرور على 8 أحرف، حرف كبير، حرف صغير، رقم، ورمز خاص' : 'Password must be 8+ chars, with uppercase, lowercase, number & special char');
            isValid = false;
        }

        if (!isValid) return;

        setLoading(true);
        try {
            const exists = await authService.checkAccountExists(email);
            if (exists) {
                setError(isRtl ? 'هذا الحساب موجود بالفعل. يرجى تسجيل الدخول' : 'Account already exists. Please login instead.');
                setStep(3);
                setLoading(false);
                return;
            }

            const user = await authService.register({ name, email, password, role });
            const loggedInUser = await authService.login(email, password);
            onLoginSuccess(loggedInUser);
            onClose();
            resetFlow();
        } catch (err) {
            setError(err.message || (isRtl ? 'فشل إنشاء الحساب' : 'Failed to create account'));
        } finally {
            setLoading(false);
        }
    };

    const handleLoginStep = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const user = await authService.login(email, password);
            onLoginSuccess(user);
            onClose();
            resetFlow();
        } catch (err) {
            if (err.message === 'USER_NOT_FOUND') {
                setError(isRtl ? 'هذا البريد الإلكتروني غير مسجل' : 'This email is not registered');
            } else if (err.message === 'INVALID_PASSWORD') {
                setError(isRtl ? 'كلمة المرور غير صحيحة' : 'Incorrect password');
            } else {
                setError(isRtl ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
            }
        } finally {
            setLoading(false);
        }
    };

    // Helper to render password input with toggle
    const renderPasswordInput = (isRegister = false) => (
        <div className="input-group">
            <span className="input-group-text bg-light border-0 px-3">
                <i className="fas fa-lock text-muted"></i>
            </span>
            <input
                type={showPassword ? "text" : "password"}
                className={`form-control bg-light border-0 py-3 ${isRegister && passError ? 'is-invalid' : ''}`}
                placeholder="••••••••"
                required
                value={password}
                onChange={isRegister ? handlePasswordChange : (e) => { setPassword(e.target.value); if (error) setError(''); }}
            />
            <button
                type="button"
                className="btn bg-light border-0 text-muted px-3"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
            >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
            {isRegister && passError && <div className="invalid-feedback d-block mt-2 ps-1">{passError}</div>}
        </div>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-wrapper shadow-2xl animate__animated animate__fadeInUp" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="auth-header py-4 px-5 bg-primary text-white position-relative">
                    <h4 className="fw-bold mb-0 text-center">
                        {step === 1 && (isRtl ? 'اختر نوع الحساب' : 'Account Type')}
                        {step === 2 && (isRtl ? 'إنشاء حساب جديد' : 'Registration')}
                        {step === 3 && (isRtl ? 'تسجيل الدخول' : 'Login')}
                    </h4>
                    <button className="auth-close-btn border-0 bg-transparent text-white opacity-75 hover-opacity-100"
                        style={{ position: 'absolute', top: '20px', [isRtl ? 'left' : 'right']: '20px' }}
                        onClick={() => { onClose(); resetFlow(); }}>
                        <i className="fas fa-times fs-5"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body p-4 p-md-5 bg-white">
                    {error && (
                        <div className="alert alert-danger rounded-4 p-3 mb-4 d-flex align-items-center animate__animated animate__shakeX border-0 shadow-sm">
                            <i className="fas fa-exclamation-triangle me-3 fs-5"></i>
                            <div className="small fw-bold">{error}</div>
                        </div>
                    )}

                    {/* Step 1: Role Selection */}
                    {step === 1 && (
                        <div className="animate__animated animate__fadeIn">
                            <p className="text-center text-muted mb-4 small fw-semibold">
                                {isRtl ? 'اختر دورك للبدء' : 'Choose your role to get started'}
                            </p>
                            <div className="row g-3">
                                <div className="col-12">
                                    <button className="account-type-card w-100 text-start border-2 shadow-sm p-4 rounded-4 bg-white" onClick={() => handleRoleSelect('user')}>
                                        <div className="d-flex align-items-center">
                                            <div className="icon-box bg-primary-soft p-3 rounded-circle me-3">
                                                <i className="fas fa-user-graduate text-primary fs-4"></i>
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-1 ">{isRtl ? 'مستكشف' : 'Explorer'}</h6>
                                                <small className="text-muted">{isRtl ? 'اكتشف مستقبلك المهني' : 'Discover your future career'}</small>
                                            </div>
                                            <i className={`fas fa-chevron-${isRtl ? 'left' : 'right'} ms-auto opacity-25`}></i>
                                        </div>
                                    </button>
                                </div>
                                <div className="col-12">
                                    <button className="account-type-card w-100 text-start border-2 shadow-sm p-4 rounded-4 bg-white" onClick={() => handleRoleSelect('mentor')}>
                                        <div className="d-flex align-items-center">
                                            <div className="icon-box bg-success-soft p-3 rounded-circle me-3">
                                                <i className="fas fa-chalkboard-teacher text-success fs-4"></i>
                                            </div>
                                            <div>
                                                <h6 className="fw-bold mb-1 ">{isRtl ? 'موجه' : 'Mentor'}</h6>
                                                <small className="text-muted">{isRtl ? 'إرشاد المتعلمين وتقديم رؤى مهنية' : 'Guide learners and provide career insights'}</small>
                                            </div>
                                            <i className={`fas fa-chevron-${isRtl ? 'left' : 'right'} ms-auto opacity-25`}></i>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Registration Form */}
                    {step === 2 && (
                        <form onSubmit={handleRegisterStep} className="animate__animated animate__fadeIn">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary mb-2">{isRtl ? 'الاسم بالكامل' : 'Full Name'}</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0 px-3">
                                        <i className="fas fa-user text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control bg-light border-0 py-3 ${nameError ? 'is-invalid' : ''}`}
                                        placeholder={isRtl ? 'أدخل اسمك' : 'Enter your name'}
                                        required
                                        value={name}
                                        onChange={(e) => { setName(e.target.value); setNameError(''); }}
                                    />
                                    {nameError && <div className="invalid-feedback d-block mt-2 ps-1">{nameError}</div>}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary mb-2">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0 px-3">
                                        <i className="fas fa-envelope text-muted"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className={`form-control bg-light border-0 py-3 ${emailError ? 'is-invalid' : ''}`}
                                        placeholder="user@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                                    />
                                    {emailError && <div className="invalid-feedback d-block mt-2 ps-1">{emailError}</div>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="form-label small fw-bold text-secondary mb-0">{isRtl ? 'كلمة المرور' : 'Password'}</label>
                                    {password && (
                                        <span className={`small fw-bold ${passwordStrength.color}`}>
                                            {passwordStrength.label}
                                        </span>
                                    )}
                                </div>
                                {renderPasswordInput(true)}

                                {/* Password Strength Meter */}
                                {password && (
                                    <div className="progress mt-2" style={{ height: '4px' }}>
                                        <div
                                            className={`progress-bar ${passwordStrength.color.replace('text-', 'bg-')}`}
                                            role="progressbar"
                                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                )}

                                <div className="mt-2 ps-1 text-muted small" style={{ fontSize: '0.75rem' }}>
                                    <i className="fas fa-info-circle me-1"></i>
                                    {isRtl ? '8 أحرف، حرف كبير وصغير، رقم، ورمز خاص' : '8+ chars, uppercase, lowercase, number & special char'}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-lg mb-3" disabled={loading}>
                                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="fas fa-rocket me-2"></i>}
                                {isRtl ? 'ارسال' : 'Get Started Now'}
                            </button>
                            <div className="text-center mt-3">
                                <button type="button" className="btn btn-link text-decoration-none text-primary small fw-bold" onClick={() => { setStep(3); setError(''); }}>
                                    {isRtl ? 'لديك حساب؟ سجل دخول' : 'Account already exists? Sign In'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Login Form */}
                    {step === 3 && (
                        <form onSubmit={handleLoginStep} className="animate__animated animate__fadeIn">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary mb-2">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0 px-3">
                                        <i className="fas fa-user-circle text-muted"></i>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control bg-light border-0 py-3"
                                        placeholder="user@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="form-label small fw-bold text-secondary mb-0">{isRtl ? 'كلمة المرور' : 'Password'}</label>
                                    <button type="button" className="btn btn-link p-0 text-decoration-none small text-primary fw-bold" style={{ fontSize: '0.75rem' }}>
                                        {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                                    </button>
                                </div>
                                {renderPasswordInput(false)}
                            </div>
                            <button type="submit" className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-lg mb-3" disabled={loading}>
                                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="fas fa-sign-in-alt me-2"></i>}
                                {isRtl ? 'تسجيل دخول آمن' : 'Secure Sign In'}
                            </button>
                            <div className="text-center mt-3 d-flex justify-content-between px-2">
                                <button type="button" className="btn btn-link text-decoration-none text-muted small fw-bold" onClick={() => setStep(1)}>
                                    <i className={`fas fa-arrow-${isRtl ? 'right' : 'left'} me-2`}></i> {isRtl ? 'رجوع' : 'Back'}
                                </button>
                                <button type="button" className="btn btn-link text-decoration-none text-primary small fw-bold" onClick={() => { setStep(2); setError(''); }}>
                                    {isRtl ? 'مستخدم جديد؟ سجل' : 'New User? Register'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .bg-primary-soft { background-color: rgba(42, 82, 190, 0.1); }
                .bg-dark-soft { background-color: rgba(30, 41, 59, 0.1); }
                .bg-success-soft { background-color: rgba(16, 185, 129, 0.1); }
                .account-type-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; border: 2px solid #f1f5f9; }
                .account-type-card:hover { border-color: var(--primary) !important; background-color: #f8fbff !important; transform: translateY(-3px); }
                .hover-opacity-100:hover { opacity: 1 !important; }
                input.form-control:focus { background-color: #fff !important; box-shadow: 0 0 0 3px rgba(42, 82, 190, 0.15) !important; }
                .rounded-4 { border-radius: 1.25rem !important; }
                .text-success { color: #10b981 !important; }
                .bg-success { background-color: #10b981 !important; }
                .text-warning { color: #f59e0b !important; }
                .bg-warning { background-color: #f59e0b !important; }
                .text-danger { color: #ef4444 !important; }
                .bg-danger { background-color: #ef4444 !important; }
            `}} />
        </div>
    );
};

export default LoginModal;
