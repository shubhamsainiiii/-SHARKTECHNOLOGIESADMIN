import { useState } from 'react';
import { FiSave, FiRefreshCw } from 'react-icons/fi';
import { inputStyle } from '../../components/common/index.jsx';
import toast from 'react-hot-toast';

const defaultStats = [
    { _id: '1', label: 'Projects Delivered', value: '50+', icon: '📁', color: '#00d4ff', description: 'Total projects shipped to clients' },
    { _id: '2', label: 'Happy Clients', value: '30+', icon: '😊', color: '#ff6b35', description: 'Clients who rated us 5 stars' },
    { _id: '3', label: 'Years Experience', value: '5+', icon: '🏆', color: '#00ff88', description: 'Combined team experience' },
    { _id: '4', label: 'Client Satisfaction', value: '98%', icon: '⭐', color: '#fbbf24', description: 'Average satisfaction score' },
    { _id: '5', label: 'Countries Served', value: '10+', icon: '🌍', color: '#a78bfa', description: 'Global client reach' },
    { _id: '6', label: 'Team Members', value: '5', icon: '👥', color: '#f472b6', description: 'Core development team' },
];

export default function StatsPage() {
    const [stats, setStats] = useState(defaultStats);
    const [saving, setSaving] = useState(false);

    const updateStat = (id, key, val) => {
        setStats(prev => prev.map(s => s._id === id ? { ...s, [key]: val } : s));
    };

    const handleSave = async () => {
        setSaving(true);
        // TODO: Promise.all(stats.map(s => statsApi.update(s._id, s)))
        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
        toast.success('Stats updated successfully!');
    };

    const handleReset = () => setStats(defaultStats);

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Stats & Numbers</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>These numbers appear on the homepage hero and about page.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleReset} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-secondary)', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', cursor: 'pointer' }}>
                        <FiRefreshCw style={{ fontSize: '13px' }} /> Reset
                    </button>
                    <button onClick={handleSave} disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)', border: 'none', borderRadius: '10px', color: '#000', fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.84rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                        <FiSave style={{ fontSize: '13px' }} /> {saving ? 'Saving...' : 'Save All'}
                    </button>
                </div>
            </div>

            {/* Stats cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {stats.map(stat => (
                    <div key={stat._id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />

                        {/* Icon + preview value */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                            <div>
                                <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.6rem', color: stat.color, lineHeight: 1 }}>{stat.value}</p>
                                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.description}</p>
                            </div>
                        </div>

                        {/* Editable fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '5px' }}>Label</label>
                                <input style={{ ...inputStyle, fontSize: '0.84rem', padding: '8px 12px' }} value={stat.label} onChange={e => updateStat(stat._id, 'label', e.target.value)} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '5px' }}>Value</label>
                                <input style={{ ...inputStyle, fontSize: '0.84rem', padding: '8px 12px', fontFamily: 'Syne,sans-serif', fontWeight: '700', color: stat.color }} value={stat.value} onChange={e => updateStat(stat._id, 'value', e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Live preview */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
                <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Homepage Preview</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                    {stats.map(stat => (
                        <div key={stat._id} style={{ textAlign: 'center', minWidth: '80px' }}>
                            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: stat.color }}>{stat.value}</p>
                            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}