import { styled } from "@mui/system";
import { Post } from "../../components/post/Post";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/post";
import { Alert, CircularProgress } from "@mui/material";
import { containerStyles, postListStyles } from "./styles";

const PostsList = styled("div")(postListStyles);
const Container = styled("div")(containerStyles);

export const HomePage = () => {
  const navigate = useNavigate();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<PostDTO[]>({
    queryKey: ["posts"],
    queryFn: async () => (await backendAxiosInstance.get("/posts")).data,
  });

  return (
    <PostsList>
      {isLoading ? (
        <Container>
          <CircularProgress />
        </Container>
      ) : isError ? (
        <Container>
          <Alert severity="error">
            Could not fetch posts, please try again later
          </Alert>
        </Container>
      ) : (
        posts.map(({ _id, author, content, commentsCount, image }: PostDTO) => (
          <Post
            // TODO: Fix after adding pictures usernames and names
            author={{
              fullName: "",
              username: author.email,
              profilePic: "",
            }}
            content={content}
            image={image}
            commentsCount={commentsCount}
            onClick={() => navigate(`/posts/${_id}`)}
          />
        ))
      )}
    </PostsList>
  );
};
