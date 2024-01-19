import env from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import fsProm from "fs/promises";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import postsRouter from "./routers/postsRouter";
import userRouter from "./routers/userRouter";
import validateAuth from "./middlewares/validateAuth";
import morgan from "morgan";
import { getAuthRouter } from "./routers/authRouter";
import { OAuth2Client } from "google-auth-library";
import { errorHandler } from "./middlewares/errorMiddleware";

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

    if (!fs.existsSync(path.resolve("public", "images"))) {
      await fsProm.mkdir(path.resolve("public", "images"), { recursive: true });
      await fsProm.mkdir(path.resolve("public", "images", "profiles"));
      await fsProm.mkdir(path.resolve("public", "images", "posts"));
    }

    mongoose.connect(url).then(() => {
      const app = express();

      app.use(bodyParser.json({ limit: "30mb" }));
      app.use(bodyParser.urlencoded({ extended: true }));

      app.use(morgan("tiny"));

      app.use("/public", express.static("public"));

      app.use("/auth", getAuthRouter(config?.oAuthClientMock));

      app.use(validateAuth);

      app.use("/posts", postsRouter);

      app.use("/users", userRouter);

      app.use(errorHandler);

      resolve(app);
    });
  });

export default initApp;
