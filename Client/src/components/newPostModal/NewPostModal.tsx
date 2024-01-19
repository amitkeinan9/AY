import { Close, ImageOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar/Avatar";
import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import Divider from "@mui/material/Divider/Divider";
import Modal from "@mui/material/Modal/Modal";

import {
  avatarStyles,
  imageStyles,
  modalContentStyles,
  modalFooterlStyles,
  modalStyles,
  postContainerStyles,
  previewContainerStyles,
  removeImageButtonStyles,
} from "./styles";
import { useSelectImage } from "../../hooks/useSelectImage";
import { useNewPostForm } from "./useNewPostForm";
import { LoadingButton } from "../loadingButton/LoadingButton";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalBody = styled("div")(modalStyles);
const ProfilePhoto = styled(Avatar)(avatarStyles);
const ModalContent = styled("div")(modalContentStyles);
const ModalFooter = styled("div")(modalFooterlStyles);
const Image = styled("img")(imageStyles);
const RemoveImageButton = styled(IconButton)(removeImageButtonStyles);
const PostContainer = styled("div")(postContainerStyles);
const PreviewContainer = styled("div")(previewContainerStyles);

export const NewPostModal = (props: NewPostModalProps) => {
  const { isOpen, onClose } = props;
  const { connectedUser, isLoading } = useLoggedInUser();
  const { selectImage, removeImage, preview, selectedImage } = useSelectImage();
  const {
    content,
    handleContentChange,
    isFormValid,
    createPost,
    isPending,
    didFail,
    resetForm,
  } = useNewPostForm({
    image: selectedImage,
    onSaveSuccess: onClose,
  });

  useEffect(() => {
    removeImage();
    resetForm();
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalBody>
        <div>
          <IconButton onClick={onClose}>
            <Close htmlColor="rgb(15, 20, 25)" />
          </IconButton>
        </div>

        {didFail && <Alert severity="error">Failed to save post</Alert>}
        <ModalContent>
          {!isLoading && <ProfilePhoto src={connectedUser.profilePic} />}

          <PostContainer>
            <TextField
              multiline
              fullWidth
              placeholder="What is happening?!"
              value={content}
              onChange={handleContentChange}
              variant="standard"
              minRows={3}
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: "1.3rem",
                },
              }}
            ></TextField>

            {preview && (
              <PreviewContainer>
                <RemoveImageButton onClick={removeImage} size="small">
                  <Close htmlColor="white" />
                </RemoveImageButton>
                <Image src={preview} />
              </PreviewContainer>
            )}
          </PostContainer>
        </ModalContent>

        <Divider />
        <ModalFooter>
          <IconButton
            color="primary"
            component="label"
            htmlFor="imageUpload"
            disabled={!!selectedImage}
          >
            <ImageOutlined />
            <input
              id="imageUpload"
              type="file"
              hidden
              onChange={selectImage}
              accept="image/png, image/gif, image/jpeg"
            />
          </IconButton>
          <LoadingButton
            variant="contained"
            disabled={!isFormValid}
            onClick={createPost}
            isLoading={isPending}
          >
            Post
          </LoadingButton>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};
