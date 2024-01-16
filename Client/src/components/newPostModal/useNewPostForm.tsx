import { useState } from "react";

interface NewPostFormProps {
  image?: File;
}

export const useNewPostForm = (props: NewPostFormProps) => {
  const { image } = props;

  const [content, setContent] = useState<string>();

  const isFormValid = !!content || !!image;

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const createPost = () => {};

  return {
    content,
    handleContentChange,
    isFormValid,
    createPost,
  };
};
