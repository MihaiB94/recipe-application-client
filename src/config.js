import axios from 'axios';

const axiosInstance = axios.create({
   baseURL: 'https://delicious-recipes.site/server/'
});

export default axiosInstance;
