// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PageHeader, DataTable, Badge, ConfirmDialog } from '../../components/common/index.jsx';

// // Mock data — replace with API call: projectsApi.getAll()
// const mockProjects = [
//     { _id: '1', title: 'FinTrack Dashboard', category: 'Web App', status: 'Live', tech: 'React, Node', year: '2024' },
//     { _id: '2', title: 'ShopNest', category: 'E-Commerce', status: 'Live', tech: 'Next.js, MongoDB', year: '2024' },
//     { _id: '3', title: 'Wellness App', category: 'Mobile', status: 'Live', tech: 'React Native', year: '2023' },
//     { _id: '4', title: 'PropFinder', category: 'Web App', status: 'Draft', tech: 'Vue.js, Django', year: '2024' },
//     { _id: '5', title: 'EduLearn LMS', category: 'Full-Stack', status: 'Live', tech: 'Next.js, PostgreSQL', year: '2023' },
//     { _id: '6', title: 'LogiTrack', category: 'Mobile', status: 'Draft', tech: 'Flutter', year: '2024' },
// ];

// const statusColors = { Live: '#00ff88', Draft: '#fbbf24', Archived: '#8892a4' };

// const columns = [
//     { key: 'title', label: 'Project', primary: true },
//     { key: 'category', label: 'Category' },
//     { key: 'tech', label: 'Tech Stack', noWrap: true },
//     { key: 'year', label: 'Year', noWrap: true },
//     { key: 'status', label: 'Status', render: (val) => <Badge label={val} color={statusColors[val] || '#8892a4'} /> },
// ];

// export default function ProjectsListPage() {
//     const navigate = useNavigate();
//     const [data] = useState(mockProjects);
//     const [deleteId, setDeleteId] = useState(null);

//     const handleEdit = (row) => navigate(`/projects/edit/${row._id}`);
//     const handleDelete = (id) => setDeleteId(id);
//     const confirmDelete = () => { console.log('Delete:', deleteId); setDeleteId(null); };

//     return (
//         <div>
//             <PageHeader title="Projects" subtitle={`${data.length} total projects`} actionLabel="Add Project" actionTo="/projects/new" />
//             <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
//                 <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
//             </div>
//             <ConfirmDialog open={!!deleteId} onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} message="This project and all its data will be permanently deleted." />
//         </div>
//     );
// }



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataTable, Badge, ConfirmDialog } from '../../components/common/index.jsx';
import { projectsApi } from '../../api/index.js';
import toast from 'react-hot-toast';

const statusColors = { Live: '#00ff88', Draft: '#fbbf24', Archived: '#8892a4' };

const columns = [
    { key: 'title', label: 'Project', primary: true },
    { key: 'category', label: 'Category' },
    { key: 'tech', label: 'Tech Stack', noWrap: true, render: (val) => Array.isArray(val) ? val.slice(0, 3).join(', ') : val },
    { key: 'year', label: 'Year', noWrap: true },
    { key: 'featured', label: 'Featured', render: (val) => val ? <Badge label="Yes" color="#00d4ff" /> : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No</span> },
    { key: 'status', label: 'Status', render: (val) => <Badge label={val} color={statusColors[val] || '#8892a4'} /> },
];

export default function ProjectsListPage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await projectsApi.getAll();
            setData(res.data || []);
        } catch (err) {
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleEdit = (row) => navigate(`/projects/edit/${row._id}`);
    const handleDelete = (id) => setDeleteId(id);

    const confirmDelete = async () => {
        try {
            await projectsApi.remove(deleteId);
            toast.success('Project deleted');
            setDeleteId(null);
            fetchProjects();
        } catch (err) {
            toast.error('Failed to delete');
            setDeleteId(null);
        }
    };

    return (
        <div>
            <PageHeader
                title="Projects"
                subtitle={`${data.length} total projects`}
                actionLabel="Add Project"
                actionTo="/projects/new"
            />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                <DataTable columns={columns} data={data} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
            <ConfirmDialog
                open={!!deleteId}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteId(null)}
                message="This project will be permanently deleted."
            />
        </div>
    );
}