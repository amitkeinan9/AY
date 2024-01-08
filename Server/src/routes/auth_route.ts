import express from "express";
import authController from "../controllers/auth_controller";
import { OAuth2Client } from "google-auth-library";

export const getAuthRouter = (oauth2ClientMock?: Partial<OAuth2Client>) => {
  const router = express.Router();

  const oauth2Client: OAuth2Client = oauth2ClientMock
    ? (oauth2ClientMock as OAuth2Client)
    : new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "postmessage"
      );

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/google", authController.getGoogleLogin(oauth2Client));
  router.get("/logout", authController.logout);
  router.get("/refresh", authController.refresh);

  return router;
};
