import axios from 'axios';

export const axiosInstance = axios.create({
   baseURL: 'https://recipe-aplication-api.onrender.com/server/'
});
