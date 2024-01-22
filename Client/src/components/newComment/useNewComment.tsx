import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendAxiosInstance } from "../../axios/backendInstance";
import { useState } from "react";

export const useNewComment = () => {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const postCommentMutation = useMutation({
    mutationFn: (commentContent: string) =>
      backendAxiosInstance.post(`/posts/${postId}/comments`, {
        content: commentContent,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", postId] });
      setContent("");
    },
  });

  const [content, setContent] = useState<string>();

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    postCommentMutation.reset();
    setContent(e.target.value);
  };

  const postComment = () => {
    postCommentMutation.mutate(content);
  };

  return {
    postComment,
    handleReplyChange,
    content,
    isCommentError: postCommentMutation.isError,
    isCommentLoading: postCommentMutation.isPending,
  };
};
