import { IPost } from "../../models/postModel";
import { PostDTO } from "./types";

export const parsePostToDTO = async (post: IPost): Promise<PostDTO> => {
  const populatedPost = await post.populate("author");

  const postToReturn: PostDTO = {
    _id: populatedPost._id,
    author: {
      _id: populatedPost.author._id,
      email: populatedPost.author.email,
    },
    content: populatedPost.content,
    commentsCount: populatedPost.comments.length,
  };

  if (populatedPost.image) {
    postToReturn.image = populatedPost.image;
  }

  return postToReturn;
};
