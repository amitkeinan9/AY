import express from "express";
import authController from "../controllers/auth_controller";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google", authController.getGoogleLogin());
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;
