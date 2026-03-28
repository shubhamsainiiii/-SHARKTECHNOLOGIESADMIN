import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError('');
        const res = await login(form.email, form.password);
        setLoading(false);
        if (res.success) navigate('/dashboard');
        else setError(res.message || 'Login failed');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            {/* Glow */}
            <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(0,212,255,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 14px' }}>🦈</div>
                    <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Shark Admin</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>Sign in to your control panel</p>
                </div>

                {/* Card */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>
                    {error && (
                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#ef4444', fontSize: '0.84rem', fontFamily: 'Syne,sans-serif' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.05em' }}>EMAIL</label>
                            <div style={{ position: 'relative' }}>
                                <FiMail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px' }} />
                                <input
                                    type="email" required value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    placeholder="admin@shark.dev"
                                    style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontFamily: 'DM Sans,sans-serif', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: 'block', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.05em' }}>PASSWORD</label>
                            <div style={{ position: 'relative' }}>
                                <FiLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px' }} />
                                <input
                                    type="password" required value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    placeholder="••••••••"
                                    style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontFamily: 'DM Sans,sans-serif', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} style={{
                            marginTop: '8px', padding: '13px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
                            border: 'none', borderRadius: '11px', color: '#000',
                            fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem',
                            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}>
                            <FiLogIn style={{ fontSize: '16px' }} />
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Default: admin@shark.dev / admin123
                    </p>
                </div>
            </div>
        </div>
    );
}