import { Alert, Avatar, Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import styled from '@emotion/styled';
import {
    editProfileButtonStyles,
    fullNameStyles,
    profileDataContainerStyles,
    profileDataStyles,
    profilePictureStyles,
    userNameStyles
} from "./styles";
import { UserDTO } from "../../../types/user";
import { useNavigate } from "react-router-dom";

interface Props {
    isLoading: boolean;
    isError: boolean;
    connectedUser: UserDTO;
}

const ProfileDataContainer = styled(Box)(profileDataContainerStyles)
const ProfileData = styled(Box)(profileDataStyles)
const ProfilePicture = styled(Avatar)(profilePictureStyles)
const FullName = styled(Typography)(fullNameStyles)
const UserName = styled(Typography)(userNameStyles)
const EditProfileButton = styled(Button)(editProfileButtonStyles);

export const ProfileInfo = ({ isLoading, isError, connectedUser }: Props) => {
    const navigate = useNavigate();

    return (
        <ProfileDataContainer>
            {isLoading ? (
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Container>
            ) : isError ? (
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
                            <UserName>@{connectedUser.username}</UserName>
                        </Box>
                    </ProfileData>
                    <EditProfileButton onClick={() => navigate('/profile/edit', { state: { connectedUser } })}>Edit profile</EditProfileButton>
                </>
            )}
        </ProfileDataContainer>
    )
};
