// server/server.js

const path = require("path");

// 1. Load .env from the current folder
require("dotenv").config();

const mongoose = require("mongoose");

// 2. Import app.js (Your Express Setup)
// Ensure this points to where your app.js actually is (root or src)
const app = require("./app");

// 3. Import Routes (NEW STEP)
// This expects a file at server/routes/products.js
const productRoutes = require("./routes/products");

// Database Connection
const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);

    // Validating URI before connecting
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is undefined. Check your .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// 4. Connect to Database
connectDB();

// 5. Connect the Product Routes (NEW STEP)
// This makes http://localhost:5000/api/products available
app.use("/api/products", productRoutes);

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
