// Use environment variable in development/production; defaults to local backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Read a cookie value by name (used to get Django's csrftoken)
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// Expose a helper to get the CSRF token (useful for other parts of the app)
export function getCSRFToken() {
  return getCookie('csrftoken') || getCookie('CSRF-TOKEN') || null;
}

// Safe HTTP methods that do not require CSRF protection
function csrfSafeMethod(method) {
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const method = (options.method || 'GET').toUpperCase();

  // Start with default headers, allow callers to override
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // If this is an unsafe method, attach the CSRF token header when available
  if (!csrfSafeMethod(method) && !Object.keys(headers).some(h => h.toLowerCase() === 'x-csrftoken')) {
    const csrftoken = getCSRFToken();
    if (csrftoken) {
      headers['X-CSRFToken'] = csrftoken;
    }
  }

  const config = {
    ...options,
    method,
    headers,
    // Include credentials so session cookies (if used) are sent to the backend.
    // This is required for Django session auth and CSRF cookie usage.
    credentials: options.credentials || 'include',
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // Try to read response body (could be JSON or text) to surface details
      let bodyText = null;
      try {
        bodyText = await response.text();
      } catch (e) {
        bodyText = null;
      }

      let parsed = null;
      try {
        parsed = bodyText ? JSON.parse(bodyText) : null;
      } catch (e) {
        parsed = bodyText;
      }

      const err = new Error(`HTTP error! status: ${response.status}`);
      err.status = response.status;
      err.body = parsed;
      throw err;
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API call failed:', error);
    // Normalize error shape so callers can inspect status/body
    const errObj = {
      message: error.message || 'Unknown error',
      status: error.status || null,
      body: error.body || null,
    };
    return { data: null, error: errObj };
  }
};

// Products API
export const productsAPI = {
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products/?${queryString}`);
  },
  
  getProduct: (slug) => apiCall(`/products/${slug}/`),
  
  getFeaturedProducts: () => apiCall('/products/featured/'),
  
  searchProducts: (query) => apiCall(`/products/search/?q=${encodeURIComponent(query)}`),
  
  getCategories: () => apiCall('/products/categories/'),
  
  createReview: (productSlug, reviewData) => 
    apiCall(`/products/${productSlug}/reviews/`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    }),
};

// Cart API
export const cartAPI = {
  getCart: () => apiCall('/orders/cart/'),
  
  addToCart: (productId, quantity = 1) => 
    apiCall('/orders/cart/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    }),
  
  updateCartItem: (itemId, quantity) => 
    apiCall(`/orders/cart/items/${itemId}/`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  
  removeCartItem: (itemId) => 
    apiCall(`/orders/cart/items/${itemId}/`, {
      method: 'DELETE',
    }),
  
  clearCart: () => 
    apiCall('/orders/cart/', {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersAPI = {
  getOrders: () => apiCall('/orders/orders/'),
  
  getOrder: (orderId) => apiCall(`/orders/orders/${orderId}/`),
  
  createOrder: (orderData) => 
    apiCall('/orders/create-order/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (email, firstName = '', lastName = '', language = 'en') => 
    apiCall('/newsletter/subscribe/', {
      method: 'POST',
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        language,
        source: 'website',
      }),
    }),
  
  unsubscribe: (email) => 
    apiCall('/newsletter/unsubscribe/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// Users API
export const usersAPI = {
  register: (userData) => 
    apiCall('/users/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (email, password) => 
    apiCall('/users/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  logout: () => 
    apiCall('/users/logout/', {
      method: 'POST',
    }),
  
  getProfile: () => apiCall('/users/profile/'),
  
  updateProfile: (profileData) => 
    apiCall('/users/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
};

// Site forms API (font registrations, contact messages, purchase requests)
export const siteformsAPI = {
  createFontRegistration: (data) => apiCall('/forms/fonts/', { method: 'POST', body: JSON.stringify(data) }),
  // Normalize list endpoints to always return an array in data (helps components avoid pagination shape checks)
  listFontRegistrations: async () => {
    const res = await apiCall('/forms/fonts/');
    if (res.error) return res;
    const payload = res.data;
    const list = Array.isArray(payload) ? payload : (payload && payload.results) ? payload.results : [];
    return { data: list, error: null };
  },
  createContact: (data) => apiCall('/forms/contacts/', { method: 'POST', body: JSON.stringify(data) }),
  listContacts: async () => {
    const res = await apiCall('/forms/contacts/');
    if (res.error) return res;
    const payload = res.data;
    const list = Array.isArray(payload) ? payload : (payload && payload.results) ? payload.results : [];
    return { data: list, error: null };
  },
  createPurchaseRequest: (data) => apiCall('/forms/purchases/', { method: 'POST', body: JSON.stringify(data) }),
  listPurchases: async () => {
    const res = await apiCall('/forms/purchases/');
    if (res.error) return res;
    const payload = res.data;
    const list = Array.isArray(payload) ? payload : (payload && payload.results) ? payload.results : [];
    return { data: list, error: null };
  },
};

// Tracking API
export const trackingAPI = {
  createDelivery: (data) => apiCall('/tracking/deliveries/', { method: 'POST', body: JSON.stringify(data) }),
  listDeliveries: (params = {}) => apiCall('/tracking/deliveries/'),
  getDelivery: (id) => apiCall(`/tracking/deliveries/${id}/`),
  sendPing: (ping) => apiCall('/tracking/pings/', { method: 'POST', body: JSON.stringify(ping) }),
  getPingsForDelivery: (deliveryId) => apiCall(`/tracking/pings/?delivery=${deliveryId}`),
  getLatestLocation: (deliveryId) => apiCall(`/tracking/deliveries/${deliveryId}/latest_location/`),
};