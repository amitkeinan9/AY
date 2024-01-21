import mongoose, { MongooseError, ObjectId, PipelineStage } from "mongoose";
import {
  cleanResults,
  countComments,
  getFilterByAuthor,
  lookupAuthors,
  unwindAuthor,
} from "./aggregationStages";
import Post, { IPost } from "../../models/postModel";
import { PostDTO } from "./types";
import { ImageType, saveImage } from "../common/images";
import { parsePostToDTO } from "./postsParser";
import { NotFoundError } from "../../errors/NotFoundError";

export const getPosts = async (authorId?: string): Promise<PostDTO[]> => {
  const aggregationStages: PipelineStage[] = [
    lookupAuthors,
    unwindAuthor,
    countComments,
    cleanResults,
  ];

  if (authorId) {
    aggregationStages.unshift(getFilterByAuthor(authorId));
  }

  const posts = await Post.aggregate<PostDTO>(aggregationStages).exec();

  return posts;
};

export const getPostById = async (postId: string) => {
  try {
    const post: IPost = await Post.findById(postId).populate(
      "author comments.author",
      "_id username fullName profilePic email"
    );

    if (!post) {
      throw new NotFoundError("Couldn't find requested post");
    }

    const { __v, ...postToReturn } = post.toObject();

    return postToReturn;
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      throw new NotFoundError("Couldn't find requested post");
    }

    throw e;
  }
};

export const createPost = async (
  authorId: string,
  content: string,
  imageBase64?: string
): Promise<PostDTO> => {
  const newPost = await Post.create({
    content,
    author: authorId,
    comments: [],
  });

  if (imageBase64) {
    newPost.image = await saveImage(
      imageBase64,
      (newPost._id as ObjectId).toString(),
      ImageType.POST
    );

    await newPost.save();
  }

  return parsePostToDTO(newPost);
};
