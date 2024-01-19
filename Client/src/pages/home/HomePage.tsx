import { useQuery } from "@tanstack/react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/post";
import { PostList } from "../../components/postList/PostList";

export const HomePage = () => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<PostDTO[]>({
    queryKey: ["posts"],
    queryFn: async () => (await backendAxiosInstance.get("/posts")).data,
  });

  return <PostList posts={posts} isError={isError} isLoading={isLoading} />;
};
