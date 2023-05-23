import axios from "axios";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../config/const";
import { Video } from "./types";
import { axiosInstance } from "../../config/axiosInstance";

export function useVideos()
{
    return useQuery<Video[]>(['videos'], async () => (await axiosInstance.get(`${API_BASE_URL}/video`)).data);
}