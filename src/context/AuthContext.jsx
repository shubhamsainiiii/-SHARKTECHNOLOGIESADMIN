// import { createContext, useState, useEffect } from 'react';
// export const AuthContext = createContext(null);
// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         const saved = localStorage.getItem('admin_user');
//         if (saved) setUser(JSON.parse(saved));
//         setLoading(false);
//     }, []);
//     const login = async (email, password) => {
//         // TODO: Replace with real API call -> POST /api/auth/login
//         if (email === 'admin@shark.dev' && password === 'admin123') {
//             const userData = { id: 1, name: 'Admin', email, role: 'superadmin' };
//             setUser(userData);
//             localStorage.setItem('admin_user', JSON.stringify(userData));
//             return { success: true };
//         }
//         return { success: false, message: 'Invalid credentials' };
//     };
//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('admin_user');
//         localStorage.removeItem('admin_token');
//     };
//     return (
//         <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }


import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount — check saved token and fetch /me
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        const saved = localStorage.getItem('admin_user');

        if (token && saved) {
            setUser(JSON.parse(saved));
            // Verify token is still valid
            fetch(`${BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        setUser(data.data);
                        localStorage.setItem('admin_user', JSON.stringify(data.data));
                    } else {
                        // Token expired
                        setUser(null);
                        localStorage.removeItem('admin_token');
                        localStorage.removeItem('admin_user');
                    }
                })
                .catch(() => {
                    // Backend not reachable — keep saved user
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // ── Login ──
    const login = async (email, password) => {
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (data.success) {
                const { token, admin } = data.data;
                localStorage.setItem('admin_token', token);
                localStorage.setItem('admin_user', JSON.stringify(admin));
                setUser(admin);
                return { success: true };
            }
            return { success: false, message: data.message || 'Login failed' };
        } catch (err) {
            return { success: false, message: 'Cannot connect to server. Is backend running?' };
        }
    };

    // ── Logout ──
    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}