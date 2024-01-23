import { Box, styled } from "@mui/system";
import { Post } from "../../components/post/Post";
import {ArrowBackIosNewOutlined as BackIcon, Edit as EditIcon, Delete as DeleteIcon} from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton/IconButton";
import { actionPostButtonStyles, actionPostContainerStyles, backButtonStyles, postHeaderStyles } from "./styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { Comment, PostDTO, PostWithComments } from "../../types/post";
import { NewComment } from "../../components/newComment/NewComment";

const PostHeader = styled("div")(postHeaderStyles);
const BackButton = styled(IconButton)(backButtonStyles);
const ActionPostContainer = styled(Box)(actionPostContainerStyles)
const ActionPostButton = styled(IconButton)(actionPostButtonStyles);

export const PostPage = () => {
  const navigate = useNavigate();
  const { state }: { state: Omit<PostDTO, "_id"> } = useLocation();
  const { postId } = useParams();
  const email = localStorage.getItem("connectedUserEmail");

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
    onSuccess: () => goBack()
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
        {post.author.email === email &&
          <ActionPostContainer>
            <ActionPostButton color="primary" onClick={() => alert('edit')}><EditIcon/></ActionPostButton>
            <ActionPostButton color="primary" onClick={() => deletePostMutation.mutate()}><DeleteIcon/></ActionPostButton>
          </ActionPostContainer>
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
    </div>
  );
};
