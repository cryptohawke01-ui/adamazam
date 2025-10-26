import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API calls
export const getContent = (section?: string) => {
  if (section) {
    return api.get(`/content/${section}`).then(res => res.data);
  }
  return api.get('/content').then(res => res.data);
};

export const getMenuItems = () => {
  return api.get('/content/menu/items').then(res => res.data);
};

// Auth API calls
export const loginAdmin = (credentials: { email: string; password: string }) => {
  return api.post('/auth/login', credentials).then(res => res.data);
};

export const registerAdmin = (userData: { email: string; password: string; name: string }) => {
  return api.post('/auth/register', userData).then(res => res.data);
};

export const getCurrentUser = () => {
  return api.get('/auth/me').then(res => res.data);
};

// Admin API calls
export const getAdminContent = () => {
  return api.get('/admin/content').then(res => res.data);
};

export const createContent = (contentData: any) => {
  return api.post('/admin/content', contentData).then(res => res.data);
};

export const updateContent = (data: { id: string; [key: string]: any }) => {
  const { id, ...updateData } = data;
  return api.put(`/admin/content/${id}`, updateData).then(res => res.data);
};

export const deleteContent = (id: string) => {
  return api.delete(`/admin/content/${id}`).then(res => res.data);
};

export const getAdminMenu = () => {
  return api.get('/admin/menu').then(res => res.data);
};

export const createMenu = (menuData: any) => {
  return api.post('/admin/menu', menuData).then(res => res.data);
};

export const updateMenu = (data: { id: string; [key: string]: any }) => {
  const { id, ...updateData } = data;
  return api.put(`/admin/menu/${id}`, updateData).then(res => res.data);
};

export const deleteMenu = (id: string) => {
  return api.delete(`/admin/menu/${id}`).then(res => res.data);
};

// Blog API calls
export const getBlogs = () => {
  return api.get('/blog').then(res => res.data);
};

export const getAdminBlogs = () => {
  return api.get('/blog/admin/all').then(res => res.data);
};

export const getBlog = (id: string) => {
  return api.get(`/blog/${id}`).then(res => res.data);
};

export const createBlog = (blogData: any) => {
  return api.post('/blog/admin', blogData).then(res => res.data);
};

export const updateBlog = (data: { id: string; [key: string]: any }) => {
  const { id, ...updateData } = data;
  return api.put(`/blog/admin/${id}`, updateData).then(res => res.data);
};

export const deleteBlog = (id: string) => {
  return api.delete(`/blog/admin/${id}`).then(res => res.data);
};

export const publishBlog = (id: string) => {
  return api.put(`/blog/admin/${id}/publish`).then(res => res.data);
};

export const unpublishBlog = (id: string) => {
  return api.put(`/blog/admin/${id}/unpublish`).then(res => res.data);
};