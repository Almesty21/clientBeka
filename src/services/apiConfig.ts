// src/services/apiConfig.ts
import axios from "axios";

const baseBackendURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Create axios instance with better configuration
export const axiosInstance = axios.create({
  baseURL: baseBackendURL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: false, // Set to true if your API uses cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`🔄 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    console.log('📦 Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received: ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    console.error('❌ Response interceptor error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);