import axios from "axios";



const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});



axiosInstance.interceptors.request.use((config) => {
    const stored = localStorage.getItem('user');
    if(stored){
        const user = JSON.parse(stored);
        if(user?.token){
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
});



export default axiosInstance;