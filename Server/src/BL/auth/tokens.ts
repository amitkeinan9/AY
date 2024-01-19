import { IUser } from "../../models/userModel";
import jwt, { Secret } from "jsonwebtoken";

export const createTokens = async (user: IUser) => {
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET as Secret,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  const refreshToken = jwt.sign(
    { _id: user._id, random: Math.random() },
    process.env.JWT_REFRESH_SECRET as Secret
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const updateRefreshToken = async (
  user: IUser,
  refreshToken: string,
  oldRefreshToken?: string
) => {
  if (user.refreshTokens == null) {
    user.refreshTokens = [refreshToken];
  } else {
    user.refreshTokens.push(refreshToken);
  }

  if (oldRefreshToken) {
    user.refreshTokens = user.refreshTokens.filter(
      (t) => t !== oldRefreshToken
    );
  }

  await user.save();
};

export const revokeRefreshToken = async (user: IUser, refreshToken: string) => {
  user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
  await user.save();
};

export const resetRefreshTokens = async (user: IUser) => {
  user.refreshTokens = [];
  await user.save();
};
