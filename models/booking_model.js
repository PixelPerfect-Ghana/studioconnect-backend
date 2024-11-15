
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "cancelled"], 
    default: "pending" 
  }
});

export default mongoose.model("Booking", bookingSchema);
