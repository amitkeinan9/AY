import express from "express";
import { getCurrentUserData } from "../controllers/userController";

const router = express.Router();

router.get("/me", getCurrentUserData);
export default router;
