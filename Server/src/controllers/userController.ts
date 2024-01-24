import { NextFunction, Response } from "express";
import { EditUserDTO, UserDTO } from "../BL/users/types";
import { getUser, editUser as editCurrentUser } from "../BL/users/usersBL";
import { AuthRequest } from "../middlewares/validateAuth";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/BadRequestError";

export const getCurrentUserData = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user: UserDTO = await getUser(req.params.id);

        res.status(StatusCodes.OK).json(user);
    } catch (e) {
        next(e);
    }
};

export const editUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const user = req.body as EditUserDTO;

        if (!user.fullName && !user.password && !user.profilePic && !user.username) {
            throw new BadRequestError("Cannot edit empty user");
        }

        await editCurrentUser(userId, user);

        res.status(StatusCodes.OK).json();
    } catch (e) {
        next(e);
    }
}
