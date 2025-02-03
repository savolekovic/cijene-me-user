export const environment = {
  apiUrl: process.env.REACT_APP_API_URL || '/api',
  environment: process.env.NODE_ENV,
  version: process.env.REACT_APP_VERSION,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development'
}; 