import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar/Avatar";
import TextField from "@mui/material/TextField/TextField";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { commentContainerStyles } from "./styles";
import { LoadingButton } from "../loadingButton/LoadingButton";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { Alert } from "@mui/material";

const CommentContainer = styled("div")(commentContainerStyles);

export const NewComment = () => {
  const { connectedUser, isLoading } = useLoggedInUser();
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const postCommentMutation = useMutation({
    mutationFn: (commentContent: string) =>
      backendAxiosInstance.post(`/posts/${postId}/comments`, {
        content: commentContent,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
      setContent("");
    },
  });

  const [content, setContent] = useState<string>();

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    postCommentMutation.reset();
    setContent(e.target.value);
  };

  const postComment = () => {
    postCommentMutation.mutate(content);
  };

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
          ></TextField>
          <LoadingButton
            variant="contained"
            disabled={!content}
            isLoading={false}
            onClick={postComment}
          >
            Reply
          </LoadingButton>
        </CommentContainer>
        {postCommentMutation.isError && (
          <Alert severity="error">Failed to post reply</Alert>
        )}
      </div>
    )
  );
};
