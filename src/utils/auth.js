import bcrypt from 'bcryptjs';

const ADMIN_CREDENTIALS_KEY = 'admin_credentials';
const AUTH_TOKEN_KEY = 'admin_auth_token';

// Simple initialization for demo purposes (usually this would be on a backend)
export const initAdmin = async () => {
    if (!localStorage.getItem(ADMIN_CREDENTIALS_KEY)) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify({
            username: 'admin',
            password: hashedPassword
        }));
    }
};

export const login = async (username, password) => {
    const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (!stored) return false;

    const { username: storedUsername, password: storedPassword } = JSON.parse(stored);

    if (username === storedUsername) {
        const match = await bcrypt.compare(password, storedPassword);
        if (match) {
            localStorage.setItem(AUTH_TOKEN_KEY, 'true');
            return true;
        }
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY) === 'true';
};
