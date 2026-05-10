import { User } from "../models/user.js";

// GET USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: "INTERNAL SERVER ERROR",
    });
  }
};

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    return res.status(201).json({
      success: true,
      msg: "User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: "INTERNAL SERVER ERROR",
    });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { email } = req.body;

    const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      msg: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: "INTERNAL SERVER ERROR",
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    await User.deleteOne({ email });

    return res.status(200).json({
      success: true,
      msg: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: "INTERNAL SERVER ERROR",
    });
  }
};
