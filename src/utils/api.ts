import axios from 'axios';
import { LoginResponse } from '../types';

const API_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: API_URL,
});

export const Headers = {
  'Content-Type': 'application/json',
};


export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error; 
  }
};

export const fetchProducts = () => api.get('/products');
