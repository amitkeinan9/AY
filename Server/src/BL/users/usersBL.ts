import { EditUserDTO, UserDTO } from "./types";
import User from "../../models/userModel";
import bcrypt from "bcrypt";
import { ImageType, saveImage } from "../common/images";

export const getUser = async (id: string): Promise<UserDTO> => {
    return (await User.findById(id).select('-password -isGoogleUser -refreshTokens').exec() as UserDTO);
};

export const editUser = async (user: EditUserDTO): Promise<void> => {
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

    await User.updateOne({ email: user.email }, user)
};
