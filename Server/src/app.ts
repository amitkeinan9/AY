import env from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoute from "./routes/auth_route";
import authMiddleware from "./common/auth_middleware";

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

      app.use("/auth", authRoute);

      resolve(app);
    });
  });

export default initApp;
