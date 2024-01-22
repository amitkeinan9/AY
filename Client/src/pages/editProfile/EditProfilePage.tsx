import styled from "@emotion/styled";
import { Alert, Avatar, Box, Button, IconButton, TextField, useTheme } from "@mui/material";
import { backButtonStyles, editProfileContainerStyles, editProfileHeaderStyles, fieldStyles, formContainerStyles, saveButtonStyles } from "./styles";
import BackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelectImage } from "../../hooks/useSelectImage";
import { useEditProfileForm } from "./useEditProfileForm";
import { ImageOutlined } from "@mui/icons-material";
import { LoadingButton } from "../../components/loadingButton/LoadingButton";

const EditProfileContainer = styled(Box)(editProfileContainerStyles);
const EditProfileHeader = styled(Box)(editProfileHeaderStyles);
const BackButton = styled(IconButton)(backButtonStyles);
const FormContainer = styled(Box)(formContainerStyles);
const Field = styled(TextField)(fieldStyles)
const SaveButton = styled(LoadingButton)(saveButtonStyles);

export const EditProfilePage = () => {
    const location = useLocation() 
    const theme = useTheme();
    const navigate = useNavigate();
    const {connectedUser} = location.state;
    
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
        didFail
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
                <div style={{ position: 'relative' }}>
                    <Avatar src={preview || connectedUser.profilePic} alt="User Avatar" sx={{ width: '5.5rem', height: "5.5rem" }} />
                    <div style={{ position: 'absolute', top: '3.8rem', left: '3.8rem' }}>
                        <IconButton color="primary" style={{ width: '1.7rem', height: "1.7rem", borderRadius: '50%', background: theme.palette.primary.main }}
                            component="label"
                            htmlFor="imageUpload"
                        >
                            <EditIcon style={{ color: 'white', fontSize: '1rem' }} />
                            <input
                                id="imageUpload"
                                type="file"
                                hidden
                                onChange={selectImage}
                                accept="image/png, image/gif, image/jpeg"
                            />
                        </IconButton>
                    </div>
                </div>
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
                {didFail && <Alert severity="error" sx={{width: '12rem'}}>Failed to edit prodile</Alert>}
            </FormContainer>
        </EditProfileContainer>
    );
};
