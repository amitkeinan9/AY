import mongoose, { PipelineStage } from "mongoose";

export const getFilterByAuthor = (authorId: string): PipelineStage => ({
  $match: {
    author: new mongoose.Types.ObjectId(authorId),
  },
});

export const lookupAuthors: PipelineStage = {
  $lookup: {
    from: "users",
    localField: "author",
    foreignField: "_id",
    as: "author",
  },
};

export const unwindAuthor: PipelineStage = {
  $unwind: "$author",
};

export const countComments: PipelineStage = {
  $addFields: {
    commentsCount: {
      $cond: {
        if: { $isArray: "$comments" },
        then: { $size: "$comments" },
        else: 0,
      },
    },
  },
};

export const cleanResults: PipelineStage = {
  $project: {
    author: {
      password: 0,
      refreshTokens: 0,
      isGoogleUser: 0,
      __v: 0,
    },
    comments: 0,
  },
};
