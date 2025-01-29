class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint, params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${this.baseURL}${endpoint}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }
}

export const apiClient = new ApiClient('https://cijene-me-api.onrender.com'); 