import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const authApi = {
  signup: (payload) => api.post('/auth/signup', payload).then((r) => r.data),
  login: (payload) => api.post('/auth/login', payload).then((r) => r.data)
};

export const quizApi = {
  list: (params) => api.get('/quizzes', { params }).then((r) => r.data),
  get: (id) => api.get(`/quizzes/${id}`).then((r) => r.data)
};

export const snippetApi = {
  list: (params) => api.get('/snippets', { params }).then((r) => r.data),
  create: (payload) => api.post('/snippets', payload).then((r) => r.data),
  like: (id) => api.post(`/snippets/${id}/like`).then((r) => r.data)
};

export const leaderboardApi = {
  get: () => api.get('/leaderboard').then((r) => r.data)
};
