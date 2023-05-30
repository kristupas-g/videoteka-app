import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "./types";
import { axiosInstance } from "../../config/axiosInstance";
import { LoginFormValues } from "../../pages/auth/LoginPage/loginFormSchema";

export function useAuthLogin() {
  const queryClient = useQueryClient();

  return useMutation(
    (credentials: LoginFormValues) =>
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
