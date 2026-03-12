import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddCareerPath from './pages/AddCareerPath';
import ViewCareerPaths from './pages/ViewCareerPaths';
import UserRecommendation from './pages/UserRecommendation';
import Articles from './pages/Articles';
import ArticlePage from './pages/ArticlePage';
import LearningResources from './pages/LearningResources';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    const { i18n } = useTranslation();

    React.useEffect(() => {
        const currentLang = i18n.language || 'en';
        const dir = (currentLang && (currentLang.startsWith('ar') || currentLang.startsWith('he'))) ? 'rtl' : 'ltr';
        document.body.dir = dir;
        document.documentElement.dir = dir;
        document.documentElement.lang = currentLang;
    }, [i18n.language]);

    return (
        <ErrorBoundary>
            <Router basename="/project">
                <div className="app-container">
                    <Navbar />
                    <div style={{ minHeight: '600px' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/recommendation"
                                element={<UserRecommendation />}
                            />
                            <Route
                                path="/career-paths"
                                element={<ViewCareerPaths />}
                            />
                            <Route
                                path="/articles"
                                element={<Articles />}
                            />
                            <Route
                                path="/article/:id"
                                element={<ArticlePage />}
                            />
                            <Route
                                path="/support"
                                element={<LearningResources />}
                            />
                            <Route
                                path="/add-career"
                                element={
                                    <ProtectedRoute requireAdmin={true}>
                                        <AddCareerPath />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ErrorBoundary>
    );
};

export default App;
