import { styled } from "@mui/system";
import { Post } from "../../components/post/Post";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/posts";
import { CircularProgress } from "@mui/material";

const PostsList = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  width: "40vw",
  borderRight: "1px solid rgba(239,243,244,1.00)",
  borderLeft: "1px solid rgba(239,243,244,1.00)",
});
const Loader = styled(CircularProgress)({ margin: "30px auto" });

export const HomePage = () => {
  const navigate = useNavigate();

  const { data: posts, isLoading } = useQuery<PostDTO[]>(
    "posts",
    async () => (await backendAxiosInstance.get("/posts")).data
  );

  return (
    <PostsList>
      {isLoading ? (
        <Loader />
      ) : (
        posts.map(({ _id, author, content }: PostDTO) => (
          <Post
            // TODO: Fix after adding pictures usernames and names
            author={{
              fullName: "",
              username: author.email,
              profilePic: "",
            }}
            content={content}
            onClick={() => navigate(`/posts/${_id}`)}
          />
        ))
      )}
    </PostsList>
  );
};
