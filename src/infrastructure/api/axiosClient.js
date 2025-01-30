import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ApiError } from '../../core/errors/ApiError';

export const BASE_URL = '/api';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: false
});

// Add request interceptor for debugging
axiosClient.interceptors.request.use((request) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Request:', {
      url: request.url,
      method: request.method,
      data: request.data
    });
  }
  return request;
});

// Add response interceptor for debugging and error handling
axiosClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Response:', {
        url: response.config.url,
        method: response.config.method,
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data
      });
    }

    if (error.response) {
      throw new ApiError(
        error.response.data.message,
        error.response.status,
        error.response.data
      );
    }
    throw error;
  }
);

// Configure axios-retry
axiosRetry(axiosClient, {
  retries: 3,
  retryDelay: (retryCount) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Retry attempt: ${retryCount}`);
    }
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) 
      || error.code === 'ECONNABORTED'
      || error.response?.status === 500;
  },
  onRetry: (retryCount, error, requestConfig) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Retrying request:', {
        attempt: retryCount,
        url: requestConfig.url,
        method: requestConfig.method,
        error: error.message
      });
    }
  }
});

export default axiosClient; 