import { useQuery } from "@tanstack/react-query";
import { UserDTO } from "../types/user";
import { backendAxiosInstance } from "../axios/backendInstance";

export const useLoggedInUser = () => {
  const email = localStorage.getItem("connectedUserEmail");

  const {
    data: connectedUser,
    isLoading,
    isError,
  } = useQuery<UserDTO>({
    queryKey: ["users", email],
    queryFn: async () => (await backendAxiosInstance.get(`/users/me`)).data,
  });

  return { connectedUser, isLoading, isError };
};
