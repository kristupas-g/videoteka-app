import { useMutation, useQuery, useQueryClient } from "react-query";
import { Video, VideoUpload } from "./types";
import { axiosInstance } from "../../config/axiosInstance";
import axios from "axios";
import { API_BASE_URL } from "../../config/const";

export function useVideos() {
  return useQuery<Video[]>(
    ["videos"],
    async () => (await axiosInstance.get("/video")).data
  );
}

export function useUploadVideo() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: VideoUpload) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("file", data.file[0]);

      return axios.post(`${API_BASE_URL}/video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["videos"]),
    }
  );
}
