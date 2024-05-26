import mongoose, { Schema } from "mongoose";


const eventSchema = new Schema({
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    thumbnail: {
      type: String,
    },
    orderBy: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  });

export const Event = mongoose.model("Event", eventSchema);