import express from "express";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";

//config
const app = express();
const port = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);
connectDb();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/images", express.static(path.join(__direname, "public", "images")));

//routes
app.use("/api/auth", authRouter);
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
