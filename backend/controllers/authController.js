import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ................register ................... */
const register = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const {
      firstName,
      lastName,
      location,
      occupation,
      email,
      password,
      friends,
    } = req.body;
    const picturePath = req.file ? req.file.path : null;
    console.log(picturePath);
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      location,
      occupation,
      email,
      password: hashPassword,
      friends,
      picturePath,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
/* ...........login ....................... */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user do not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credential" });
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ success: true,  message: "Login successful",token: jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { register, login };
