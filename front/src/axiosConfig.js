import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  withCredentials: true, // tetap true
  credentials: 'include', // pastikan ini ada untuk mengirimkan cookie di setiap request
});

export default api;
