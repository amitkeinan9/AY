import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createPost, getPosts } from "../BL/posts/postsBL";
import { PostDTO } from "../BL/posts/types";
import { AuthRequest } from "../common/auth_middleware";

export const getAllPosts = async (req: Request, res: Response) => {
  const allPosts: PostDTO[] = await getPosts();

  res.status(StatusCodes.OK).json(allPosts);
};

export const getOwnPosts = async (req: AuthRequest, res: Response) => {
  const allPosts: PostDTO[] = await getPosts(req.user?._id);

  res.status(StatusCodes.OK).json(allPosts);
};

export const saveNewPost = async (req: AuthRequest, res: Response) => {
  if (!req.body.content) {
    return res.send(StatusCodes.BAD_REQUEST);
  }

  const newPost: PostDTO = await createPost(
    req.user?._id,
    req.body.content,
    req.body.image
  );

  res.status(StatusCodes.CREATED).json(newPost);
};
