// import { useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import { FiArrowLeft, FiSave } from 'react-icons/fi';
// import { FormField, inputStyle, textareaStyle } from '../../components/common/index.jsx';

// const ICONS = ['🌐', '📱', '🎨', '⚙', '☁', '📈', '🔒', '🛒', '📊', '🤖'];
// const STATUSES = ['Active', 'Inactive'];

// const emptyForm = {
//     title: '', slug: '', icon: '🌐', tagline: '', shortDesc: '',
//     longDesc: '', features: '', status: 'Active', order: '',
// };

// export default function ServiceFormPage() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const isEdit = !!id;
//     const [form, setForm] = useState(emptyForm);
//     const [saving, setSaving] = useState(false);

//     const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         // TODO: isEdit ? servicesApi.update(id, form) : servicesApi.create(form)
//         await new Promise(r => setTimeout(r, 700));
//         setSaving(false);
//         navigate('/services');
//     };

//     return (
//         <div>
//             <div style={{ marginBottom: '24px' }}>
//                 <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', marginBottom: '16px' }}>
//                     <FiArrowLeft /> Back to Services
//                 </Link>
//                 <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
//                     {isEdit ? 'Edit Service' : 'Add New Service'}
//                 </h1>
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <div style={{ display: 'grid', gap: '20px' }} className="form-grid">
//                     {/* Main */}
//                     <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
//                         <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Service Details</h3>

//                         {/* Icon picker */}
//                         <FormField label="Icon">
//                             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//                                 {ICONS.map(ic => (
//                                     <button key={ic} type="button" onClick={() => set('icon', ic)} style={{
//                                         width: '40px', height: '40px', borderRadius: '10px', fontSize: '20px',
//                                         border: form.icon === ic ? '2px solid var(--accent)' : '1px solid var(--border)',
//                                         background: form.icon === ic ? 'rgba(0,212,255,0.1)' : 'var(--bg-secondary)',
//                                         cursor: 'pointer',
//                                     }}>{ic}</button>
//                                 ))}
//                             </div>
//                         </FormField>

//                         <FormField label="Service Title" required>
//                             <input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Web Development" required />
//                         </FormField>

//                         <FormField label="Slug" hint="Auto-generate or type manually">
//                             <input style={inputStyle} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. web-development" />
//                         </FormField>

//                         <FormField label="Tagline" hint="Short phrase shown on cards">
//                             <input style={inputStyle} value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="e.g. Scalable web apps that convert" />
//                         </FormField>

//                         <FormField label="Short Description" required hint="Shown on service cards">
//                             <textarea style={{ ...textareaStyle, minHeight: '70px' }} value={form.shortDesc} onChange={e => set('shortDesc', e.target.value)} placeholder="Brief overview for cards..." required />
//                         </FormField>

//                         <FormField label="Full Description" hint="Shown on service detail page">
//                             <textarea style={textareaStyle} value={form.longDesc} onChange={e => set('longDesc', e.target.value)} placeholder="Detailed description..." />
//                         </FormField>

//                         <FormField label="Features / What We Deliver" hint="One feature per line">
//                             <textarea style={{ ...textareaStyle, minHeight: '120px' }} value={form.features} onChange={e => set('features', e.target.value)} placeholder={"Custom CMS Integration\nSEO-optimized Structure\nReal-time Features"} />
//                         </FormField>
//                     </div>

//                     {/* Sidebar */}
//                     <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', alignSelf: 'start' }}>
//                         <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Settings</h3>

//                         <FormField label="Status">
//                             <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
//                                 {STATUSES.map(s => <option key={s}>{s}</option>)}
//                             </select>
//                         </FormField>

//                         <FormField label="Display Order" hint="Lower number = shown first">
//                             <input style={inputStyle} type="number" min="1" value={form.order} onChange={e => set('order', e.target.value)} placeholder="1" />
//                         </FormField>

//                         {/* Preview */}
//                         <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
//                             <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>Preview</p>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
//                                 <span style={{ fontSize: '22px' }}>{form.icon || '🌐'}</span>
//                                 <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{form.title || 'Service Title'}</span>
//                             </div>
//                             <p style={{ fontSize: '0.78rem', color: 'var(--accent)' }}>{form.tagline || 'Tagline here'}</p>
//                         </div>

//                         <button type="submit" disabled={saving} style={{
//                             padding: '12px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
//                             border: 'none', borderRadius: '10px', color: '#000',
//                             fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem',
//                             cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
//                             display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
//                         }}>
//                             <FiSave /> {saving ? 'Saving...' : isEdit ? 'Update Service' : 'Save Service'}
//                         </button>
//                     </div>
//                 </div>
//             </form>

//             <style>{`
//         .form-grid { grid-template-columns: 1fr; }
//         @media (min-width: 900px) { .form-grid { grid-template-columns: 1fr 300px; } }
//       `}</style>
//         </div>
//     );
// }



import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { FormField, inputStyle, textareaStyle } from '../../components/common/index.jsx';
import { servicesApi } from '../../api/index.js';
import toast from 'react-hot-toast';

const ICONS = ['🌐', '📱', '🎨', '⚙', '☁', '📈', '🔒', '🛒', '📊', '🤖', '🚀', '💡', '🔧', '🎯', '💻'];
const STATUSES = ['Active', 'Inactive'];
const ACCENTS = ['#00d4ff', '#ff6b35', '#a78bfa', '#00ff88', '#fbbf24', '#f472b6', '#38bdf8', '#fb7185'];

const emptyForm = {
    title: '', slug: '', icon: '🌐', tagline: '', shortDesc: '',
    longDesc: '', features: '', status: 'Active', order: '', accent: '#00d4ff',
};

