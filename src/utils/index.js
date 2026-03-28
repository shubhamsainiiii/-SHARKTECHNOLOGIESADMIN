const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
    const token = localStorage.getItem('admin_token');
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
        ...options,
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
}

export const api = {
    get: (url) => request(url),
    post: (url, data) => request(url, { method: 'POST', body: JSON.stringify(data) }),
    put: (url, data) => request(url, { method: 'PUT', body: JSON.stringify(data) }),
    patch: (url, data) => request(url, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (url) => request(url, { method: 'DELETE' }),
};

export const projectsApi = {
    getAll: () => api.get('/projects'),
    getOne: (id) => api.get(`/projects/${id}`),
    create: (d) => api.post('/projects', d),
    update: (id, d) => api.put(`/projects/${id}`, d),
    remove: (id) => api.delete(`/projects/${id}`),
};
export const servicesApi = {
    getAll: () => api.get('/services'),
    getOne: (id) => api.get(`/services/${id}`),
    create: (d) => api.post('/services', d),
    update: (id, d) => api.put(`/services/${id}`, d),
    remove: (id) => api.delete(`/services/${id}`),
};
export const testimonialsApi = {
    getAll: () => api.get('/testimonials'),
    getOne: (id) => api.get(`/testimonials/${id}`),
    create: (d) => api.post('/testimonials', d),
    update: (id, d) => api.put(`/testimonials/${id}`, d),
    remove: (id) => api.delete(`/testimonials/${id}`),
};
export const blogsApi = {
    getAll: () => api.get('/blogs'),
    getOne: (id) => api.get(`/blogs/${id}`),
    create: (d) => api.post('/blogs', d),
    update: (id, d) => api.put(`/blogs/${id}`, d),
    remove: (id) => api.delete(`/blogs/${id}`),
};
export const statsApi = {
    getAll: () => api.get('/stats'),
    update: (id, d) => api.put(`/stats/${id}`, d),
};
export const teamApi = {
    getAll: () => api.get('/team'),
    getOne: (id) => api.get(`/team/${id}`),
    create: (d) => api.post('/team', d),
    update: (id, d) => api.put(`/team/${id}`, d),
    remove: (id) => api.delete(`/team/${id}`),
};
export const dashboardApi = {
    getStats: () => api.get('/dashboard/stats'),
};