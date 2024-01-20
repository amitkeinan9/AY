import express from "express";
import {
  getAllPosts,
  getOwnPosts,
  saveNewPost,
} from "../controllers/postsController";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", saveNewPost);
router.get("/own", getOwnPosts);

export default router;
