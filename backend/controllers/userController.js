import userModel from "../models/userModel.js";

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    const friends = await Promise.all(
      user.friends.map((friendId) => userModel.findById(friendId))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, occupation, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          occupation,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const user = await userModel.findById(id);
    const friend = await userModel.findById(friendId);
    
    if (user.friends.include(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((friendId) => userModel.findById(friendId))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, occupation, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          occupation,
          picturePath,
        };
      }
    );
    res.status(200).json(formattedFriends);




  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getUser, getUserFriends, addRemoveFriends };
