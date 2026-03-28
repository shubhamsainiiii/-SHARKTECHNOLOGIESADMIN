import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataTable, Badge, ConfirmDialog } from '../../components/common/index.jsx';

const mockServices = [
    { _id: '1', title: 'Web Development', slug: 'web-development', icon: '🌐', status: 'Active', order: 1 },
    { _id: '2', title: 'Mobile Apps', slug: 'mobile-development', icon: '📱', status: 'Active', order: 2 },
    { _id: '3', title: 'UI/UX Design', slug: 'ui-ux-design', icon: '🎨', status: 'Active', order: 3 },
    { _id: '4', title: 'API & Backend', slug: 'api-backend', icon: '⚙', status: 'Active', order: 4 },
    { _id: '5', title: 'Cloud & DevOps', slug: 'cloud-devops', icon: '☁', status: 'Active', order: 5 },
    { _id: '6', title: 'Performance & SEO', slug: 'performance-seo', icon: '📈', status: 'Active', order: 6 },
];

const columns = [
    { key: 'order', label: '#', noWrap: true },
    { key: 'icon', label: 'Icon', render: (val) => <span style={{ fontSize: '1.2rem' }}>{val}</span> },
    { key: 'title', label: 'Service', primary: true },
    { key: 'slug', label: 'Slug' },
    { key: 'status', label: 'Status', render: (val) => <Badge label={val} color={val === 'Active' ? '#00ff88' : '#8892a4'} /> },
];

export default function ServicesListPage() {
    const navigate = useNavigate();
    const [data] = useState(mockServices);
    const [deleteId, setDeleteId] = useState(null);
    return (
        <div>
            <PageHeader title="Services" subtitle={`${data.length} services`} actionLabel="Add Service" actionTo="/services/new" />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                <DataTable columns={columns} data={data} onEdit={r => navigate(`/services/edit/${r._id}`)} onDelete={setDeleteId} />
            </div>
            <ConfirmDialog open={!!deleteId} onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} />
        </div>
    );
}