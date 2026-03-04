import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to home and trigger login modal
        return <Navigate to="/" state={{ openLogin: true, from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        // Authenticated but not admin - redirect home without login modal
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
