import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: API_URL,
});

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const fetchProducts = () => api.get('/products');
