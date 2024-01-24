import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/post";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { useQuery } from "@tanstack/react-query";
import { PostList } from "../../components/postList/PostList";
import { titleStyles } from "./styles";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";

const Title = styled(Typography)(titleStyles);

export const ProfilePage = () => {
  const userId = localStorage.getItem("connectedUserId");
  const {
    connectedUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useLoggedInUser();

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useQuery<PostDTO[]>({
    queryKey: ["myPosts", userId],
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
