import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    additionalInformation: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    studio: { type: Schema.Types.ObjectId, ref: "Studio", required: true },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model("Booking", bookingSchema);
