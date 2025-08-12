import User from "../models/User.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get single user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// ✅ Get books by User ID
export const getBooksByUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    // find books where `owner` equals the user id
    const books = await Book.find({ owner: id }).populate(
      "owner",
      "username email"
    );

    // return books (empty array if none)
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};
