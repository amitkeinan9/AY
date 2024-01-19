import { styled } from "@mui/system";
import { Post } from "../../components/post/Post";
import BackIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton/IconButton";
import { backButtonStyles, postHeaderStyles } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { Comment, PostDTO, PostWithComments } from "../../types/post";
import { NewComment } from "../../components/newComment/NewComment";

const PostHeader = styled("div")(postHeaderStyles);
const BackButton = styled(IconButton)(backButtonStyles);

export const PostPage = () => {
  const navigator = useNavigate();
  const { state }: { state: Omit<PostDTO, "_id"> } = useLocation();

  const { postId } = useParams();

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

  console.log(post);

  const goBack = () => {
    navigator(-1);
  };

  return (
    <div>
      <PostHeader>
        <BackButton onClick={goBack}>
          <BackIcon />
        </BackButton>
        <strong>Post</strong>
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
