import { ObjectId, PipelineStage } from "mongoose";
import {
  cleanResults,
  countComments,
  getFilterByAuthor,
  lookupAuthors,
  unwindAuthor,
} from "./aggregationStages";
import Post from "../../models/postModel";
import { PostDTO } from "./types";
import { ImageType, saveImage } from "../common/images";
import { parsePostToDTO } from "./postsParser";

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
