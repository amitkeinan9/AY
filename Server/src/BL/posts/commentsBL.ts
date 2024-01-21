import mongoose from "mongoose";
import Post, { Comment } from "../../models/postModel";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotFoundError } from "../../errors/NotFoundError";
import User, { IUser } from "../../models/userModel";
import { CommentDTO } from "./types";

export const addComment = async (
  postId: string,
  authorId: string,
  content: string
): Promise<CommentDTO> => {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new NotFoundError("Could not find requested post");
    }

    const author: IUser = await User.findById(authorId);

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

    return {
      author: {
        _id: author.id,
        email: author.email,
      },
      content: newComment.content,
    };
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      throw new NotFoundError("Could not find requested post");
    }

    throw e;
  }
};
