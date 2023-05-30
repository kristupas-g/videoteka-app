import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "./types";
import { axiosInstance } from "../../config/axiosInstance";
import { LoginFormValues } from "../../pages/auth/LoginPage/loginFormSchema";
import { BASE_URL } from "../../config/const";

export function useAuthenticatedUser() {
  return useQuery<User | undefined>(
    ["auth"],
    async () => (await axiosInstance.get("/auth")).data
  );
}

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

export function useAuthSignup() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: LoginFormValues) => axiosInstance.post("/auth/signup", data),
    {
      onSuccess: () => queryClient.invalidateQueries(["auth"]),
    }
  );
}

export function useAuthLogout() {
  const queryClient = useQueryClient();

  return useMutation(() => axiosInstance.post("/auth/logout", {}), {
    onSuccess: () => {
      queryClient.invalidateQueries(["auth"]);
      window.location.replace(BASE_URL);
    },
  });
}
