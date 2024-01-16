import env from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import bodyParser from "body-parser";
import postsRouter from "./routers/postsRouter";
import userRouter from "./routers/userRouter";
import authMiddleware from "./common/auth_middleware";
import morgan from "morgan";
import { getAuthRouter } from "./routers/authRouter";
import { OAuth2Client } from "google-auth-library";

interface AppConfig {
  oAuthClientMock?: Partial<OAuth2Client>;
}

env.config();

const initApp = (config: AppConfig = {}): Promise<Express> =>
  new Promise<Express>(async (resolve) => {
    const db = mongoose.connection;
    const url = process.env.DB_URL;

    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));

    if (!url) {
      throw new Error("DB_URL is not defined");
    }

    await fs.mkdir(path.resolve("public", "images"), { recursive: true });
    await fs.mkdir(path.resolve("public", "images", "profiles"));
    await fs.mkdir(path.resolve("public", "images", "posts"));

    mongoose.connect(url).then(() => {
      const app = express();

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.use(morgan("tiny"));

      app.use("/public", express.static("public"));

      app.use("/auth", getAuthRouter(config?.oAuthClientMock));

      app.use(authMiddleware);

      app.use("/posts", postsRouter);

      app.use("/users", userRouter);

      resolve(app);
    });
  });

export default initApp;
