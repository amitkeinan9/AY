import { JwtPayload, Secret } from "jsonwebtoken";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import User, { IUser } from "../../models/userModel";
import { BadRequestError } from "../../errors/BadRequestError";
import { createTokens, resetRefreshTokens, updateRefreshToken } from "./tokens";
import { TokenPair } from "./types";
import { jwtVerify } from "../../utils/jwtPromises";

export const refreshAccessTokens = async (
  refreshToken: string
): Promise<TokenPair> => {
  if (!refreshToken) {
    throw new BadRequestError("Missing Authorization header");
  }

  const userInfo = (await jwtVerify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as Secret
  )) as JwtPayload;

  const userId: string = (userInfo as JwtPayload)._id;
  const user: IUser = await User.findById(userId);

  if (!user) {
    throw new UnauthorizedError("Could not find user");
  }

  if (!user.refreshTokens?.includes(refreshToken)) {
    console.log("Refresh token doesn't exist, clearing all tokens");

    await resetRefreshTokens(user);
    throw new UnauthorizedError("Unknown refresh token");
  }

  const { accessToken, refreshToken: newRefreshToken } = await createTokens(
    user
  );
  await updateRefreshToken(user, newRefreshToken, refreshToken);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
