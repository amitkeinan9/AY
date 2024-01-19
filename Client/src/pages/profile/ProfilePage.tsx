import { Typography } from "@mui/material";
import { UserDTO } from "../../types/user";
import styled from "@emotion/styled";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/post";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useQuery } from "@tanstack/react-query";
import { PostList } from "../../components/postList/PostList";
import { titleStyles } from "./styles";

const Title = styled(Typography)(titleStyles);

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
    <div>
      <ProfileInfo
        isLoading={isUserLoading}
        isError={isUserError}
        connectedUser={connectedUser}
      />
      <Title variant="h6">Posts</Title>
      <PostList
        posts={posts}
        isError={isPostsError}
        isLoading={isPostsLoading}
      />
    </div>
  );
};
