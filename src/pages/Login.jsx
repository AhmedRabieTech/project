import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, initAdmin } from '../utils/auth';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        initAdmin(); // Initialize default admin if not exists
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const success = await login(username, password);
        if (success) {
            navigate('/career-paths');
        } else {
            setError(t('login.error'));
        }
        setLoading(false);
    };

    return (
        <div className={`container-fluid py-5 ${isRtl ? 'text-end' : 'text-start'}`}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="bg-primary p-4 text-center">
                                <i className="fas fa-user-shield fa-3x text-white mb-3"></i>
                                <h3 className="text-white mb-0">{t('login.title')}</h3>
                                <p className="text-white-50 small">{t('login.subtitle')}</p>
                            </div>
                            <div className="card-body p-4 p-md-5">
                                {error && (
                                    <div className={`alert alert-danger alert-dismissible fade show mb-4 ${isRtl ? 'pe-5' : ''}`} role="alert">
                                        <i className={`fas fa-exclamation-circle ${isRtl ? 'ml-2' : 'me-2'}`}></i>
                                        {error}
                                        <button type="button" className={`btn-close ${isRtl ? 'start-0' : 'end-0'}`} onClick={() => setError('')}></button>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{t('login.username')}</label>
                                        <div className={`input-group border rounded-pill overflow-hidden bg-light px-3 py-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                            <span className="input-group-text bg-transparent border-0 text-muted">
                                                <i className="fas fa-user"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className={`form-control border-0 bg-transparent py-2 ${isRtl ? 'text-end' : ''}`}
                                                placeholder={t('login.placeholder_user')}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">{t('login.password')}</label>
                                        <div className={`input-group border rounded-pill overflow-hidden bg-light px-3 py-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                            <span className="input-group-text bg-transparent border-0 text-muted">
                                                <i className="fas fa-lock"></i>
                                            </span>
                                            <input
                                                type="password"
                                                className={`form-control border-0 bg-transparent py-2 ${isRtl ? 'text-end' : ''}`}
                                                placeholder={t('login.placeholder_pass')}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 rounded-pill py-3 fw-bold text-white shadow-sm mt-2"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span><i className="fas fa-spinner fa-spin me-2"></i>{t('login.logging')}</span>
                                        ) : (
                                            t('login.button')
                                        )}
                                    </button>
                                </form>
                                <div className="text-center mt-4">
                                    <small className="text-muted">Username: admin | Password: admin123</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
