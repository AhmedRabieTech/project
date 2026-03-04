const USERS_KEY = 'career_pilot_users';
const LOGGED_IN_USER_KEY = 'career_pilot_logged_in_user';

/**
 * Mock Authentication Service
 */
export const authService = {
    /**
     * Check if an account exists for the given email
     * @param {string} email 
     * @returns {Promise<boolean>}
     */
    async checkAccountExists(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
                resolve(exists);
            }, 500);
        });
    },

    /**
     * Register a new user
     * @param {Object} userData { name, email, password, role }
     * @returns {Promise<Object>}
     */
    async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
                    reject(new Error('Email already registered'));
                    return;
                }
                const newUser = { ...userData, id: Date.now() };
                users.push(newUser);
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
                resolve(newUser);
            }, 600);
        });
    },

    /**
     * Login user
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<Object>}
     */
    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

                if (!user) {
                    reject(new Error('USER_NOT_FOUND'));
                    return;
                }

                if (user.password !== password) {
                    reject(new Error('INVALID_PASSWORD'));
                    return;
                }

                localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
                resolve(user);
            }, 500);
        });
    },

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem(LOGGED_IN_USER_KEY);
    },

    /**
     * Get current user
     * @returns {Object|null}
     */
    getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY));
        } catch (e) {
            console.error('Error parsing user from local storage:', e);
            return null;
        }
    },

    /**
     * Check if authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        return !!this.getCurrentUser();
    },

    /**
     * Check if admin
     * @returns {boolean}
     */
    isAdmin() {
        const user = this.getCurrentUser();
        return user?.role === 'admin';
    }
};
