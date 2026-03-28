import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataTable, Badge, ConfirmDialog } from '../../components/common/index.jsx';

const mockBlogs = [
    { _id: '1', title: 'How We Built a Real-time Dashboard', category: 'Web Dev', author: 'Admin', status: 'Published', date: 'Jan 2025', readTime: '5 min' },
    { _id: '2', title: 'React Native vs Flutter in 2025', category: 'Mobile', author: 'Admin', status: 'Published', date: 'Feb 2025', readTime: '8 min' },
    { _id: '3', title: 'Complete DevOps Setup Guide', category: 'DevOps', author: 'Admin', status: 'Draft', date: 'Mar 2025', readTime: '12 min' },
    { _id: '4', title: 'UI Design Trends to Watch in 2025', category: 'Design', author: 'Admin', status: 'Published', date: 'Mar 2025', readTime: '6 min' },
];

const columns = [
    { key: 'title', label: 'Title', primary: true },
    { key: 'category', label: 'Category', noWrap: true },
    { key: 'author', label: 'Author', noWrap: true },
    { key: 'readTime', label: 'Read Time', noWrap: true },
    { key: 'date', label: 'Date', noWrap: true },
    { key: 'status', label: 'Status', render: (val) => <Badge label={val} color={val === 'Published' ? '#00ff88' : '#fbbf24'} /> },
];

export default function BlogsListPage() {
    const navigate = useNavigate();
    const [data] = useState(mockBlogs);
    const [deleteId, setDeleteId] = useState(null);

    return (
        <div>
            <PageHeader title="Blog Posts" subtitle={`${data.length} total posts`} actionLabel="Write Post" actionTo="/blogs/new" />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                <DataTable columns={columns} data={data} onEdit={r => navigate(`/blogs/edit/${r._id}`)} onDelete={setDeleteId} />
            </div>
            <ConfirmDialog open={!!deleteId} onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} message="This blog post will be permanently deleted." />
        </div>
    );
}