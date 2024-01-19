import { Request, Response } from "express";
import { UserDTO } from "../BL/users/types";
import { getUser } from "../BL/users/usersBL";
import { AuthRequest } from "../middlewares/validateAuth";
import { StatusCodes } from "http-status-codes";

export const getCurrentUserData = async (req: AuthRequest, res: Response) => {
  const user: UserDTO = await getUser(req.user?._id);

  res.status(StatusCodes.OK).json(user);
};
