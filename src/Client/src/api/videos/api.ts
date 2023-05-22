import axios from "axios";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../config/const";
import { Video } from "./types";

export function useVideos()
{
    return useQuery<Video[]>(['videos'], async () => (await axios.get(`${API_BASE_URL}/video`)).data);
}