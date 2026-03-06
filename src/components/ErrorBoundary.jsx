import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
                    <div className="text-center p-5 bg-white shadow-lg rounded-4">
                        <div className="mb-4">
                            <i className="fas fa-exclamation-circle text-danger display-1"></i>
                        </div>
                        <h2 className="mb-3 fw-bold ">Something went wrong</h2>
                        <p className="text-muted mb-4">We encountered an unexpected error. Please try refreshing the page.</p>
                        <button
                            className="btn btn-primary rounded-pill px-4 py-2 fw-bold"
                            onClick={() => window.location.reload()}
                        >
                            <i className="fas fa-redo-alt me-2"></i> Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
