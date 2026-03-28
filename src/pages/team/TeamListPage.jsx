import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataTable, Badge, ConfirmDialog } from '../../components/common/index.jsx';

const mockTeam = [
    { _id: '1', name: 'Arjun Singh', role: 'Full-Stack Developer', skills: 'React, Node.js', status: 'Active', order: 1 },
    { _id: '2', name: 'Priya Sharma', role: 'UI/UX Designer', skills: 'Figma, Framer', status: 'Active', order: 2 },
    { _id: '3', name: 'Vikram Patel', role: 'Backend Developer', skills: 'Python, Django', status: 'Active', order: 3 },
    { _id: '4', name: 'Sneha Kapoor', role: 'Mobile Developer', skills: 'Flutter, Firebase', status: 'Active', order: 4 },
    { _id: '5', name: 'Rahul Gupta', role: 'DevOps Engineer', skills: 'AWS, Docker', status: 'Active', order: 5 },
];

const columns = [
    { key: 'order', label: '#', noWrap: true },
    { key: 'name', label: 'Name', primary: true },
    { key: 'role', label: 'Role' },
    { key: 'skills', label: 'Skills' },
    { key: 'status', label: 'Status', render: (val) => <Badge label={val} color={val === 'Active' ? '#00ff88' : '#8892a4'} /> },
];

export default function TeamListPage() {
    const navigate = useNavigate();
    const [data] = useState(mockTeam);
    const [deleteId, setDeleteId] = useState(null);

    return (
        <div>
            <PageHeader title="Team Members" subtitle={`${data.length} members`} actionLabel="Add Member" actionTo="/team/new" />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                <DataTable columns={columns} data={data} onEdit={r => navigate(`/team/edit/${r._id}`)} onDelete={setDeleteId} />
            </div>
            <ConfirmDialog open={!!deleteId} onConfirm={() => setDeleteId(null)} onCancel={() => setDeleteId(null)} message="This team member will be removed from the website." />
        </div>
    );
}