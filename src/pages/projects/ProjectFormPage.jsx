// import { useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import { FiArrowLeft, FiSave } from 'react-icons/fi';
// import { FormField, inputStyle, textareaStyle } from '../../components/common/index.jsx';

// const CATEGORIES = ['Web App', 'Mobile', 'E-Commerce', 'Full-Stack', 'UI/UX', 'API'];
// const STATUSES = ['Draft', 'Live', 'Archived'];

// const emptyForm = { title: '', slug: '', category: '', status: 'Draft', shortDesc: '', longDesc: '', tech: '', liveUrl: '', githubUrl: '', featured: false, year: new Date().getFullYear().toString() };

// export default function ProjectFormPage() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const isEdit = !!id;
//     const [form, setForm] = useState(emptyForm);
//     const [saving, setSaving] = useState(false);

//     const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         // TODO: isEdit ? projectsApi.update(id, form) : projectsApi.create(form)
//         await new Promise(r => setTimeout(r, 800));
//         setSaving(false);
//         navigate('/projects');
//     };

//     return (
//         <div>
//             {/* Header */}
//             <div style={{ marginBottom: '24px' }}>
//                 <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', marginBottom: '16px' }}>
//                     <FiArrowLeft /> Back to Projects
//                 </Link>
//                 <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
//                     {isEdit ? 'Edit Project' : 'Add New Project'}
//                 </h1>
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <div style={{ display: 'grid', gap: '20px' }} className="form-grid">
//                     {/* Main card */}
//                     <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
//                         <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Project Details</h3>

//                         <FormField label="Project Title" required>
//                             <input style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. FinTrack Dashboard" required />
//                         </FormField>

//                         <FormField label="Slug" hint="URL-friendly identifier (auto-generate or type manually)">
//                             <input style={inputStyle} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. fintrack-dashboard" />
//                         </FormField>

//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//                             <FormField label="Category" required>
//                                 <select style={inputStyle} value={form.category} onChange={e => set('category', e.target.value)} required>
//                                     <option value="">Select...</option>
//                                     {CATEGORIES.map(c => <option key={c}>{c}</option>)}
//                                 </select>
//                             </FormField>
//                             <FormField label="Status">
//                                 <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
//                                     {STATUSES.map(s => <option key={s}>{s}</option>)}
//                                 </select>
//                             </FormField>
//                         </div>

//                         <FormField label="Short Description" required hint="Shown on project cards (max 120 chars)">
//                             <textarea style={{ ...textareaStyle, minHeight: '70px' }} value={form.shortDesc} onChange={e => set('shortDesc', e.target.value)} placeholder="Brief description for cards..." required maxLength={120} />
//                         </FormField>

//                         <FormField label="Full Description">
//                             <textarea style={textareaStyle} value={form.longDesc} onChange={e => set('longDesc', e.target.value)} placeholder="Detailed project description for the detail page..." />
//                         </FormField>

//                         <FormField label="Tech Stack" hint="Comma separated: React, Node.js, MongoDB">
//                             <input style={inputStyle} value={form.tech} onChange={e => set('tech', e.target.value)} placeholder="React, Node.js, MongoDB, AWS" />
//                         </FormField>
//                     </div>

//                     {/* Sidebar card */}
//                     <div>
//                         <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
//                             <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Links & Settings</h3>

//                             <FormField label="Live URL">
//                                 <input style={inputStyle} value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://..." type="url" />
//                             </FormField>

//                             <FormField label="GitHub URL">
//                                 <input style={inputStyle} value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/..." type="url" />
//                             </FormField>

//                             <FormField label="Year">
//                                 <input style={inputStyle} value={form.year} onChange={e => set('year', e.target.value)} placeholder="2024" maxLength={4} />
//                             </FormField>

//                             <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
//                                 <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#00d4ff' }} />
//                                 <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Featured on homepage</span>
//                             </label>

//                             <button type="submit" disabled={saving} style={{
//                                 marginTop: '8px', padding: '12px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
//                                 border: 'none', borderRadius: '10px', color: '#000',
//                                 fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem',
//                                 cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
//                             }}>
//                                 <FiSave /> {saving ? 'Saving...' : isEdit ? 'Update Project' : 'Save Project'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </form>

