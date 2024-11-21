import {
  loginUserValidator,
  registerUserValidator,
  updateProfileValidator,
} from "../validators/user_validator.js";
import { UserModel } from "../models/user_models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// import {mailTransporter} from "../utils/email.js";
export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const existingUser = await UserModel.findOne({ email: value.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 10);

    await UserModel.create({
      ...value,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { error, value } = loginUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const user = await UserModel.findOne({ email: value.email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    //compare their passwords
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    //sign a token for the user
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "48h" }
    );
    //respond to request
    res.status(200).json({
      message: "User logged in successfully!",
      accessToken: token,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    // find authenticated usedr from database
    const user = await UserModel.findById(req.auth.id).select({
      password: false,
    });
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }
    // Respond to request
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  res.status(200).json({ message: "User logged out successfully!" });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { error, value } = updateProfileValidator.validate({
      ...req.body,
      avatar: req.file?.filename,
    });
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    const user = await UserModel.findByIdAndUpdate(req.auth.id, value, {
      new: true,
      runValidators: true,
    }).select({ password: false });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User profile updated successfully", user });
  } catch (error) {
    next(error);
  }
};
