const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); // Explicitly find .env in current folder

const mongoose = require("mongoose");

// FIX: Try to find Product model in 'src/models' if 'models' doesn't exist
const Product = require("./src/models/Product");

const products = [
  {
    name: "Wireless Headphones",
    description: "High quality noise cancelling headphones",
    price: 99.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    countInStock: 10,
  },
  {
    name: "iPhone 13",
    description: "Latest Apple smartphone with advanced dual-camera system.",
    price: 799.99,
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    category: "Electronics",
    countInStock: 5,
  },
  {
    name: "Running Shoes",
    description:
      "Comfortable running shoes for men, perfect for long distances.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Fashion",
    countInStock: 20,
  },
  {
    name: "Sony Playstation 5",
    description:
      "The ultimate home entertainment center starts with PlayStation.",
    price: 499.99,
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    category: "Electronics",
    countInStock: 3,
  },
  {
    name: "Cannon DSLR Camera",
    description: "Capture life's moments with stunning clarity.",
    price: 649.99,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category: "Electronics",
    countInStock: 8,
  },
];

const importData = async () => {
  try {
    console.log("Connecting to DB...");
    // Connect to Database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected.");

    // Clear old data
    await Product.deleteMany();
    console.log("Old data removed...");

    // Insert new data
    await Product.insertMany(products);
    console.log("Data Imported Successfully!");

    process.exit();
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};

importData();
