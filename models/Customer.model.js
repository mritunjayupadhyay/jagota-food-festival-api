import mongoose, { Schema } from "mongoose";
export const defaultAvatar = `https://via.placeholder.com/200x200.png`;

const shopTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  }
});

const interestSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  }
});

const customerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
    },
    salesPerson: {
      type: String,
    },
    interested_in: {
      type: [String],
    },
    shop_type: {
      type: [String],
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
    line: {
      type: String,
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ShopType = mongoose.model("ShopType", shopTypeSchema);
export const Interest = mongoose.model("Interest", interestSchema);
export const Customer = mongoose.model("Customer", customerSchema);
