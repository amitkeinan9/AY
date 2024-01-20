import { Response } from "express";
import { EditUserDTO, UserDTO } from "../BL/users/types";
import { getUser, editUser as editCurrentUser } from "../BL/users/usersBL";
import { AuthRequest } from "../middlewares/validateAuth";
import { StatusCodes } from "http-status-codes";

export const getCurrentUserData = async (req: AuthRequest, res: Response) => {
    const user: UserDTO = await getUser(req.user?._id);

    res.status(StatusCodes.OK).json(user);
};

export const editUser = async (req: AuthRequest, res: Response) => {
    const user = req.body as EditUserDTO;

    await editCurrentUser(user);

    res.status(StatusCodes.OK).json();
}
