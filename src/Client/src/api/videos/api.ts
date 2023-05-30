import { useMutation, useQuery, useQueryClient } from "react-query";
import { Video, VideoUpload } from "./types";
import { axiosInstance } from "../../config/axiosInstance";
import axios from "axios";
import { API_BASE_URL } from "../../config/const";
import { VideoComment } from "../videoComments/types";

export function useVideos() {
  return useQuery<Video[]>(
    ["videos"],
    async () => (await axiosInstance.get("/video")).data
  );
}

export function useSingleVideo(id: string) {
  return useQuery<Video>(
    ["videos", id],
    async () => (await axiosInstance.get(`/video/${id}`)).data
  );
}

export function useRecommendedVideos(id: string) {
  return useQuery<Video[]>(
    ["recommended", id],
    async () => (await axiosInstance.get(`/video/${id}/recommended`)).data
  );
}

export function useVideoComments(id: string) {
  return useQuery<VideoComment[]>(
    ["comments", id],
    async () => (await axiosInstance.get(`/video/${id}/comments`)).data
  );
}

export function useUploadVideo() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: VideoUpload) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("file", data.file[0]);

      return axios.post(`${API_BASE_URL}/video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["videos"]),
    }
  );
}

export function useUpdateVideoViews(id: string) {
  return useMutation(() => axiosInstance.patch(`/video/${id}/views`));
}
