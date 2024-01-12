import express from "express";
import { getUserData } from "../controllers/userController";

const router = express.Router();

router.get("/", getUserData);

export default router;
