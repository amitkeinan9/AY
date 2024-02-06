import { OAuth2Client } from "google-auth-library";
import { TokenPairWithId } from "./types";
import User from "../../models/userModel";
import { BadRequestError } from "../../errors/BadRequestError";
import { createTokens, updateRefreshToken } from "./tokens";

export const loginWithGoogle = async (
  oauth2Client: OAuth2Client,
  code: string
): Promise<TokenPairWithId> => {
  const token = await oauth2Client.getToken(code);
  const loginTicket = await oauth2Client.verifyIdToken({
    idToken: token.tokens.id_token ?? "",
  });

  const payload = loginTicket.getPayload();
  let user = await User.findOne({ email: payload.email });

  if (user === null) {
    // Create new user
    user = await User.create({
      email: payload.email,
      fullName: payload.name,
      profilePic: payload.picture,
      username: payload.email.split("@")[0],
      isGoogleUser: true,
    });
  } else if (!user.isGoogleUser) {
    throw new BadRequestError("Email is already used with password");
  }

  const tokens = await createTokens(user);
  await updateRefreshToken(user, tokens.refreshToken);

  return { id: user._id, ...tokens };
};
