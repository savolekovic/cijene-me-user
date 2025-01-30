import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ApiError } from '../../core/errors/ApiError';

const axiosClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

axiosRetry(axiosClient, { 
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) 
      || error.code === 'ECONNABORTED';
  }
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
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

export default axiosClient; 