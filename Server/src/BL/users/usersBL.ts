import { EditUserDTO, UserDTO } from "./types";
import User from "../../models/userModel";
import bcrypt from "bcrypt";
import { ImageType, saveImage } from "../common/images";
import { NotFoundError } from "../../errors/NotFoundError";
import mongoose from "mongoose";
import { ConflictError } from "../../errors/ConflictError";

export const getUser = async (id: string): Promise<UserDTO> => {
    try {
        const user: UserDTO = (await User.findById(id).select('-password -isGoogleUser -refreshTokens').exec()) as UserDTO;

        if (!user) {
            throw new NotFoundError("Couldn't find requested user");
        }

        return user;
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            throw new NotFoundError("Couldn't find requested user");
        }

        throw e;
    }
};

export const editUser = async (id: string, user: EditUserDTO) => {
    try {
        if (user.username) {
            const existUser = await User.findOne({
                _id: { $ne: id },
                username: user.username
            });

            if (existUser) {
                throw new ConflictError("Username already exist");
            }
        }

        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }

        if (user.profilePic) {
            user.profilePic = await saveImage(
                user.profilePic,
                user.email,
                ImageType.PROFILE
            );
        }

        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })

        if (!updatedUser) {
            throw new NotFoundError("Couldn't find requested user");
        }

        const { __v, ...userToReturn } = updatedUser.toObject();

        return userToReturn;
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            throw new NotFoundError("Couldn't find requested user");
        }

        throw e;
    }
};
