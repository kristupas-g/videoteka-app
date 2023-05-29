import { useMutation, useQuery, useQueryClient } from "react-query";
import { LoginCredentials, User } from "./types";
import { axiosInstance } from "../../config/axiosInstance";

export function useAuthLogin() {
  const queryClient = useQueryClient();

  return useMutation(
    (credentials: LoginCredentials) =>
      axiosInstance.post("/auth/login", credentials),
    {
      onSuccess: () => queryClient.invalidateQueries(["auth"]),
    }
  );
}

export function useAuthenticatedUser() {
  return useQuery<User | undefined>(
    ["auth"],
    async () => (await axiosInstance.get("/auth")).data
  );
}
