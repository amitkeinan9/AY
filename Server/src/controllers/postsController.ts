import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createPost, deletePostById, editPostById, getPostById, getPosts } from "../BL/posts/postsBL";
import { CommentDTO, PostDTO } from "../BL/posts/types";
import { AuthRequest } from "../middlewares/validateAuth";
import { BadRequestError } from "../errors/BadRequestError";
import { addComment } from "../BL/posts/commentsBL";

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

export const getPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPostById(req.params.id);

    res.status(StatusCodes.OK).json(post);
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await deletePostById(req.user?._id, req.params.id);

    res.status(StatusCodes.OK).json(post);
  } catch (e) {
    next(e);
  }
};

export const editPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.content && !req.body.image) {
      throw new BadRequestError("Cannot post empty post");
    }

    const updatedPost: PostDTO = await editPostById(
      req.user?._id,
      req.params.id,
      req.body.content,
      req.body.image
    );

    res.status(StatusCodes.OK).json(updatedPost);
  } catch (e) {
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

export const saveComment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.content) {
      throw new BadRequestError("Cannot post empty comment");
    }

    const newComment: CommentDTO = await addComment(
      req.params.id,
      req.user._id,
      req.body.content
    );

    res.status(StatusCodes.CREATED).json(newComment);
  } catch (e) {
    next(e);
  }
};
