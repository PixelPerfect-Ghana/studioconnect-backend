import mongoose from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const StudioSchema = new Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    completed: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String },
    location: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    socials: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    paymentMethods: [{ type: String }],
    images: [{ type: String }],
  },
  { timestamps: true }
);

StudioSchema.index({
  title: "text",
  description: "text",
  category: "text",
  location: "text",
});
StudioSchema.plugin(toJSON);

export const StudioModel = model("Studio", StudioSchema);
