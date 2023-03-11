import axios from 'axios';

export const axiosInstance = axios.create({
   baseURL: 'https://recipe-aplication-api.onrender.com/server/'
});
// Add an interceptor to include the JWT token in the Authorization header
axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);
