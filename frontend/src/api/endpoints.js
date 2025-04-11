import axios from 'axios';
import { BASE_URL } from './constants';

export const api = axios.create(
    {
        baseURL:BASE_URL,
        withCredentials:true,
        headers:{
            'Content-Type':'application/json',
        }
    }
)


export const login = async (username, password) =>{
    const response = await api.post(
        `${BASE_URL}auth/api/token/`,
        {username,password}
    )
    return response.data
}

export const refresh = async () =>{
    const response = await api.post('auth/api/token/refresh/',{
        withCredentials:true,
    })
    return response.data;
}

api.interceptors.response.use(
    response => response,
    async error =>{
        const originalRequest = error.config;
        if(error.response && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                await refresh();
                originalRequest.withCredentials = true;
                return api(originalRequest)
            }catch(refreshError){
                console.error('Token refresh failed:', refreshError);
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
            
        }

        return Promise.reject(error);
    }
);

export const is_authenticated = async () => {
    try {
        const response = await api.get(`${BASE_URL}auth/is_authenticated/`);
        return response.data;
    } catch (error) {
        console.error('Error checking authentication:', error);
        throw error;
    }
};

export const logout = async () =>{
    try{
        const response = await api.post('auth/logout/')
        return response.data
    }catch(error){
        console.error('error in logging out: ',error)
        throw error 
    }
}