import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createPost, getPosts } from "../BL/posts/postsBL";
import { PostDTO } from "../BL/posts/types";
import { AuthRequest } from "../middlewares/validateAuth";
import { BadRequestError } from "../errors/BadRequestError";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts: PostDTO[] = await getPosts();

    res.status(StatusCodes.OK).json(allPosts);
  } catch (e) {
    next(e);
  }
};

export const getOwnPosts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts: PostDTO[] = await getPosts(req.user?._id);

    res.status(StatusCodes.OK).json(allPosts);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const saveNewPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.content && !req.body.image) {
      throw new BadRequestError("Cannot post empty post");
    }

    const newPost: PostDTO = await createPost(
      req.user?._id,
      req.body.content,
      req.body.image
    );

    res.status(StatusCodes.CREATED).json(newPost);
  } catch (e) {
    next(e);
  }
};
