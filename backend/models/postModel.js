import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timeStamps: true }
);

const postModel = mongoose.models.post || mongoose.model("post", postSchema);

export default postModel;
