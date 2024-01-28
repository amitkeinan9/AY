import { BadRequestError } from "../../errors/BadRequestError";
import { ConflictError } from "../../errors/ConflictError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import User, { IUser } from "../../models/userModel";
import { createTokens, updateRefreshToken } from "./tokens";
import { TokenPairWithId } from "./types";
import bcrypt from "bcrypt";

export const loginUser = async (
  email: string,
  password: string
): Promise<TokenPairWithId> => {
  if (!email || !password) {
    throw new BadRequestError("missing email or password");
  }

  const user = await User.findOne({ email: email });
  if (user === null) {
    throw new UnauthorizedError("email or password incorrect");
  }

  if (user?.isGoogleUser) {
    throw new BadRequestError("Invalid login method for google user");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UnauthorizedError("email or password incorrect");
  }

  const tokens = await createTokens(user);
  await updateRefreshToken(user, tokens.refreshToken);

  return { id: user._id, ...tokens };
};

export const registerUser = async (
  email: string,
  password: string,
  username: string,
  fullName: string
): Promise<TokenPairWithId> => {
  // TODO: add username and fullname validation
  if (!email || !password) {
    throw new BadRequestError("missing required field");
  }

  const userWithEmail = await User.findOne({ email: email });
  if (userWithEmail) {
    throw new ConflictError("email already exists");
  }

  // Save the new user
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user: IUser = await User.create({
    email,
    password: encryptedPassword,
    username,
    fullName,
  });

  // Login
  const tokens = await createTokens(user);
  await updateRefreshToken(user, tokens.refreshToken);

  return { id: user._id, ...tokens };
};
