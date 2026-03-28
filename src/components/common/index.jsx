// Reusable components for Admin Panel
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi';

// ── Page Header ──
export function PageHeader({ title, subtitle, actionLabel, actionTo }) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{title}</h1>
                {subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{subtitle}</p>}
            </div>
            {actionLabel && actionTo && (
                <Link to={actionTo} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    padding: '10px 20px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
                    borderRadius: '10px', color: '#000', textDecoration: 'none',
                    fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.84rem',
                }}>
                    <FiPlus style={{ fontSize: '15px' }} /> {actionLabel}
                </Link>
            )}
        </div>
    );
}

// ── Stat Card ──
export function StatCard({ label, value, icon: Icon, color = '#00d4ff', change }) {
    return (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '22px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg,${color},transparent)` }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>{label}</p>
                    <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.8rem', color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
                    {change && <p style={{ fontSize: '0.75rem', color: change > 0 ? '#00ff88' : '#ef4444', marginTop: '6px' }}>{change > 0 ? '+' : ''}{change}% this month</p>}
                </div>
                <div style={{ width: '42px', height: '42px', background: `${color}15`, border: `1px solid ${color}25`, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: '18px' }}>
                    <Icon />
                </div>
            </div>
        </div>
    );
}

// ── Data Table ──
export function DataTable({ columns, data, onEdit, onDelete, loading }) {
    if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'Syne,sans-serif' }}>Loading...</div>;
    if (!data?.length) return (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FiAlertCircle style={{ fontSize: '32px', marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '600' }}>No records found</p>
        </div>
    );
    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                {col.label}
                            </th>
                        ))}
                        <th style={{ padding: '10px 16px', textAlign: 'right', fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={row._id || row.id || i} style={{ background: 'var(--bg-card)', borderRadius: '10px' }}>
                            {columns.map(col => (
                                <td key={col.key} style={{ padding: '14px 16px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', fontSize: '0.875rem', color: col.primary ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: col.primary ? 'Syne,sans-serif' : 'DM Sans,sans-serif', fontWeight: col.primary ? '600' : '400', whiteSpace: col.noWrap ? 'nowrap' : 'normal' }}>
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                            <td style={{ padding: '14px 16px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                {onEdit && (
                                    <button onClick={() => onEdit(row)} style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '7px', padding: '6px 10px', color: '#00d4ff', cursor: 'pointer', marginRight: '8px', fontSize: '13px' }}>
                                        <FiEdit2 />
                                    </button>
                                )}
                                {onDelete && (
                                    <button onClick={() => onDelete(row._id || row.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '7px', padding: '6px 10px', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}>
                                        <FiTrash2 />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Form Field ──
export function FormField({ label, required, children, hint }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>
            {children}
            {hint && <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{hint}</p>}
        </div>
    );
}

export const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: '10px', color: 'var(--text-primary)',
    fontFamily: 'DM Sans,sans-serif', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box',
};

export const textareaStyle = {
    ...inputStyle, resize: 'vertical', minHeight: '100px', lineHeight: '1.6',
};

// ── Badge ──
export function Badge({ label, color = '#00d4ff' }) {
    return (
        <span style={{ padding: '3px 10px', background: `${color}15`, border: `1px solid ${color}30`, borderRadius: '20px', fontSize: '0.7rem', fontFamily: 'Syne,sans-serif', fontWeight: '600', color }}>
            {label}
        </span>
    );
}

// ── Confirm Delete Dialog ──
export function ConfirmDialog({ open, onConfirm, onCancel, message }) {
    if (!open) return null;
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '20px', padding: '28px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444', fontSize: '20px' }}>
                    <FiTrash2 />
                </div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Confirm Delete</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>{message || 'Are you sure? This action cannot be undone.'}</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={onCancel} style={{ padding: '10px 20px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-secondary)', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={onConfirm} style={{ padding: '10px 20px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', color: '#ef4444', fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.84rem', cursor: 'pointer' }}>Delete</button>
                </div>
            </div>
        </div>
    );
}