import { useQuery } from "react-query";
import { Video } from "./types";
import { axiosInstance } from "../../config/axiosInstance";

export function useVideos()
{
    return useQuery<Video[]>(['videos'], async () => (await axiosInstance.get('/video')).data);
}