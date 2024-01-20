import { Request, Response } from "express";
import { UserDTO } from "../BL/users/types";
import { getUser } from "../BL/users/usersBL";
import { AuthRequest } from "../middlewares/validateAuth";
import { StatusCodes } from "http-status-codes";

export const getCurrentUserData = async (req: AuthRequest, res: Response) => {
    const user: UserDTO = await getUser(req.user?._id);

    res.status(StatusCodes.OK).json(user);
};

export const editUser = async (req: AuthRequest, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const fullName = req.body.fullName;
    const profilePic = req.body.fullName;
}
