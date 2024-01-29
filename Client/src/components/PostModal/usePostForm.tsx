import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { PostDTO } from "../../types/post";
import { AxiosResponse } from "axios";

interface PostFormProps {
  image?: Promise<string>;
  actionPostMutation: UseMutationResult<AxiosResponse<PostDTO, unknown>, Error, {
    content: string;
    image?: string;
  }, unknown>;
}

export const usePostForm = (props: PostFormProps) => {
  const { image, actionPostMutation } = props;

  const [content, setContent] = useState<string>();

  const isFormValid = !!content || !!image;

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actionPostMutation.reset();
    setContent(e.target.value);
  };

  const savePost = async () => {
    actionPostMutation.reset();
    actionPostMutation.mutate({
      content,
      image: await image,
    });
  };

  const resetForm = () => {
    setContent("");
    actionPostMutation.reset();
  };

  return {
    content,
    setContent,
    handleContentChange,
    isFormValid,
    savePost,
    resetForm,
    isPending: actionPostMutation.isPending,
    didFail: actionPostMutation.isError
  };
};
