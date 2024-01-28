import styled from "@emotion/styled";
import { Alert, Avatar, Box, IconButton, TextField } from "@mui/material";
import {
    backButtonStyles,
    editImageContainer,
    editProfileContainerStyles,
    editProfileHeaderStyles,
    editProfilePicIconButtonStyles,
    editProfilePicIconStyles,
    fieldStyles,
    formContainerStyles,
    profilePicContainerStyles,
    profilePicStyles,
    saveButtonStyles
} from "./styles";
import BackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelectImage } from "../../hooks/useSelectImage";
import { useEditProfileForm } from "./useEditProfileForm";
import { LoadingButton } from "../../components/loadingButton/LoadingButton";

const ProfilePicContainer = styled(Box)(profilePicContainerStyles);
const EditProfileContainer = styled(Box)(editProfileContainerStyles);
const EditProfileHeader = styled(Box)(editProfileHeaderStyles);
const BackButton = styled(IconButton)(backButtonStyles);
const FormContainer = styled(Box)(formContainerStyles);
const Field = styled(TextField)(fieldStyles);
const ProfilePic = styled(Avatar)(profilePicStyles);
const EditProfilePicIconButton = styled(IconButton)<{
    component?: React.ElementType;
    htmlFor?: string;
}>(editProfilePicIconButtonStyles)
const EditProfilePicIcon = styled(EditIcon)(editProfilePicIconStyles)
const EditImageContainer = styled('div')(editImageContainer);
const SaveButton = styled(LoadingButton)(saveButtonStyles);

export const EditProfilePage = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const { connectedUser } = location.state;

    const { selectImage, preview, selectedImage } = useSelectImage();
    const {
        username,
        fullName,
        password,
        handleUsernameChange,
        handleFullNameChange,
        handlePasswordChange,
        isFormValid,
        editProfile,
        resetForm,
        isPending,
        didFail,
        errorMessage,
    } = useEditProfileForm({
        profilePic: selectedImage,
    });

    useEffect(() => {
        resetForm();
    }, []);

    return (
        <EditProfileContainer>
            <EditProfileHeader>
                <BackButton>
                    <BackIcon onClick={() => navigate(-1)} />
                </BackButton>
                <strong>Edit profile</strong>
            </EditProfileHeader>
            <FormContainer>
                <ProfilePicContainer>
                    <ProfilePic src={preview || connectedUser.profilePic} alt="User Avatar" />
                    <EditImageContainer>
                        <EditProfilePicIconButton component="label" htmlFor="imageUpload">
                            <EditProfilePicIcon />
                            <input
                                id="imageUpload"
                                type="file"
                                hidden
                                onChange={selectImage}
                                accept="image/png, image/gif, image/jpeg"
                            />
                        </EditProfilePicIconButton>
                    </EditImageContainer>
                </ProfilePicContainer>
                <Field
                    label="Email"
                    placeholder={connectedUser.email}
                    InputLabelProps={{ shrink: true }}
                    disabled
                    InputProps={{ sx: { borderRadius: '0.6rem', height: '3rem' } }}
                />
                <Field
                    label="Full name"
                    value={fullName}
                    onChange={handleFullNameChange}
                    placeholder={connectedUser.fullName}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ sx: { borderRadius: '0.6rem', height: '3rem' } }}
                />
                <Field
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder={connectedUser.username}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ sx: { borderRadius: '0.6rem', height: '3rem' } }}
                />
                <Field
                    label="New password"
                    placeholder="********"
                    value={password}
                    onChange={handlePasswordChange}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ sx: { borderRadius: '0.6rem', height: '3rem' } }}
                />
                <SaveButton
                    disabled={!isFormValid && !preview} onClick={editProfile} variant="outlined"
                    isLoading={isPending}
                >
                    Save
                </SaveButton>
                {didFail && <Alert severity="error" sx={{ width: '12rem' }}>{errorMessage || "Failed to edit prodile"}</Alert>}
            </FormContainer>
        </EditProfileContainer>
    );
};
