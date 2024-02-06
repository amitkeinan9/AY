import { useNavigate } from "react-router-dom";
import { PostDTO } from "../../types/post";
import { Post } from "../post/Post";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Alert from "@mui/material/Alert/Alert";
import styled from "@emotion/styled";
import { containerStyles } from "./styles";
import { Typography } from "@mui/material";

interface PostListProps {
  isLoading: boolean;
  isError: boolean;
  posts: PostDTO[];
}

const Container = styled("div")(containerStyles);

export const PostList = (props: PostListProps) => {
  const { posts, isLoading, isError } = props;
  const navigate = useNavigate();

  return (
    <>
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
      ) : !posts || posts.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            marginTop: 5,
            color: "gray",
          }}
        >
          No posts yet, Make the first :)
        </Typography>
      ) : (
        posts.map(({ _id, author, content, commentsCount, image }: PostDTO) => (
          <Post
            key={_id}
            author={author}
            content={content}
            image={image}
            commentsCount={commentsCount}
            onClick={(post: Omit<PostDTO, "_id">) =>
              navigate(`/posts/${_id}`, { state: post })
            }
          />
        ))
      )}
    </>
  );
};
