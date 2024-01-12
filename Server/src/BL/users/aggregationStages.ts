import mongoose, { PipelineStage } from "mongoose";

export const getFilterById = (id: string): PipelineStage => ({
  $match: {
    _id: new mongoose.Types.ObjectId(id),
  },
});

export const cleanResults: PipelineStage = {
  $project: {
    password: 0,
    isGoogleUser: 0,
    refreshTokens: 0,
  },
};
