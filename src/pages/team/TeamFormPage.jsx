import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { FormField, inputStyle, textareaStyle } from '../../components/common/index.jsx';

const STATUSES = ['Active', 'Inactive'];
const SOCIAL_PLATFORMS = ['GitHub', 'LinkedIn', 'Twitter', 'Portfolio'];

const emptyForm = {
    name: '', role: '', bio: '', avatar: '',
    skills: '', status: 'Active', order: '',
    github: '', linkedin: '', twitter: '', portfolio: '',
};

export default function TeamFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        // TODO: isEdit ? teamApi.update(id, form) : teamApi.create(form)
        await new Promise(r => setTimeout(r, 700));
        setSaving(false);
        navigate('/team');
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <Link to="/team" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', marginBottom: '16px' }}>
                    <FiArrowLeft /> Back to Team
                </Link>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                    {isEdit ? 'Edit Team Member' : 'Add Team Member'}
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '20px' }} className="form-grid">
                    {/* Main */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Member Details</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <FormField label="Full Name" required>
                                <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Arjun Singh" required />
                            </FormField>
                            <FormField label="Role / Title" required>
                                <input style={inputStyle} value={form.role} onChange={e => set('role', e.target.value)} placeholder="Full-Stack Developer" required />
                            </FormField>
                        </div>

                        <FormField label="Bio" hint="Short description shown on about/team page">
                            <textarea style={{ ...textareaStyle, minHeight: '90px' }} value={form.bio} onChange={e => set('bio', e.target.value)} placeholder="Brief intro about this team member..." />
                        </FormField>

                        <FormField label="Avatar URL" hint="Profile photo URL">
                            <input style={inputStyle} value={form.avatar} onChange={e => set('avatar', e.target.value)} placeholder="https://..." type="url" />
                        </FormField>

                        <FormField label="Skills" hint="Comma separated: React, Node.js, MongoDB">
                            <input style={inputStyle} value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="React, Node.js, MongoDB, AWS" />
                        </FormField>

                        {/* Social links */}
                        <div>
                            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '12px' }}>Social Links</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {[
                                    { key: 'github', placeholder: 'github.com/username' },
                                    { key: 'linkedin', placeholder: 'linkedin.com/in/username' },
                                    { key: 'twitter', placeholder: 'twitter.com/username' },
                                    { key: 'portfolio', placeholder: 'portfolio URL' },
                                ].map(({ key, placeholder }) => (
                                    <FormField key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
                                        <input style={inputStyle} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} />
                                    </FormField>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignSelf: 'start' }}>
                        {/* Avatar preview */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 12px',
                                background: form.avatar ? 'transparent' : 'linear-gradient(135deg,#00d4ff,#a78bfa)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden',
                            }}>
                                {form.avatar
                                    ? <img src={form.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                                    : <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.8rem', color: '#000' }}>{form.name?.[0] || 'A'}</span>
                                }
                            </div>
                            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{form.name || 'Team Member'}</p>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{form.role || 'Role'}</p>
                        </div>

                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <FormField label="Status">
                                <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </FormField>

                            <FormField label="Display Order" hint="Lower = appears first">
                                <input style={inputStyle} type="number" min="1" value={form.order} onChange={e => set('order', e.target.value)} placeholder="1" />
                            </FormField>

                            <button type="submit" disabled={saving} style={{
                                padding: '12px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
                                border: 'none', borderRadius: '10px', color: '#000',
                                fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem',
                                cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            }}>
                                <FiSave /> {saving ? 'Saving...' : isEdit ? 'Update Member' : 'Add Member'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <style>{`
        .form-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .form-grid { grid-template-columns: 1fr 280px; } }
      `}</style>
        </div>
    );
}