import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
/** @type {typeof mongoose | undefined} */
export let dbInstance = undefined;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );
    dbInstance = connectionInstance;
    console.log(
      `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export {connectDB};
