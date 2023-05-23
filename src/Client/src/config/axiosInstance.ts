import axios from "axios";
import { API_BASE_URL } from "./const";

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})