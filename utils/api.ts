import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

api.interceptors.request.use((config) => {
  // Add a timestamp to prevent caching
  const timestamp = new Date().getTime();
  config.url = `${config.url}${config.url?.includes('?') ? '&' : '?'}_t=${timestamp}`;
  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config.url);
    }
    // Add more detailed error logging
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export default api;