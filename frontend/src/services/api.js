import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

export const employeeService = {
  list: (params = {}) => api.get('/employees', { params }).then(({ data }) => data),
  get: (id) => api.get(`/employees/${id}`).then(({ data }) => data),
  create: (employee) => api.post('/employees', employee).then(({ data }) => data),
  update: (id, employee) => api.put(`/employees/${id}`, employee).then(({ data }) => data),
  remove: (id) => api.delete(`/employees/${id}`)
};

export const dashboardService = {
  stats: () => api.get('/dashboard/stats').then(({ data }) => data)
};

export default api;
