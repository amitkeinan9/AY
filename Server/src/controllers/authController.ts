import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { StatusCodes } from "http-status-codes";
import { refreshAccessTokens } from "../BL/auth/refreshToken";
import { TokenPairWithId } from "../BL/auth/types";
import { loginUser, registerUser } from "../BL/auth/loginAndRegister";
import { loginWithGoogle } from "../BL/auth/googleLogin";
import { logoutUser } from "../BL/auth/logout";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const fullName = req.body.fullName;

    const tokensWithId: TokenPairWithId = await registerUser(
      email,
      password,
      username,
      fullName
    );

    res.status(StatusCodes.CREATED).json(tokensWithId);
  } catch (e) {
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const tokensWithId: TokenPairWithId = await loginUser(email, password);

    res.status(StatusCodes.OK).json(tokensWithId);
  } catch (e) {
    next(e);
  }
};

const getGoogleLogin = (oauth2Client: OAuth2Client) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.body.code;

      const tokensWithId: TokenPairWithId = await loginWithGoogle(oauth2Client, code);

      res.status(StatusCodes.OK).json(tokensWithId);
    } catch (e) {
      next(e);
    }
  };
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  try {
    await logoutUser(refreshToken);

    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    next(e);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  try {
    const newTokensWithId = await refreshAccessTokens(refreshToken);

    res.status(StatusCodes.OK).json(newTokensWithId);
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  logout,
  refresh,
  getGoogleLogin,
};
