import { useState } from 'react';
import { FiSave, FiGlobe, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiLock } from 'react-icons/fi';
import { FormField, inputStyle, textareaStyle } from '../../components/common/index.jsx';
import toast from 'react-hot-toast';

const defaultSettings = {
    // Agency Info
    agencyName: 'Shark Web & Cyber Solution',
    tagline: 'We Build Digital Products That Actually Matter',
    email: 'hello@shark.dev',
    phone: '+91 98765 43210',
    location: 'Jaipur, Rajasthan, India',
    website: 'https://shark.dev',
    // Social
    github: 'https://github.com/sharkdev',
    linkedin: 'https://linkedin.com/company/sharkdev',
    twitter: 'https://twitter.com/sharkdev',
    // SEO
    metaTitle: 'Shark Web & Cyber Solution — Full-Stack Agency',
    metaDesc: 'We build production-grade web apps, mobile apps, and digital products that drive real results.',
    // Password
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const sectionStyle = {
    background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: '16px', padding: '24px', marginBottom: '20px',
};

const sectionHeader = (title, subtitle) => (
    <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '3px' }}>{title}</h3>
        {subtitle && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{subtitle}</p>}
    </div>
);

export default function SettingsPage() {
    const [settings, setSettings] = useState(defaultSettings);
    const [saving, setSaving] = useState(null);

    const set = (key, val) => setSettings(s => ({ ...s, [key]: val }));

    const handleSave = async (section) => {
        setSaving(section);
        // TODO: api.patch('/settings', { section, data: settings })
        await new Promise(r => setTimeout(r, 700));
        setSaving(null);
        toast.success(`${section} settings saved!`);
    };

    const SaveBtn = ({ section }) => (
        <button type="button" onClick={() => handleSave(section)} disabled={saving === section} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 22px', background: 'linear-gradient(135deg,#00d4ff,#00ffcc)',
            border: 'none', borderRadius: '10px', color: '#000',
            fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.84rem',
            cursor: saving === section ? 'not-allowed' : 'pointer', opacity: saving === section ? 0.7 : 1,
            marginTop: '8px',
        }}>
            <FiSave style={{ fontSize: '13px' }} />
            {saving === section ? 'Saving...' : 'Save Changes'}
        </button>
    );

    return (
        <div>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: '800', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Settings</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage agency info, social links, SEO, and account settings.</p>
            </div>

            {/* Agency Info */}
            <div style={sectionStyle}>
                {sectionHeader('Agency Information', 'This info is used throughout the website.')}
                <div style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <FormField label="Agency Name">
                            <input style={inputStyle} value={settings.agencyName} onChange={e => set('agencyName', e.target.value)} />
                        </FormField>
                        <FormField label="Website">
                            <input style={inputStyle} value={settings.website} onChange={e => set('website', e.target.value)} type="url" />
                        </FormField>
                    </div>
                    <FormField label="Tagline" hint="Shown in hero section">
                        <input style={inputStyle} value={settings.tagline} onChange={e => set('tagline', e.target.value)} />
                    </FormField>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <FormField label="Email">
                            <div style={{ position: 'relative' }}>
                                <FiMail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '15px' }} />
                                <input style={{ ...inputStyle, paddingLeft: '38px' }} value={settings.email} onChange={e => set('email', e.target.value)} type="email" />
                            </div>
                        </FormField>
                        <FormField label="Phone">
                            <div style={{ position: 'relative' }}>
                                <FiPhone style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '15px' }} />
                                <input style={{ ...inputStyle, paddingLeft: '38px' }} value={settings.phone} onChange={e => set('phone', e.target.value)} />
                            </div>
                        </FormField>
                    </div>
                    <FormField label="Location">
                        <div style={{ position: 'relative' }}>
                            <FiMapPin style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '15px' }} />
                            <input style={{ ...inputStyle, paddingLeft: '38px' }} value={settings.location} onChange={e => set('location', e.target.value)} />
                        </div>
                    </FormField>
                    <SaveBtn section="Agency" />
                </div>
            </div>

            {/* Social Links */}
            <div style={sectionStyle}>
                {sectionHeader('Social Links', 'Links shown in footer and contact page.')}
                <div style={{ display: 'grid', gap: '14px' }}>
                    {[
                        { key: 'github', icon: FiGithub, label: 'GitHub' },
                        { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn' },
                        { key: 'twitter', icon: FiTwitter, label: 'Twitter / X' },
                    ].map(({ key, icon: Icon, label }) => (
                        <FormField key={key} label={label}>
                            <div style={{ position: 'relative' }}>
                                <Icon style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '15px' }} />
                                <input style={{ ...inputStyle, paddingLeft: '38px' }} value={settings[key]} onChange={e => set(key, e.target.value)} type="url" />
                            </div>
                        </FormField>
                    ))}
                    <SaveBtn section="Social" />
                </div>
            </div>

            {/* SEO */}
            <div style={sectionStyle}>
                {sectionHeader('SEO Settings', 'Default meta tags for the website.')}
                <div style={{ display: 'grid', gap: '16px' }}>
                    <FormField label="Meta Title" hint="Appears in browser tab and search results">
                        <input style={inputStyle} value={settings.metaTitle} onChange={e => set('metaTitle', e.target.value)} />
                        <span style={{ fontSize: '0.7rem', color: settings.metaTitle.length > 60 ? '#ef4444' : 'var(--text-muted)' }}>{settings.metaTitle.length}/60 characters</span>
                    </FormField>
                    <FormField label="Meta Description">
                        <textarea style={{ ...textareaStyle, minHeight: '80px' }} value={settings.metaDesc} onChange={e => set('metaDesc', e.target.value)} />
                        <span style={{ fontSize: '0.7rem', color: settings.metaDesc.length > 160 ? '#ef4444' : 'var(--text-muted)' }}>{settings.metaDesc.length}/160 characters</span>
                    </FormField>
                    <SaveBtn section="SEO" />
                </div>
            </div>

            {/* Change Password */}
            <div style={sectionStyle}>
                {sectionHeader('Change Password', 'Update your admin panel login password.')}
                <div style={{ display: 'grid', gap: '14px', maxWidth: '400px' }}>
                    {[
                        { key: 'currentPassword', label: 'Current Password' },
                        { key: 'newPassword', label: 'New Password' },
                        { key: 'confirmPassword', label: 'Confirm New Password' },
                    ].map(({ key, label }) => (
                        <FormField key={key} label={label}>
                            <div style={{ position: 'relative' }}>
                                <FiLock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '15px' }} />
                                <input style={{ ...inputStyle, paddingLeft: '38px' }} type="password" value={settings[key]} onChange={e => set(key, e.target.value)} placeholder="••••••••" />
                            </div>
                        </FormField>
                    ))}
                    <button type="button" onClick={() => handleSave('Password')} disabled={saving === 'Password'} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '10px 22px', background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', color: '#ef4444',
                        fontFamily: 'Syne,sans-serif', fontWeight: '700', fontSize: '0.84rem',
                        cursor: saving === 'Password' ? 'not-allowed' : 'pointer', width: 'fit-content',
                    }}>
                        <FiLock style={{ fontSize: '13px' }} />
                        {saving === 'Password' ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </div>
        </div>
    );
}