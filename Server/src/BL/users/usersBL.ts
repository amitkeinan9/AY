import { UserDTO } from "./types";
import User from "../../models/userModel";

export const getUser = async (id: string): Promise<UserDTO> => {
    return (await User.findById(id).select('-password -isGoogleUser -refreshTokens').exec() as UserDTO);
};
