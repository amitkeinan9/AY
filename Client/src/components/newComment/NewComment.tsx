import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar/Avatar";
import TextField from "@mui/material/TextField/TextField";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { commentContainerStyles } from "./styles";
import { LoadingButton } from "../loadingButton/LoadingButton";
import { Alert } from "@mui/material";
import { useNewComment } from "./useNewComment";

const CommentContainer = styled("div")(commentContainerStyles);

export const NewComment = () => {
  const { connectedUser, isLoading } = useLoggedInUser();
  const {
    content,
    handleReplyChange,
    postComment,
    isCommentError,
    isCommentLoading,
  } = useNewComment();

  return (
    !isLoading && (
      <div>
        <CommentContainer>
          <Avatar
            alt={connectedUser.fullName}
            src={connectedUser.profilePic}
          ></Avatar>
          <TextField
            multiline
            fullWidth
            placeholder="Post your reply"
            value={content}
            onChange={handleReplyChange}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: "1.2rem",
              },
            }}
          />
          <LoadingButton
            variant="contained"
            disabled={!isCommentLoading}
            isLoading={false}
            onClick={postComment}
          >
            Reply
          </LoadingButton>
        </CommentContainer>
        {isCommentError && <Alert severity="error">Failed to post reply</Alert>}
      </div>
    )
  );
};
