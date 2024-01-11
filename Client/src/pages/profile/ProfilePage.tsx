import { Avatar, Box, Button, Typography } from "@mui/material"
import { User } from "../../types/user";
import styled from '@emotion/styled';
import { editProfileButtonStyles, fullNameStyles, nameContainerStyles, postsContainerStyles, postsTitleStyles, profileContainerStyles, profileDataContainerStyles, profileDataStyles, profilePictureStyles, userNameStyles } from "./styles";

// interface Props {
//   user: User;
// }

const user: User = {
  email: "yael",
  password: "123",
  username: "@buchris",
  fullName: "Yael Buchris",
}

const ProfileContainer = styled(Box)(profileContainerStyles)
const ProfileDataContainer = styled(Box)(profileDataContainerStyles)
const ProfileData = styled(Box)(profileDataStyles)
const ProfilePicture = styled(Avatar)(profilePictureStyles)
const FullName = styled(Typography)(fullNameStyles)
const UserName = styled(Typography)(userNameStyles)
const EditProfileButton = styled(Button)(editProfileButtonStyles);
const PostsContainer = styled(Box)(postsContainerStyles);
const PostsTitle = styled(Box)(postsTitleStyles);

export const ProfilePage = () => {
  return (
    <ProfileContainer>
      <ProfileDataContainer>
        <ProfileData>
          <ProfilePicture alt={user.fullName} src={user.profilePic} />
          <Box>
            <FullName>
              {user.fullName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </FullName>
            <UserName>{user.username}</UserName>
          </Box>
        </ProfileData>
        <EditProfileButton>Edit profile</EditProfileButton>
      </ProfileDataContainer>
      <PostsContainer>
        <PostsTitle>Posts</PostsTitle>
      </PostsContainer>
    </ProfileContainer>
  )
};
