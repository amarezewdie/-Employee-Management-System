import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

const createPost = async (req, res) => {
  try {
    const { userId, picturePath, description } = req.body;
    const user = await userModel.findById(userId);
    const newPost = new postModel({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      location: user.location,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const posts = await postModel.find();
    res
      .status(201)
      .json({ success: true, message: "post created successfully", posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getFeedPost = async (req, res) => {
  try {
    const post = await postModel.find();
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await userModel.find({ userId });
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//update
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await postModel.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set({ userId: true });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({ success: true, updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getFeedPost, getUserPost, likePost, createPost };
