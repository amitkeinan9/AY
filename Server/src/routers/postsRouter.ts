import express from "express";
import {
  getAllPosts,
  getOwnPosts,
  getPost,
  saveNewPost,
} from "../controllers/postsController";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", saveNewPost);
router.get("/own", getOwnPosts);
router.get("/:id", getPost);

export default router;
