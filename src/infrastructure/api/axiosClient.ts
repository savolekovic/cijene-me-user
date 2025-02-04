import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { ApiError } from '../../core/errors/ApiError';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: false
});

// Add request interceptor for debugging
axiosClient.interceptors.request.use((request: InternalAxiosRequestConfig) => {
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
  (response: AxiosResponse) => {
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
  (error: AxiosError) => {
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
        (error.response.data as any).message,
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
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error: AxiosError) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           error.response?.status === 429;
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