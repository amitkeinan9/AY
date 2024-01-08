import env from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRouter from "./routers/authRouter";
import postsRouter from "./routers/postsRouter";
import authMiddleware from "./common/auth_middleware";
import morgan from "morgan";

env.config();

const initApp = (): Promise<Express> =>
  new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    const url = process.env.DB_URL;

    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));

    if (!url) {
      throw new Error("DB_URL is not defined");
    }

    mongoose.connect(url).then(() => {
      const app = express();

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.use(morgan("tiny"));

      app.use("/auth", authRouter);

      app.use(authMiddleware);

      app.use("/posts", postsRouter);

      resolve(app);
    });
  });

export default initApp;