const autoSlug = (str) => str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function ServiceFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    // Load existing service if editing
    useEffect(() => {
        if (!isEdit) return;
        servicesApi.getOne(id)
            .then(res => {
                const s = res.data;
                setForm({
                    title: s.title || '',
                    slug: s.slug || '',
                    icon: s.icon || '🌐',
                    tagline: s.tagline || '',
                    shortDesc: s.shortDesc || '',
                    longDesc: s.longDesc || '',
                    features: Array.isArray(s.features) ? s.features.join('\n') : '',
                    status: s.status || 'Active',
                    order: s.order || '',
                    accent: s.accent || '#00d4ff',
                });
            })
            .catch(() => toast.error('Failed to load service'));
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                ...form,
                features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
                order: form.order ? Number(form.order) : 0,
            };

            if (isEdit) {
                await servicesApi.update(id, payload);
                toast.success('Service updated!');
            } else {
                await servicesApi.create(payload);
                toast.success('Service created!');
            }
            navigate('/services');
        } catch (err) {
            toast.error(err.message || 'Something went wrong');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', marginBottom: '16px' }}>
                    <FiArrowLeft /> Back to Services
                </Link>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                    {isEdit ? 'Edit Service' : 'Add New Service'}
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '20px' }} className="form-grid">

                    {/* Main */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Service Details</h3>

                        {/* Icon picker */}
                        <FormField label="Icon">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {ICONS.map(ic => (
                                    <button key={ic} type="button" onClick={() => set('icon', ic)} style={{
                                        width: '42px', height: '42px', borderRadius: '10px', fontSize: '20px',
                                        border: form.icon === ic ? '2px solid var(--accent)' : '1px solid var(--border)',
                                        background: form.icon === ic ? 'rgba(0,212,255,0.1)' : 'var(--bg-secondary)',
                                        cursor: 'pointer',
                                    }}>{ic}</button>
                                ))}
                            </div>
                        </FormField>

                        {/* Accent color picker */}
                        <FormField label="Accent Color" hint="Used for card highlight and buttons">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                {ACCENTS.map(color => (
                                    <button key={color} type="button" onClick={() => set('accent', color)} style={{
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        background: color, cursor: 'pointer',
                                        border: form.accent === color ? '3px solid #fff' : '2px solid transparent',
                                        outline: form.accent === color ? `2px solid ${color}` : 'none',
                                        transition: 'all 0.15s',
                                    }} />
                                ))}
                                <input type="color" value={form.accent} onChange={e => set('accent', e.target.value)}
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border)', cursor: 'pointer', padding: 0, background: 'none' }}
                                    title="Custom color"
                                />
                            </div>
                        </FormField>

                        <FormField label="Service Title" required>
                            <input style={inputStyle} value={form.title}
                                onChange={e => { set('title', e.target.value); if (!isEdit) set('slug', autoSlug(e.target.value)); }}
                                placeholder="e.g. Web Development" required />
                        </FormField>

                        <FormField label="Slug" hint="Auto-generated from title">
                            <input style={inputStyle} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. web-development" />
                        </FormField>

                        <FormField label="Tagline" hint="Short phrase shown on cards">
                            <input style={inputStyle} value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="e.g. Scalable web apps that convert" />
                        </FormField>

                        <FormField label="Short Description" required hint="Shown on service cards">
                            <textarea style={{ ...textareaStyle, minHeight: '70px' }} value={form.shortDesc} onChange={e => set('shortDesc', e.target.value)} placeholder="Brief overview for cards..." required />
                        </FormField>

                        <FormField label="Full Description" hint="Shown on service detail page">
                            <textarea style={textareaStyle} value={form.longDesc} onChange={e => set('longDesc', e.target.value)} placeholder="Detailed description..." />
                        </FormField>

                        <FormField label="Features / What We Deliver" hint="One feature per line">
                            <textarea style={{ ...textareaStyle, minHeight: '140px' }} value={form.features} onChange={e => set('features', e.target.value)}
                                placeholder={"Custom CMS Integration\nSEO-optimized Structure\nReal-time Features\nPayment Integration"} />
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

                        <FormField label="Display Order" hint="Lower = shown first">
                            <input style={inputStyle} type="number" min="1" value={form.order} onChange={e => set('order', e.target.value)} placeholder="1" />
                        </FormField>

                        {/* Live Preview */}
                        <div style={{ background: 'var(--bg-secondary)', border: `1px solid ${form.accent}30`, borderRadius: '14px', padding: '18px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: '18px', right: '18px', height: '2px', background: `linear-gradient(90deg, ${form.accent}, transparent)` }} />
                            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Live Preview</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                <span style={{ width: '36px', height: '36px', background: `${form.accent}15`, border: `1px solid ${form.accent}28`, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{form.icon}</span>
                                <div>
                                    <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{form.title || 'Service Title'}</p>
                                    <p style={{ fontSize: '0.7rem', color: form.accent, fontFamily: 'Syne,sans-serif', fontWeight: '600' }}>{form.tagline || 'Tagline here'}</p>
                                </div>
                            </div>
                            {form.shortDesc && (
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '8px' }}>
                                    {form.shortDesc.slice(0, 80)}{form.shortDesc.length > 80 ? '...' : ''}
                                </p>
                            )}
                        </div>

                        <button type="submit" disabled={saving} style={{
                            padding: '12px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
                            border: 'none', borderRadius: '10px', color: '#000',
                            fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem',
                            cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}>
                            <FiSave /> {saving ? 'Saving...' : isEdit ? 'Update Service' : 'Save Service'}
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