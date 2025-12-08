import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const enquiryService = {
  // Create a new enquiry
  createEnquiry: async (enquiryData) => {
    const response = await api.post('/enquiries', enquiryData);
    return response.data;
  },

  // Get all enquiries with pagination and search
  getAllEnquiries: async (page = 0, size = 10, sortBy = 'createdAt', search = '') => {
    const params = { page, size, sortBy };
    if (search) {
      params.search = search;
    }
    const response = await api.get('/enquiries', { params });
    return response.data;
  },

  // Get enquiry by ID
  getEnquiryById: async (id) => {
    const response = await api.get(`/enquiries/${id}`);
    return response.data;
  },

  // Delete enquiry
  deleteEnquiry: async (id) => {
    const response = await api.delete(`/enquiries/${id}`);
    return response.data;
  },
};

export default api;
