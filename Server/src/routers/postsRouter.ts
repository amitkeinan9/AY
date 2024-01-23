import express from "express";
import {
  deletePost,
  getAllPosts,
  getOwnPosts,
  getPost,
  saveComment,
  saveNewPost,
} from "../controllers/postsController";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", saveNewPost);
router.get("/own", getOwnPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
router.post("/:id/comments", saveComment);

export default router;
