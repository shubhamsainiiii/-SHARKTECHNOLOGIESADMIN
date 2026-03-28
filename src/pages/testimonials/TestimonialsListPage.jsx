import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataTable, Badge, ConfirmDialog } from '../../components/common/index.jsx';

const mockTestimonials = [
    { _id: '1', name: 'Rahul Sharma', role: 'CEO, TechStart', rating: 5, project: 'FinTrack', status: 'Published', date: 'Jan 2025' },
    { _id: '2', name: 'Priya Mehta', role: 'Founder, ShopNest', rating: 5, project: 'ShopNest', status: 'Published', date: 'Feb 2025' },
    { _id: '3', name: 'Arun Kumar', role: 'CTO, WellnessCo', rating: 4, project: 'Wellness', status: 'Draft', date: 'Mar 2025' },
    { _id: '4', name: 'Sarah Johnson', role: 'PM, EduLearn', rating: 5, project: 'EduLearn', status: 'Published', date: 'Mar 2025' },
];

const columns = [
    { key: 'name', label: 'Client', primary: true },
    { key: 'role', label: 'Role' },
    { key: 'project', label: 'Project', noWrap: true },
    { key: 'rating', label: 'Rating', render: (val) => '★'.repeat(val) + '☆'.repeat(5 - val) },
    { key: 'date', label: 'Date', noWrap: true },
    { key: 'status', label: 'Status', render: (val) => <Badge label={val} color={val === 'Published' ? '#00ff88' : '#fbbf24'} /> },
];

export default function TestimonialsListPage() {
    const navigate = useNavigate();
    const [data] = useState(mockTestimonials);
    const [deleteId, setDeleteId] = useState(null);

    return (
        <div>
            <PageHeader title="Testimonials" subtitle={`${data.length} total testimonials`} actionLabel="Add Testimonial" actionTo="/testimonials/new" />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                <DataTable columns={columns} data={data} onEdit={r => navigate(`/testimonials/edit/${r._id}`)} onDelete={setDeleteId} />
            </div>
            <ConfirmDialog open={!!deleteId} onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} message="This testimonial will be permanently deleted." />
        </div>
    );
}