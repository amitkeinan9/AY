import { PipelineStage } from "mongoose";
import {
  cleanResults,
  countComments,
  getFilterByAuthor,
  lookupAuthors,
  unwindAuthor,
} from "./aggregationStages";
import Post from "../../models/postModel";
import { PostDTO } from "./types";

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
