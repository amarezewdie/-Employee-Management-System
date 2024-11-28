import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import upload from "../middleware/upload.js";

const authRouter = Router();



authRouter.post("/register", upload, register);
authRouter.post("/login", login);
export default authRouter;
