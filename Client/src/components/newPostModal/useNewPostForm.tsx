import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { PostDTO } from "../../types/post";

interface NewPostFormProps {
  image?: Promise<string>;
  onSaveSuccess: () => void;
}

export const useNewPostForm = (props: NewPostFormProps) => {
  const { image, onSaveSuccess } = props;
  const userId = localStorage.getItem("connectedUserId");

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: (newPost: { content: string; image?: string }) =>
      backendAxiosInstance.post<PostDTO>("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", userId] });
      onSaveSuccess();
    },
  });

  const [content, setContent] = useState<string>();

  const isFormValid = !!content || !!image;

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    createPostMutation.reset();
    setContent(e.target.value);
  };

  const createPost = async () => {
    createPostMutation.reset();
    createPostMutation.mutate({
      content,
      image: await image,
    });
  };

  const resetForm = () => {
    setContent("");
    createPostMutation.reset();
  };

  return {
    content,
    handleContentChange,
    isFormValid,
    createPost,
    resetForm,
    isPending: createPostMutation.isPending,
    didFail: createPostMutation.isError,
  };
};
