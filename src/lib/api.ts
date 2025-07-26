import axios from 'axios';
import { useUserStore } from './store';


const getAuthHeader = () => {
    const { getToken } = useUserStore.getState();
    let token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

const api = axios.create({
    baseURL: '<url?',
    // baseURL: 'http://localhost',
});

const post = async (url: string, data: any) => {
    return await api.post(url, data, getAuthHeader());
}
const put = async (url: string, data: any) => {
    return await api.put(url, data, getAuthHeader());
}

const get = async (url: string) => {
    const res = await api.get(url, getAuthHeader());
    return res.data;
}

const form = async (url: string, data: any) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    const authHeaders = getAuthHeader();
    return await api.post(url, formData, {
        headers: {
            ...authHeaders.headers,
            'Content-Type': 'multipart/form-data',
        }
    });
}
export interface Example {
    prop1: string
}

export const Login = async (username: string, password: string) => {
    return await form('/token', { username, password });
}
