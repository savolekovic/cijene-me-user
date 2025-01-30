 export class ApiError extends Error {
  constructor(message, statusCode, data) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = 'ApiError';
  }
} 