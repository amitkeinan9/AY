import { Box } from "@mui/material";
import { UserDTO } from "../../types/user";
import styled from "@emotion/styled";
import { profileContainerStyles } from "./styles";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/post";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { OwnPosts } from "./OwnPosts/OwnPosts";
import { useQuery } from "@tanstack/react-query";

const ProfileContainer = styled(Box)(profileContainerStyles);

export const ProfilePage = () => {
  const email = localStorage.getItem("connectedUserEmail");

  const {
    data: connectedUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<UserDTO>({
    queryKey: ["users", email],
    queryFn: async () => (await backendAxiosInstance.get(`/users/me`)).data,
  });

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useQuery<PostDTO[]>({
    queryKey: ["myPosts", email],
    queryFn: async () => (await backendAxiosInstance.get("/posts/own")).data,
  });

  return (
    <ProfileContainer>
      <ProfileInfo
        isLoading={isUserLoading}
        isError={isUserError}
        connectedUser={connectedUser}
      />
      <OwnPosts
        isLoading={isPostsLoading}
        isError={isPostsError}
        posts={posts}
      />
    </ProfileContainer>
  );
};
