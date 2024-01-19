import mongoose from "mongoose";
import Post, { Comment } from "../../models/postModel";

export const addComment = async (
  postId: string,
  authorId: string,
  content: string
) => {
  const post = await Post.findById(postId);

  const newComment: Comment = {
    author: new mongoose.Types.ObjectId(authorId),
    content,
  };

  if (Array.isArray(post.comments)) {
    post.comments.push(newComment);
  } else {
    post.comments = [newComment];
  }

  await post.save();

  return newComment;
};
