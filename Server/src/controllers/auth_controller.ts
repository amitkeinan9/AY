import { Request, Response } from "express";
import User, { IUser } from "../models/user_model";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const createTokens = async (user: IUser) => {
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET as Secret,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_REFRESH_SECRET as Secret
  );
  if (user.refreshTokens == null) {
    user.refreshTokens = [refreshToken];
  } else {
    user.refreshTokens.push(refreshToken);
  }
  await user.save();

  return {
    accessToken,
    refreshToken,
  };
};

const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send("Invalid email or password");
  }
  try {
    const rs = await User.findOne({ email: email });
    if (rs != null) {
      return res.status(406).send("email already exists");
    }

    // Save the new user
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user: IUser = await User.create({
      email: email,
      password: encryptedPassword,
    });

    // Login
    const tokens = await createTokens(user);

    return res.status(200).json(tokens);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send("missing email or password");
  }

  try {
    const user = await User.findOne({ email: email });
    if (user == null) {
      return res.status(401).send("email or password incorrect");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("email or password incorrect");
    }

    const tokens = await createTokens(user);

    return res.status(200).json(tokens);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as Secret,
    async (err: any, userInfo: any) => {
      if (err) return res.status(401).send(err.message);

      try {
        const userId = userInfo._id;
        const userDb = await User.findById(userId);

        if (!userDb) return res.status(401);
        if (!userDb.refreshTokens?.includes(refreshToken)) {
          userDb.refreshTokens = [];
          await userDb.save();
          return res.sendStatus(401);
        } else {
          userDb.refreshTokens = userDb.refreshTokens.filter(
            (t) => t !== refreshToken
          );
          await userDb.save();
          return res.sendStatus(200);
        }
      } catch (err: any) {
        res.sendStatus(401).send(err.message);
      }
    }
  );
};

const refresh = async (req: Request, res: Response) => {
  const authHeader = req.get("Authorization");
  const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (refreshToken == null) return res.sendStatus(401);
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as Secret,
    async (err: any, userInfo: any) => {
      if (err) return res.sendStatus(401);

      try {
        const userId = userInfo._id;
        const userDb = await User.findById(userId);
        if (!userDb) return res.status(401);
        if (!userDb.refreshTokens?.includes(refreshToken)) {
          userDb.refreshTokens = [];
          await userDb.save();
          return res.sendStatus(401);
        }

        const newAccessToken = jwt.sign(
          { _id: userDb._id },
          process.env.JWT_SECRET as Secret,
          { expiresIn: process.env.JWT_EXPIRATION }
        );
        const newRefreshToken = jwt.sign(
          { _id: userDb._id },
          process.env.JWT_REFRESH_SECRET as Secret
        );

        userDb.refreshTokens = userDb.refreshTokens.filter(
          (t) => t !== refreshToken
        );

        userDb.refreshTokens.push(newRefreshToken);
        await userDb.save();
        return res.status(200).send({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      } catch (err: any) {
        res.sendStatus(401).send(err.message);
      }
    }
  );
};

export default {
  register,
  login,
  logout,
  refresh,
};
