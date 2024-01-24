import express from "express";
import { editUser, getCurrentUserData } from "../controllers/userController";

const router = express.Router();

router.get("/:id", getCurrentUserData);
router.put("/:id", editUser);

export default router;
