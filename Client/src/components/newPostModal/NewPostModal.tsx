import { Close, ImageOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar/Avatar";
import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import Divider from "@mui/material/Divider/Divider";
import Button from "@mui/material/Button/Button";
import Modal from "@mui/material/Modal/Modal";

import {
  avatarStyles,
  imageStyles,
  modalContentStyles,
  modalFooterlStyles,
  modalHeaderStyles,
  modalStyles,
  postContainerStyles,
  previewContainerStyles,
  removeImageButtonStyles,
} from "./styles";
import { useSelectImage } from "./useSelectImage";
import { useNewPostForm } from "./useNewPostForm";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalBody = styled("div")(modalStyles);
const ModalHeader = styled("div")(modalHeaderStyles);
const ProfilePhoto = styled(Avatar)(avatarStyles);
const ModalContent = styled("div")(modalContentStyles);
const ModalFooter = styled("div")(modalFooterlStyles);
const Image = styled("img")(imageStyles);
const RemoveImageButton = styled(IconButton)(removeImageButtonStyles);
const PostContainer = styled("div")(postContainerStyles);
const PreviewContainer = styled("div")(previewContainerStyles);

export const NewPostModal = (props: NewPostModalProps) => {
  const { isOpen, onClose } = props;
  const { selectImage, removeImage, preview, selectedImage } = useSelectImage();
  const { content, handleContentChange, isFormValid, createPost } =
    useNewPostForm({
      image: selectedImage,
    });

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalBody>
        <ModalHeader>
          <IconButton onClick={onClose}>
            <Close htmlColor="rgb(15, 20, 25)" />
          </IconButton>
        </ModalHeader>

        <ModalContent>
          <ProfilePhoto
            sizes=""
            src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQi8RStSgyI6RaRYbUxcZTo4s5uzv8sUTTbgAoXEKaZsJz8hD0S4AEOKafJ-n1Y01Xo25FXlO_VgDDtoks"
          />

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
          <Button
            variant="contained"
            disabled={!isFormValid}
            onClick={createPost}
          >
            Post
          </Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};