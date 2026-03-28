import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { FormField, inputStyle, textareaStyle } from '../../components/common/index.jsx';

const STATUSES = ['Draft', 'Published'];

const emptyForm = {
    name: '', role: '', company: '', avatar: '',
    message: '', rating: 5, project: '', date: '', status: 'Draft',
};

export default function TestimonialFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        // TODO: isEdit ? testimonialsApi.update(id, form) : testimonialsApi.create(form)
        await new Promise(r => setTimeout(r, 700));
        setSaving(false);
        navigate('/testimonials');
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <Link to="/testimonials" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', marginBottom: '16px' }}>
                    <FiArrowLeft /> Back to Testimonials
                </Link>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                    {isEdit ? 'Edit Testimonial' : 'Add Testimonial'}
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '20px' }} className="form-grid">
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Client Details</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <FormField label="Client Name" required>
                                <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rahul Sharma" required />
                            </FormField>
                            <FormField label="Role / Position">
                                <input style={inputStyle} value={form.role} onChange={e => set('role', e.target.value)} placeholder="CEO, TechStart" />
                            </FormField>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <FormField label="Company">
                                <input style={inputStyle} value={form.company} onChange={e => set('company', e.target.value)} placeholder="TechStart Inc." />
                            </FormField>
                            <FormField label="Project Name">
                                <input style={inputStyle} value={form.project} onChange={e => set('project', e.target.value)} placeholder="FinTrack Dashboard" />
                            </FormField>
                        </div>

                        <FormField label="Avatar URL" hint="Link to client photo (optional)">
                            <input style={inputStyle} value={form.avatar} onChange={e => set('avatar', e.target.value)} placeholder="https://..." type="url" />
                        </FormField>

                        <FormField label="Testimonial Message" required>
                            <textarea style={{ ...textareaStyle, minHeight: '130px' }} value={form.message} onChange={e => set('message', e.target.value)} placeholder="What the client said about your work..." required />
                        </FormField>

                        {/* Rating */}
                        <FormField label="Rating">
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button key={n} type="button" onClick={() => set('rating', n)} style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontSize: '28px', color: n <= form.rating ? '#fbbf24' : 'var(--border)',
                                        transition: 'color 0.15s', padding: '2px',
                                    }}>★</button>
                                ))}
                                <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.84rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>{form.rating}/5</span>
                            </div>
                        </FormField>
                    </div>

                    {/* Sidebar */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', alignSelf: 'start' }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Settings</h3>

                        <FormField label="Status">
                            <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                                {STATUSES.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </FormField>

                        <FormField label="Date" hint="e.g. January 2025">
                            <input style={inputStyle} value={form.date} onChange={e => set('date', e.target.value)} placeholder="March 2025" />
                        </FormField>

                        {/* Preview card */}
                        {form.message && (
                            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
                                <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>Preview</p>
                                <p style={{ color: '#fbbf24', fontSize: '14px', marginBottom: '8px' }}>{'★'.repeat(form.rating)}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.6', marginBottom: '10px', fontStyle: 'italic' }}>"{form.message.slice(0, 100)}{form.message.length > 100 ? '...' : ''}"</p>
                                <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.78rem', color: 'var(--text-primary)' }}>{form.name || 'Client Name'}</p>
                                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{form.role || 'Role'}</p>
                            </div>
                        )}

                        <button type="submit" disabled={saving} style={{
                            padding: '12px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
                            border: 'none', borderRadius: '10px', color: '#000',
                            fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem',
                            cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}>
                            <FiSave /> {saving ? 'Saving...' : isEdit ? 'Update' : 'Save Testimonial'}
                        </button>
                    </div>
                </div>
            </form>

            <style>{`
        .form-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .form-grid { grid-template-columns: 1fr 300px; } }
      `}</style>
        </div>
    );
}