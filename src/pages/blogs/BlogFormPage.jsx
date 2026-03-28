import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiEye } from 'react-icons/fi';
import { FormField, inputStyle, textareaStyle } from '../../components/common/index.jsx';

const CATEGORIES = ['Web Dev', 'Mobile', 'DevOps', 'Design', 'Backend', 'AI/ML', 'Career'];
const STATUSES = ['Draft', 'Published'];

const emptyForm = {
    title: '', slug: '', category: '', status: 'Draft',
    excerpt: '', content: '', coverImage: '', tags: '',
    author: 'Admin', readTime: '', metaTitle: '', metaDesc: '',
};

export default function BlogFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [tab, setTab] = useState('write'); // 'write' | 'seo'

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        // TODO: isEdit ? blogsApi.update(id, form) : blogsApi.create(form)
        await new Promise(r => setTimeout(r, 800));
        setSaving(false);
        navigate('/blogs');
    };

    const tabStyle = (t) => ({
        padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer',
        fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.8rem',
        background: tab === t ? 'rgba(0,212,255,0.12)' : 'transparent',
        color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
    });

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <Link to="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', marginBottom: '16px' }}>
                    <FiArrowLeft /> Back to Blogs
                </Link>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                    {isEdit ? 'Edit Blog Post' : 'Write New Post'}
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '20px' }} className="form-grid">
                    {/* Main editor */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '6px', width: 'fit-content' }}>
                            <button type="button" style={tabStyle('write')} onClick={() => setTab('write')}>Write</button>
                            <button type="button" style={tabStyle('seo')} onClick={() => setTab('seo')}>SEO</button>
                        </div>

                        {tab === 'write' && (
                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                <FormField label="Blog Title" required>
                                    <input style={inputStyle} value={form.title}
                                        onChange={e => { set('title', e.target.value); if (!isEdit) set('slug', autoSlug(e.target.value)); }}
                                        placeholder="e.g. How We Built a Real-time Dashboard" required />
                                </FormField>

                                <FormField label="Slug">
                                    <input style={inputStyle} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="how-we-built-realtime-dashboard" />
                                </FormField>

                                <FormField label="Excerpt" hint="Short summary shown on blog cards (max 180 chars)">
                                    <textarea style={{ ...textareaStyle, minHeight: '70px' }} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="A brief summary of the blog post..." maxLength={180} />
                                </FormField>

                                <FormField label="Cover Image URL">
                                    <input style={inputStyle} value={form.coverImage} onChange={e => set('coverImage', e.target.value)} placeholder="https://..." type="url" />
                                </FormField>

                                <FormField label="Content" required hint="Supports Markdown formatting">
                                    <textarea style={{ ...textareaStyle, minHeight: '320px', fontFamily: 'monospace', fontSize: '0.875rem' }}
                                        value={form.content} onChange={e => set('content', e.target.value)}
                                        placeholder={"# Heading\n\nWrite your blog content here...\n\n## Sub-heading\n\nMore content..."} required />
                                </FormField>

                                <FormField label="Tags" hint="Comma separated: React, Performance, SEO">
                                    <input style={inputStyle} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, Node.js, Performance" />
                                </FormField>
                            </div>
                        )}

                        {tab === 'seo' && (
                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>SEO Settings</h3>

                                <FormField label="Meta Title" hint="Ideal length: 50–60 characters">
                                    <input style={inputStyle} value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="Page title for search engines" />
                                    <span style={{ fontSize: '0.7rem', color: form.metaTitle.length > 60 ? '#ef4444' : 'var(--text-muted)' }}>{form.metaTitle.length}/60</span>
                                </FormField>

                                <FormField label="Meta Description" hint="Ideal length: 150–160 characters">
                                    <textarea style={{ ...textareaStyle, minHeight: '80px' }} value={form.metaDesc} onChange={e => set('metaDesc', e.target.value)} placeholder="Description shown in Google search results..." />
                                    <span style={{ fontSize: '0.7rem', color: form.metaDesc.length > 160 ? '#ef4444' : 'var(--text-muted)' }}>{form.metaDesc.length}/160</span>
                                </FormField>

                                {/* SERP preview */}
                                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
                                    <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Google Preview</p>
                                    <p style={{ fontSize: '0.72rem', color: '#00ff88', marginBottom: '2px' }}>shark.dev/blog/{form.slug || 'post-slug'}</p>
                                    <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '1rem', color: '#4da6ff', marginBottom: '4px' }}>{form.metaTitle || form.title || 'Page Title'}</p>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{form.metaDesc || form.excerpt || 'Meta description will appear here...'}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', alignSelf: 'start' }}>
                        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Publish Settings</h3>

                        <FormField label="Status">
                            <select style={inputStyle} value={form.status} onChange={e => set('status', e.target.value)}>
                                {STATUSES.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </FormField>

                        <FormField label="Category" required>
                            <select style={inputStyle} value={form.category} onChange={e => set('category', e.target.value)} required>
                                <option value="">Select...</option>
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </FormField>

                        <FormField label="Author">
                            <input style={inputStyle} value={form.author} onChange={e => set('author', e.target.value)} placeholder="Admin" />
                        </FormField>

                        <FormField label="Read Time" hint="e.g. 5 min">
                            <input style={inputStyle} value={form.readTime} onChange={e => set('readTime', e.target.value)} placeholder="5 min" />
                        </FormField>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button type="submit" disabled={saving} style={{
                                padding: '12px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
                                border: 'none', borderRadius: '10px', color: '#000',
                                fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.9rem',
                                cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            }}>
                                <FiSave /> {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Publish Post'}
                            </button>
                            <button type="button" onClick={() => set('status', 'Draft')} style={{
                                padding: '10px', background: 'transparent', border: '1px solid var(--border)',
                                borderRadius: '10px', color: 'var(--text-secondary)',
                                fontFamily: 'Syne,sans-serif', fontWeight: '600', fontSize: '0.84rem', cursor: 'pointer',
                            }}>Save as Draft</button>
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