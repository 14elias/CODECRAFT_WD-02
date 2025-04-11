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

export const is_authenticated = async ()=>{
    const response = await api.get(`${BASE_URL}auth/is_authenticated/`)
    return response.data
}