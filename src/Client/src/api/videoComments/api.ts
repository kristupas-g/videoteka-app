import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../config/axiosInstance";
import { VideoCommentForm } from "./types";

export function useCreateVideoComment() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: VideoCommentForm) => axiosInstance.post("/videoComments", data),
    {
      onSuccess: () => queryClient.invalidateQueries(["comments"]),
    }
  );
}

export function useDeleteVideoComment() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => axiosInstance.delete(`/videoComments/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(["comments"]),
    }
  );
}
