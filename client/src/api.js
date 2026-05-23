const API_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'An error occurred');
    error.status = response.status;
    throw error;
  }
  return data;
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },
  register: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return handleResponse(res);
  },
  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Products
  getProducts: async (searchParams = '') => {
    const res = await fetch(`${API_URL}/products${searchParams}`);
    return handleResponse(res);
  },
  getProduct: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`);
    return handleResponse(res);
  },
  getCategories: async () => {
    const res = await fetch(`${API_URL}/products/categories`);
    return handleResponse(res);
  },

  // Cart
  getCart: async () => {
    const res = await fetch(`${API_URL}/cart`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },
  addToCart: async (productId, quantity = 1) => {
    const res = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    return handleResponse(res);
  },
  updateCartItem: async (id, quantity) => {
    const res = await fetch(`${API_URL}/cart/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    return handleResponse(res);
  },
  removeCartItem: async (id) => {
    const res = await fetch(`${API_URL}/cart/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Orders
  createOrder: async (shippingAddress) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ shippingAddress })
    });
    return handleResponse(res);
  },
  getOrders: async () => {
    const res = await fetch(`${API_URL}/orders`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },
  getOrder: async (id) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  }
};
