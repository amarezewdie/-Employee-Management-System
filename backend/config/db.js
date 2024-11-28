import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONG_URL);
    console.log("db connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDb;
