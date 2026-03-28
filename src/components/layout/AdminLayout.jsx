import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    FiGrid, FiFolder, FiSettings, FiUsers, FiStar,
    FiFileText, FiBarChart2, FiLogOut, FiMenu, FiX,
    FiZap, FiChevronRight,
} from 'react-icons/fi';

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
    { to: '/projects', label: 'Projects', icon: FiFolder },
    { to: '/services', label: 'Services', icon: FiZap },
    { to: '/testimonials', label: 'Testimonials', icon: FiStar },
    { to: '/blogs', label: 'Blogs', icon: FiFileText },
    { to: '/stats', label: 'Stats', icon: FiBarChart2 },
    { to: '/team', label: 'Team', icon: FiUsers },
    { to: '/settings', label: 'Settings', icon: FiSettings },
];

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/login'); };

    const SidebarContent = ({ mobile = false }) => (
        <aside style={{
            width: '240px',
            height: '100vh',
            background: 'var(--bg-sidebar)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flexShrink: 0,
        }}>
            {/* Logo */}
            <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🦈</div>
                    <div>
                        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '0.88rem', color: 'var(--text-primary)' }}>Shark Admin</div>
                        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Control Panel</div>
                    </div>
                </div>
                {mobile && (
                    <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px', padding: '4px' }}>
                        <FiX />
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '3px', overflowY: 'auto' }}>
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={() => mobile && setSidebarOpen(false)}
                        style={({ isActive }) => ({
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '10px 12px', borderRadius: '10px', textDecoration: 'none',
                            fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem',
                            transition: 'all 0.15s',
                            background: isActive ? 'rgba(0,212,255,0.1)' : 'transparent',
                            color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                            border: isActive ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                        })}
                    >
                        <Icon style={{ fontSize: '16px', flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{label}</span>
                        <FiChevronRight style={{ fontSize: '12px', opacity: 0.35 }} />
                    </NavLink>
                ))}
            </nav>

            {/* User + Logout */}
            <div style={{ padding: '12px 10px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', marginBottom: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '0.8rem', color: '#000', flexShrink: 0 }}>
                        {user?.name?.[0] || 'A'}
                    </div>
                    <div style={{ overflow: 'hidden', flex: 1 }}>
                        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.78rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{user?.role}</div>
                    </div>
                </div>
                <button onClick={handleLogout} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '9px 12px', borderRadius: '8px',
                    border: '1px solid rgba(239,68,68,0.2)',
                    background: 'rgba(239,68,68,0.07)', color: '#ef4444',
                    fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.8rem',
                    cursor: 'pointer',
                }}>
                    <FiLogOut style={{ fontSize: '14px' }} /> Logout
                </button>
            </div>
        </aside>
    );

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)' }}>

            {/* Desktop fixed sidebar */}
            <div className="sidebar-desktop" style={{ display: 'none', flexShrink: 0 }}>
                <SidebarContent />
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
                    <div onClick={() => setSidebarOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }} />
                    <div style={{ position: 'relative', zIndex: 101 }}>
                        <SidebarContent mobile />
                    </div>
                </div>
            )}

            {/* Main area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

                {/* Topbar */}
                <header style={{
                    height: '60px', flexShrink: 0,
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center',
                    padding: '0 20px', gap: '16px', zIndex: 40,
                }}>
                    <button className="menu-btn" onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                        <FiMenu />
                    </button>
                    <div style={{ flex: 1 }} />
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'Syne,sans-serif' }}>
                        Welcome, <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{user?.name}</span>
                    </div>
                </header>

                {/* Scrollable content */}
                <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '28px 24px' }}>
                    <Outlet />
                </main>
            </div>

            <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { display: flex !important; }
          .menu-btn { display: none !important; }
        }
      `}</style>
        </div>
    );
}