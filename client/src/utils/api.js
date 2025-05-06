import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL: `${apiURL} || http://192.168.0.102:4000/api`,  // your backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // assuming you store token in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
