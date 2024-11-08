
import mongoose from 'mongoose';
import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const StudioSchema = new Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  completed: { type: Boolean, default: false },
  description: String,
  category: String,
  location: String,
  googleId: String,
  facebookId: String,
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessions: [
    {
      type: String,
      date: Date,
      time: String,
      location: String,
      clients: [
        {
          name: String,
          phone: String
        }
      ]
    }
  ],
  payment: {
    method: String,
    date: Date,
    amount: Number,
    balance: Number
  },
  images: [
    {
      id: String,
      session: { type: String, id: String },
      type: String,
      size: Number,
      resolution: String
    }
  ]
}, { timestamps: true });

StudioSchema.index({ title: 'text', description: 'text', category: 'text', location: 'text' });
StudioSchema.plugin(toJSON);

export const StudioModel = model('studio', StudioSchema);
