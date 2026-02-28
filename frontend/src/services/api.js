import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Automatically attach JWT token to every request
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('userInfo');
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const fetchProducts = () => API.get('/products');
export const createOrder = (orderData) => API.post('/orders', orderData);