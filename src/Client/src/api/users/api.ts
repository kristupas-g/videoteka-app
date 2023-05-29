import { useQuery } from "react-query";
import { axiosInstance } from "../../config/axiosInstance";
import { User } from "../auth/types";

export function useUser(id: string) {
  return useQuery<User>(
    ["users", id],
    async () => (await axiosInstance.get(`/user/${id}`)).data
  );
}
