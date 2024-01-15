import { Box } from "@mui/material"
import { UserDTO } from "../../types/user";
import styled from '@emotion/styled';
import { profileContainerStyles } from "./styles";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { useQuery } from "react-query";
import { PostDTO } from "../../types/post";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { OwnPosts } from "./OwnPosts/OwnPosts";

const ProfileContainer = styled(Box)(profileContainerStyles)

export const ProfilePage = () => {
  const email = localStorage.getItem('connectedUserEmail');

  const {
    data: connectedUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<UserDTO>(
    ["users", email],
    async () => (await backendAxiosInstance.get(`/users/me`)).data);

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useQuery<PostDTO[]>(
    ["myPosts", email],
    async () => (await backendAxiosInstance.get("/posts/own")).data
  );

  return (
    <ProfileContainer>
      <ProfileInfo isLoading={isUserLoading} isError={isUserError} connectedUser={connectedUser} />
      <OwnPosts isLoading={isPostsLoading} isError={isPostsError} posts={posts} />
    </ProfileContainer>
  )
};
