import express from "express";
import { editUser, getCurrentUserData } from "../controllers/userController";

const router = express.Router();

router.get("/me", getCurrentUserData);
router.put("/me", editUser);

export default router;
