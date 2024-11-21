import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    role: { type: String, default: "user", enum: ["user", "vendor"] },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
