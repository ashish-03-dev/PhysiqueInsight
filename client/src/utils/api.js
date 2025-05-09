import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
