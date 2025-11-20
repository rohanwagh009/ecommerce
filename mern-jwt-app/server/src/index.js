const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const app = require("./app");

const connectDB = async () => {
  try {
    // 1. DEBUG LOG: Print the URI to the terminal
    console.log("---------------------------------------------------");
    console.log("ATTEMPTING TO CONNECT TO:", process.env.MONGO_URI);
    console.log("---------------------------------------------------");

    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is undefined. The .env file is not being read."
      );
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
