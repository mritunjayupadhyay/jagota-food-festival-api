import { app } from "./app.js";
import { connectDB } from "./db/mongoose.connection.js";

const startServer = () => {
  app.listen(8000, () => {
      console.log("⚙️  Server is running on port: " + 8000);
    });
};

try {
    await connectDB();
    startServer();
  } catch (err) {
    console.log("connect error: ", err);
  }