import mongoose, { MongooseError, ObjectId, PipelineStage } from "mongoose";
import {
  cleanResults,
  countComments,
  getFilterByAuthor,
  lookupAuthors,
  sortByTimestamp,
  unwindAuthor,
} from "./aggregationStages";
import Post, { IPost } from "../../models/postModel";
import { PostDTO } from "./types";
import { ImageType, saveImage } from "../common/images";
import { parsePostToDTO } from "./postsParser";
import { NotFoundError } from "../../errors/NotFoundError";
import { ForbiddenError } from "../../errors/ForbiddenError";

export const getPosts = async (authorId?: string): Promise<PostDTO[]> => {
  const aggregationStages: PipelineStage[] = [
    lookupAuthors,
    unwindAuthor,
    countComments,
    cleanResults,
    sortByTimestamp,
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

export const deletePostById = async (authorId: string, postId: string) => {
  try {
    const existPost = await Post.findById(postId).populate("author");

    if (!existPost) {
      throw new NotFoundError("Couldn't find requested post");
    }

    if (existPost.author.id !== authorId) {
      throw new ForbiddenError(
        "Couldn't delete a post of another connected user"
      );
    }

    await Post.findByIdAndDelete(postId);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      throw new NotFoundError("Couldn't find requested post");
    }

    throw e;
  }
};

export const editPostById = async (
  authorId: string,
  postId: string,
  content: string,
  imageBase64?: string
): Promise<PostDTO> => {
  try {
    const existPost = await Post.findById(postId).populate("author");

    if (!existPost) {
      throw new NotFoundError("Couldn't find requested post");
    }

    if (existPost.author.id !== authorId) {
      throw new ForbiddenError(
        "Couldn't edit a post of another connected user"
      );
    }

    existPost.content = content;
    existPost.image = !imageBase64
      ? undefined
      : await saveImage(imageBase64, postId, ImageType.POST);

    const updatedPost = await existPost.save();

    return parsePostToDTO(updatedPost);
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
