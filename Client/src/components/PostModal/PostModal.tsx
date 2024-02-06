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
import { usePostForm } from "./usePostForm";
import { LoadingButton } from "../loadingButton/LoadingButton";
import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { PostDTO } from "../../types/post";

interface PostModalProps {
  isOpen: boolean;
  isNewPost: boolean;
  currContent?: string;
  currImage?: string;
  actionPostMutation: UseMutationResult<
    AxiosResponse<PostDTO, unknown>,
    Error,
    {
      content: string;
      image?: string;
    },
    unknown
  >;
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

export const PostModal = (props: PostModalProps) => {
  const {
    isOpen,
    isNewPost,
    currImage,
    currContent,
    actionPostMutation,
    onClose,
  } = props;
  const { connectedUser, isLoading } = useLoggedInUser();
  const { selectImage, removeImage, preview, selectedImage, resetImage } =
    useSelectImage(currImage);
  const {
    content,
    setContent,
    handleContentChange,
    isFormValid,
    savePost,
    isPending,
    didFail,
    resetForm,
  } = usePostForm({
    image: selectedImage,
    actionPostMutation,
  });

  useEffect(() => {
    resetImage();
    resetForm();

    if (currContent) {
      setContent(currContent);
    }
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
            onClick={savePost}
            isLoading={isPending}
          >
            {isNewPost ? "Post" : "Save"}
          </LoadingButton>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};