//             <style>{`
//         .form-grid { grid-template-columns: 1fr; }
//         @media (min-width: 900px) { .form-grid { grid-template-columns: 1fr 320px; } }
//       `}</style>
//         </div>
//     );
// }



import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiUpload, FiX } from 'react-icons/fi';
import { FormField, inputStyle, textareaStyle } from '../../components/common/index.jsx';
import { projectsApi, uploadFile } from '../../api/index.js';
import toast from 'react-hot-toast';

const CATEGORIES = ['Web App', 'Mobile', 'E-Commerce', 'Full-Stack', 'UI/UX', 'API'];
const STATUSES = ['Draft', 'Live', 'Archived'];

const emptyForm = {
    title: '', slug: '', category: '', status: 'Draft',
    shortDesc: '', longDesc: '', tech: '',
    liveUrl: '', githubUrl: '', featured: false,
    year: new Date().getFullYear().toString(),
    coverImage: '', results: '',
};

const autoSlug = (title) =>
    title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function ProjectFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    // ── Load existing project if editing ──
    useEffect(() => {
        if (!isEdit) return;
        projectsApi.getOne(id)
            .then(res => {
                const p = res.data;
                setForm({
                    title: p.title || '',
                    slug: p.slug || '',
                    category: p.category || '',
                    status: p.status || 'Draft',
                    shortDesc: p.shortDesc || '',
                    longDesc: p.longDesc || '',
                    tech: Array.isArray(p.tech) ? p.tech.join(', ') : '',
                    liveUrl: p.liveUrl || '',
                    githubUrl: p.githubUrl || '',
                    featured: p.featured || false,
                    year: p.year || '',
                    coverImage: p.coverImage || '',
                    results: Array.isArray(p.results) ? p.results.join('\n') : '',
                });
                if (p.coverImage) setImagePreview(p.coverImage);
            })
            .catch(() => toast.error('Failed to load project'));
    }, [id, isEdit]);

    // ── Image upload handler ──
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // local preview
        setImagePreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const res = await uploadFile(file);      // → Cloudinary
            set('coverImage', res.data.url);         // save URL in form
            toast.success('Image uploaded!');
        } catch (err) {
            toast.error(err.message || 'Upload failed');
            setImagePreview('');
        } finally {
            setUploading(false);
        }
    };

    // ── Form submit ──
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Convert comma-separated strings to arrays
            const payload = {
                ...form,
                tech: form.tech.split(',').map(t => t.trim()).filter(Boolean),
                results: form.results.split('\n').map(r => r.trim()).filter(Boolean),
            };

            if (isEdit) {
                await projectsApi.update(id, payload);
                toast.success('Project updated!');
            } else {
                await projectsApi.create(payload);
                toast.success('Project created!');
            }

            navigate('/projects');
        } catch (err) {
            toast.error(err.message || 'Something went wrong');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <Link to="/projects" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: 'var(--text-secondary)', textDecoration: 'none',
                    fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', marginBottom: '16px',
                }}>
                    <FiArrowLeft /> Back to Projects
                </Link>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                    {isEdit ? 'Edit Project' : 'Add New Project'}
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '20px' }} className="form-grid">

                    {/* ── Main Card ── */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Project Details</h3>

                        <FormField label="Project Title" required>
                            <input
                                style={inputStyle}
                                value={form.title}
                                onChange={e => {
                                    set('title', e.target.value);
                                    if (!isEdit) set('slug', autoSlug(e.target.value));
                                }}
                                placeholder="e.g. FinTrack Dashboard"
                                required
                            />
                        </FormField>

                        <FormField label="Slug" hint="Auto-generated from title — edit if needed">
                            <input
                                style={inputStyle}
                                value={form.slug}
                                onChange={e => set('slug', e.target.value)}
                                placeholder="e.g. fintrack-dashboard"
                            />
                        </FormField>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <FormField label="Category" required>
                                <select style={inputStyle} value={form.category} onChange={e => set('category', e.target.value)} required>
                                    <option value="">Select...</option>
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </FormField>
                            <FormField label="Status">
                                <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </FormField>
                        </div>

                        <FormField label="Short Description" required hint="Shown on project cards (max 120 chars)">
                            <textarea
                                style={{ ...textareaStyle, minHeight: '70px' }}
                                value={form.shortDesc}
                                onChange={e => set('shortDesc', e.target.value)}
                                placeholder="Brief description for cards..."
                                required maxLength={120}
                            />
                        </FormField>

                        <FormField label="Full Description">
                            <textarea
                                style={textareaStyle}
                                value={form.longDesc}
                                onChange={e => set('longDesc', e.target.value)}
                                placeholder="Detailed project description for the detail page..."
                            />
                        </FormField>

                        <FormField label="Tech Stack" hint="Comma separated: React, Node.js, MongoDB">
                            <input
                                style={inputStyle}
                                value={form.tech}
                                onChange={e => set('tech', e.target.value)}
                                placeholder="React, Node.js, MongoDB, AWS"
                            />
                        </FormField>

                        <FormField label="Results / Achievements" hint="One result per line">
                            <textarea
                                style={{ ...textareaStyle, minHeight: '80px' }}
                                value={form.results}
                                onChange={e => set('results', e.target.value)}
                                placeholder={"98 Lighthouse score\n3x conversion rate improvement\n10,000+ users in first month"}
                            />
                        </FormField>

                        {/* Cover Image Upload */}
                        <FormField label="Cover Image">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {/* Preview */}
                                {imagePreview && (
                                    <div style={{ position: 'relative', width: '100%', height: '180px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                        <img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <button
                                            type="button"
                                            onClick={() => { setImagePreview(''); set('coverImage', ''); }}
                                            style={{
                                                position: 'absolute', top: '8px', right: '8px',
                                                background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
                                                width: '28px', height: '28px', display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', color: '#fff', cursor: 'pointer', fontSize: '14px',
                                            }}
                                        ><FiX /></button>
                                    </div>
                                )}

                                {/* Upload button */}
                                <label style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 16px', background: 'rgba(0,212,255,0.08)',
                                    border: '1px dashed rgba(0,212,255,0.3)', borderRadius: '10px',
                                    color: 'var(--accent)', cursor: 'pointer',
                                    fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem',
                                    opacity: uploading ? 0.6 : 1,
                                }}>
                                    <FiUpload />
                                    {uploading ? 'Uploading to Cloudinary...' : imagePreview ? 'Change Image' : 'Upload Cover Image'}
                                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                                </label>

                                {form.coverImage && (
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                                        ✓ {form.coverImage}
                                    </p>
                                )}
                            </div>
                        </FormField>
                    </div>

                    {/* ── Sidebar Card ── */}
                    <div style={{ alignSelf: 'start' }}>
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Links & Settings</h3>

                            <FormField label="Live URL">
                                <input style={inputStyle} value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)} placeholder="https://..." type="url" />
                            </FormField>

                            <FormField label="GitHub URL">
                                <input style={inputStyle} value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)} placeholder="https://github.com/..." type="url" />
                            </FormField>

                            <FormField label="Year">
                                <input style={inputStyle} value={form.year} onChange={e => set('year', e.target.value)} placeholder="2025" maxLength={4} />
                            </FormField>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox" checked={form.featured}
                                    onChange={e => set('featured', e.target.checked)}
                                    style={{ width: '16px', height: '16px', accentColor: '#00d4ff' }}
                                />
                                <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                                    Featured on homepage
                                </span>
                            </label>

                            <button
                                type="submit" disabled={saving || uploading}
                                style={{
                                    marginTop: '8px', padding: '12px',
                                    background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
                                    border: 'none', borderRadius: '10px', color: '#000',
                                    fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem',
                                    cursor: (saving || uploading) ? 'not-allowed' : 'pointer',
                                    opacity: (saving || uploading) ? 0.7 : 1,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                }}
                            >
                                <FiSave />
                                {saving ? 'Saving...' : uploading ? 'Wait for upload...' : isEdit ? 'Update Project' : 'Save Project'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <style>{`
        .form-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .form-grid { grid-template-columns: 1fr 320px; } }
      `}</style>
        </div>
    );
}