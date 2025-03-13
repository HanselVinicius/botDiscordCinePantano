import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;

export default function createApiInstance() {
    if (!api) {
        api = axios.create({
            baseURL: process.env.API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return api;
    }
    return api
}
