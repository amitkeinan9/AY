import { styled } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/post";
import { postListStyles as containerStyles } from "./styles";
import { PostList } from "../../components/postList/PostList";

const Container = styled("div")(containerStyles);

export const HomePage = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<PostDTO[]>({
    queryKey: ["posts"],
    queryFn: async () => (await backendAxiosInstance.get("/posts")).data,
  });

  return (
    <Container>
      <PostList posts={posts} isError={isError} isLoading={isLoading} />
    </Container>
  );
};
