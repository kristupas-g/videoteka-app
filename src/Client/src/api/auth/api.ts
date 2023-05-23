import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { API_BASE_URL } from "../../config/const";
import { LoginCredentials } from "./types";
import { axiosInstance } from "../../config/axiosInstance";

export function useAuthLogin()
{
    const queryClient = useQueryClient();
    
    return useMutation((credentials: LoginCredentials) => axiosInstance.post('/auth/login', credentials),
        {
            onSuccess: () => queryClient.invalidateQueries(["auth"]),
        }
    );
}