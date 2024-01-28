import { Box, styled } from "@mui/system";
import { Post } from "../../components/post/Post";
import { ArrowBackIosNewOutlined as BackIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton/IconButton";
import { actionPostButtonStyles, actionPostContainerStyles, backButtonStyles, postHeaderStyles } from "./styles";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { Comment, PostDTO, PostWithComments } from "../../types/post";
import { NewComment } from "../../components/newComment/NewComment";
import { Alert } from "@mui/material";
import { useState } from "react";
import { PostModal } from "../../components/PostModal/PostModal";

const PostHeader = styled("div")(postHeaderStyles);
const BackButton = styled(IconButton)(backButtonStyles);
const ActionPostContainer = styled(Box)(actionPostContainerStyles)
const ActionPostButton = styled(IconButton)(actionPostButtonStyles);

export const PostPage = () => {
  const navigate = useNavigate();
  const { state }: { state: Omit<PostDTO, "_id"> } = useLocation();
  const { postId } = useParams();
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const userId = localStorage.getItem("connectedUserId");
  const queryClient = useQueryClient();

  const { data: post } = useQuery({
    queryKey: ["posts", postId],
    queryFn: async () =>
      (await backendAxiosInstance.get<PostWithComments>(`/posts/${postId}`))
        .data,
    initialData: {
      _id: postId,
      author: state.author,
      content: state.content,
      image: state.image,
      comments: [],
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: () => backendAxiosInstance.delete(`/posts/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      goBack()
    }
  });

  const editPostMutation = useMutation({
    mutationFn: (updatedPost: { content: string; image?: string }) =>
      backendAxiosInstance.put(`/posts/${postId}`, updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      setIsEditPostOpen(false);
    },
  });

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <PostHeader>
        <Box>
          <BackButton onClick={goBack}>
            <BackIcon />
          </BackButton>
          <strong>Post</strong>
        </Box>
        {post.author._id === userId &&
          <>
            {deletePostMutation.isError && <Alert severity="error">Failed to delete post</Alert>}
            <ActionPostContainer>
              <ActionPostButton color="primary" onClick={() => setIsEditPostOpen(true)}><EditIcon /></ActionPostButton>
              <ActionPostButton color="primary" onClick={() => deletePostMutation.mutate()}><DeleteIcon /></ActionPostButton>
            </ActionPostContainer>
          </>
        }
      </PostHeader>
      <Post
        content={post.content}
        image={post.image}
        author={post.author}
        commentsCount={post.comments.length || state.commentsCount}
      />
      <NewComment />
      {post.comments.map((comment: Comment) => (
        <Post
          key={`${comment.content}-${comment.author._id}`}
          content={comment.content}
          author={comment.author}
        />
      ))}
      <PostModal
        isOpen={isEditPostOpen}
        isNewPost={false}
        currContent={post.content}
        currImage={post.image}
        actionPostMutation={editPostMutation}
        onClose={() => setIsEditPostOpen(false)}
      />
    </div>
  );
};
