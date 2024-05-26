import mongoose, { Schema } from "mongoose";
export const defaultAvatar = `https://via.placeholder.com/200x200.png`;

const shopTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  id: {
    type: String,
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
    contactPersonName: {
      type: String,
    },
    companyName: {
      type: String,
    },
    salesPerson: {
      type: String,
    },
    interested_in: {
      type: [String],
    },
    shop_type: {
      type: [Object],
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
    images: {
      type: String,
    },
    audio: {
      type: String,
    },
    attachments: {
      type: [String],
    },
    customerType: {
      type: String,
    },
    event: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ShopType = mongoose.model("ShopType", shopTypeSchema);
export const Interest = mongoose.model("Interest", interestSchema);
export const Customer = mongoose.model("Customer", customerSchema);
