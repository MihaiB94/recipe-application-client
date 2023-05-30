import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://recipe-aplication-api.onrender.com/server/'
});

export default axiosInstance;
