import { UserDTO } from "./types";
import User from "../../models/userModel";
import { PipelineStage } from "mongoose";
import { cleanResults, getFilterById } from "./aggregationStages";

export const getUser = async (_id: string): Promise<UserDTO> => {
    const aggregationStages: PipelineStage[] = [getFilterById(_id), cleanResults];

    const users: UserDTO[] = await User.aggregate<UserDTO>(aggregationStages).exec();

    return users[0];
};
