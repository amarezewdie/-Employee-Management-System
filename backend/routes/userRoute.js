import { Router } from "express";
import authMiddleware from "../middleware/authMiddlewre.js";
import { addRemoveFriends, getUser, getUserFriends } from "../controllers/userController.js";

const userRouter=Router();
 
// get user
userRouter.get('/get/:id',authMiddleware,getUser)
//get friends
userRouter.get('/get/:id/friends',authMiddleware,getUserFriends)

//update friend
userRouter.patch('/update/:id/:friendId',authMiddleware,addRemoveFriends)

export default userRouter;