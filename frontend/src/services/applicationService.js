import api from './api';

export const applicationService = {
  getAll: async (params) => {
    const res = await api.get('/applications', { params });
    return res.data;
  },
  getOne: async (id) => {
    const res = await api.get(`/applications/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/applications', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/applications/${id}`, data);
    return res.data;
  },
  remove: async (id) => {
    const res = await api.delete(`/applications/${id}`);
    return res.data;
  },
  getStats: async () => {
    const res = await api.get('/dashboard/stats');
    return res.data;
  },
  getCharts: async () => {
    const res = await api.get('/dashboard/charts');
    return res.data;
  },
};
