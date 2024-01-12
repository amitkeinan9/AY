import { Alert, Avatar, Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import { UserDto } from "../../types/user";
import styled from '@emotion/styled';
import { editProfileButtonStyles, fullNameStyles, postsTitleStyles, profileContainerStyles, profileDataContainerStyles, profileDataStyles, profilePictureStyles, userNameStyles } from "./styles";
import { Post } from "../../components/post/Post";
import { useNavigate } from "react-router-dom";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { useQuery } from "react-query";
import { PostDTO } from "../../types/post";

const ProfileContainer = styled(Box)(profileContainerStyles)
const ProfileDataContainer = styled(Box)(profileDataContainerStyles)
const ProfileData = styled(Box)(profileDataStyles)
const ProfilePicture = styled(Avatar)(profilePictureStyles)
const FullName = styled(Typography)(fullNameStyles)
const UserName = styled(Typography)(userNameStyles)
const EditProfileButton = styled(Button)(editProfileButtonStyles);
const PostsTitle = styled(Typography)(postsTitleStyles);

export const ProfilePage = () => {
  const navigate = useNavigate();

  const {
    data: connectedUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<UserDto>(
    "users",
    async () => (await backendAxiosInstance.get(`/users`)).data);

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useQuery<PostDTO[]>(
    "posts",
    async () => (await backendAxiosInstance.get("/posts")).data
  );

  return (
    <ProfileContainer>
      <ProfileDataContainer>
        {isUserLoading ? (
          <Container>
            <CircularProgress />
          </Container>
        ) : isUserError ? (
          <Container>
            <Alert severity="error" sx={{ width: '18rem' }}>
              Could not fetch user, please try again later
            </Alert>
          </Container>
        ) : (
          <>
            <ProfileData>
              <ProfilePicture alt={connectedUser.fullName} src={connectedUser.profilePic} />
              <Box>
                <FullName>
                  {connectedUser.fullName.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </FullName>
                <UserName>{connectedUser.username}</UserName>
              </Box>
            </ProfileData></>
        )}
        <EditProfileButton>Edit profile</EditProfileButton>
      </ProfileDataContainer>
      <Box>
        <PostsTitle>Posts</PostsTitle>
        {isPostsLoading ? (
          <Container sx={{ m: '1rem 0 0 1rem' }}>
            <CircularProgress />
          </Container>
        ) : isPostsError ? (
          <Container>
            <Alert severity="error">
              Could not fetch posts, please try again later
            </Alert>
          </Container>
        ) : (posts && posts.map(({ _id, author, content, commentsCount }: PostDTO) => (
          <Post
            // TODO: Fix after adding pictures usernames and names
            author={{
              fullName: "",
              username: author.email,
              profilePic: "",
            }}
            content={content}
            commentsCount={commentsCount}
            onClick={() => navigate(`/posts/${_id}`)}
          />
        )))}
      </Box>
    </ProfileContainer>
  )
};
