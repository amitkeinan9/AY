import styled from "@emotion/styled";
import { Avatar, Box, Button, IconButton, TextField, useTheme } from "@mui/material";
import { backButtonStyles, editProfileContainerStyles, editProfileHeaderStyles, fieldStyles, formContainerStyles, saveButtonStyles } from "./styles";
import BackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface EditProfileProps {
}

// const PostContainer = styled("div")(
//   postContainerStyles,
//   (props: { isClickable: boolean }) => ({
//     "&:hover": props.isClickable ? postContainerHoverStyles : {},
//   })
// );
// const Username = styled("span")(usernameStyles);

const EditProfileContainer = styled(Box)(editProfileContainerStyles);
const EditProfileHeader = styled(Box)(editProfileHeaderStyles);
const BackButton = styled(IconButton)(backButtonStyles);
const FormContainer = styled(Box)(formContainerStyles);
const Field = styled(TextField)(fieldStyles)
const SaveButton = styled(Button)(saveButtonStyles);

export const EditProfilePage = (props: EditProfileProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const theme = useTheme();
    const navigate = useNavigate();

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
                    <Avatar src={"ff"} alt="User Avatar" sx={{ width: '5.5rem', height: "5.5rem" }} />
                    <div style={{ position: 'absolute', top: '3.8rem', left: '3.8rem' }}>
                        <IconButton onClick={() => setIsEditing(true)} color="primary" style={{ width: '1.7rem', height: "1.7rem", borderRadius: '50%', background: theme.palette.primary.main }}>
                            <EditIcon style={{ color: 'white', fontSize: '1rem' }} />
                        </IconButton>
                    </div>
                </div>
                <Field
                    label="Name"
                    InputProps={{ sx: { borderRadius: '0.6rem', height: '3rem' } }}
                />
                <Field
                    label="New password"
                    InputProps={{ sx: { borderRadius: '0.6rem', height: '3rem' } }}
                />
                <SaveButton onClick={() => { }} variant="outlined" fullWidth>
                    Save
                </SaveButton>
            </FormContainer>
        </EditProfileContainer>
    );
};
