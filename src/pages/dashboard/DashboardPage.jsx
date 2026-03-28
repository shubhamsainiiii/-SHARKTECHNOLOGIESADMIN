import { FiFolder, FiZap, FiStar, FiFileText, FiUsers, FiBarChart2, FiActivity, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { StatCard } from '../../components/common/index.jsx';

const quickLinks = [
    { to: '/projects/new', label: 'Add Project', color: '#00d4ff' },
    { to: '/blogs/new', label: 'Write Blog', color: '#a78bfa' },
    { to: '/testimonials/new', label: 'Add Testimonial', color: '#fbbf24' },
    { to: '/team/new', label: 'Add Team Member', color: '#00ff88' },
];

const recentActivity = [
    { action: 'New project added', time: '2 min ago', color: '#00d4ff' },
    { action: 'Blog post published', time: '1 hr ago', color: '#a78bfa' },
    { action: 'Testimonial updated', time: '3 hrs ago', color: '#fbbf24' },
    { action: 'Team member profile edit', time: 'Yesterday', color: '#00ff88' },
];

export default function DashboardPage() {
    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Welcome back! Here's what's happening with your agency.</p>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '16px', marginBottom: '28px' }}>
                <StatCard label="Total Projects" value="12" icon={FiFolder} color="#00d4ff" change={8} />
                <StatCard label="Services" value="6" icon={FiZap} color="#ff6b35" />
                <StatCard label="Testimonials" value="24" icon={FiStar} color="#fbbf24" change={12} />
                <StatCard label="Blog Posts" value="9" icon={FiFileText} color="#a78bfa" change={3} />
                <StatCard label="Team Members" value="5" icon={FiUsers} color="#00ff88" />
                <StatCard label="Monthly Visitors" value="2.4k" icon={FiBarChart2} color="#f472b6" change={18} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="dash-grid">
                {/* Quick Actions */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '22px' }}>
                    <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiActivity style={{ color: 'var(--accent)' }} /> Quick Actions
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {quickLinks.map(({ to, label, color }) => (
                            <Link key={to} to={to} style={{
                                display: 'block', padding: '13px 16px',
                                background: `${color}0d`, border: `1px solid ${color}25`,
                                borderRadius: '12px', textDecoration: 'none',
                                fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.82rem', color,
                                transition: 'all 0.2s',
                            }}>+ {label}</Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '22px' }}>
                    <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiClock style={{ color: 'var(--accent)' }} /> Recent Activity
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recentActivity.map((a, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                                <span style={{ flex: 1, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{a.action}</span>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{a.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media (min-width: 768px) { .dash-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
        </div>
    );
}