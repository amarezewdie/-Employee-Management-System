import { Router } from "express";
import { createPost, getFeedPost, getUserPost, likePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddlewre.js";
import upload from "../middleware/upload.js";


const postRouter=Router();
//create
postRouter.post("/create",authMiddleware,upload,createPost)
//get all post
  postRouter.get('/feed',authMiddleware,getFeedPost);
  //get single post
  postRouter.get("/:id/post",authMiddleware,getUserPost);

  //update
  postRouter.patch("/:id/like",authMiddleware,likePost);


export default postRouter;
