import express from "express";
import { getAllPosts, getOwnPosts } from "../controllers/postsController";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/own", getOwnPosts);

export default router;
