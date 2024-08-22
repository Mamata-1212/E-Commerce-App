import axios from 'axios';
import { CartItem, LoginResponse, Product, User } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

export const Headers = {
  'Content-Type': 'application/json',
};


export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

export const fetchProducts = async (limit?: number, sort?: string) => {
  try {
    let url = `${API_BASE_URL}/products`;
    if (limit) url += `?limit=${limit}`;
    if (sort) url += `&sort=${sort}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const fetchLimitedProducts = async (limit: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch limited products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching limited products:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const addProduct = async (product: Product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to add product');
    return await response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: Product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const fetchCarts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`);
    if (!response.ok) throw new Error('Failed to fetch carts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching carts:', error);
    throw error;
  }
};

export const fetchCartById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch cart details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart by ID:', error);
    throw error;
  }
};

export const fetchLimitedCarts = async (limit: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch limited carts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching limited carts:', error);
    throw error;
  }
};

export const fetchSortedCarts = async (sort: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts?sort=${sort}`);
    if (!response.ok) throw new Error('Failed to fetch sorted carts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sorted carts:', error);
    throw error;
  }
};

export const fetchCartsInDateRange = async (startDate: string, endDate: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts?startDate=${startDate}&endDate=${endDate}`);
    if (!response.ok) throw new Error('Failed to fetch carts in date range');
    return await response.json();
  } catch (error) {
    console.error('Error fetching carts in date range:', error);
    throw error;
  }
};

export const fetchUserCart = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user cart');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user cart:', error);
    throw error;
  }
};

export const addCart = async (cartItem: CartItem) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    });
    if (!response.ok) throw new Error('Failed to add cart');
    return await response.json();
  } catch (error) {
    console.error('Error adding cart:', error);
    throw error;
  }
};

export const updateCart = async (id: number, cartItem: CartItem) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return await response.json();
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const deleteCart = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete cart');
    return await response.json();
  } catch (error) {
    console.error('Error deleting cart:', error);
    throw error;
  }}


export const fetchUsers = async (limit?: number, sort?: string) => {
  try {
    let url = `${API_BASE_URL}/users`;
    if (limit) url += `?limit=${limit}`;
    if (sort) url += `&sort=${sort}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const fetchLimitedUsers = async (limit: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch limited users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching limited users:', error);
    throw error;
  }
};

export const fetchSortedUsers = async (sort: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users?sort=${sort}`);
    if (!response.ok) throw new Error('Failed to fetch sorted users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sorted users:', error);
    throw error;
  }
};

export const addUser = async (user: User) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to add user');
    return await response.json();
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = async (id: number, user: User) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
