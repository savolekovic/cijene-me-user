import axios from 'axios';
import axiosRetry from 'axios-retry';

const axiosClient = axios.create({
  baseURL: 'https://cijene-me-api.onrender.com/',
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

export default axiosClient; 