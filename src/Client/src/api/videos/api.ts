import { useMutation, useQuery, useQueryClient } from "react-query";
import { Video } from "./types";
import { axiosInstance } from "../../config/axiosInstance";
import axios from "axios";
import { API_BASE_URL } from "../../config/const";
import { VideoComment } from "../videoComments/types";
import { UploadVideoFormValues } from "../../pages/UploadVideo/uploadVideoFormSchema";
import { UpdateVideoFormValues } from "../../pages/UpdateVideo/UpdateVideoFormSchema";

export function useVideos() {
  return useQuery<Video[]>(
    ["videos"],
    async () => (await axiosInstance.get("/video")).data
  );
}
export function useUploaderVideos( id: string) {
  return useQuery<Video[]>(
    ["uploader", id],
    async () => (await axiosInstance.get(`/video/uploader/${id}`)).data
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
    (data: UploadVideoFormValues) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description ?? "");
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
export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => axiosInstance.delete(`/video/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(["video"]),
    }
  );
}

export function useUpdateVideo(id: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: UpdateVideoFormValues) => {
      const formData = new FormData();

      formData.append("name", data.name ?? "");
      formData.append("description", data.description ?? "");
      
    return  axiosInstance.put(`${API_BASE_URL}/video/${id}`, formData , {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["video"]),
    }
  );
}

export function useUpdateVideoViews(id: string) {
  return useMutation(() => axiosInstance.patch(`/video/${id}/views`));
}
