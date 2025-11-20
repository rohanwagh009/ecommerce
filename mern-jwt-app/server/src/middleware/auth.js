const jwt = require("jsonwebtoken");
const User = require("../models/User");

// FIX: Define the secret source consistently. Must match the SECRET_SOURCE in routes/auth.js
const JWT_SECRET_SOURCE =
  process.env.JWT_SECRET || "mern-fallback-secret-12345";

// NOTE: authMiddleware must be ASYNC to use await with User.findById
const authMiddleware = async (req, res, next) => {
  let token; // 1. Extract Token from Headers

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (split "Bearer" and the token itself)
      token = req.headers.authorization.split(" ")[1]; // 2. Verify Token using the consistent secret

      const decoded = jwt.verify(token, JWT_SECRET_SOURCE); // 3. Find User & Attach to Request (CRITICAL FIX)

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found in database" });
      }

      next(); // Authorization successful, proceed to route
    } catch (err) {
      console.error("JWT Verification Failed:", err);
      return res
        .status(401)
        .json({ message: "Not authorized, token failed or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

// NOTE: isAdmin is fine as it relies on req.user being attached by authMiddleware
const isAdmin = (req, res, next) => {
  // This function will now work correctly because req.user is an attached Mongoose document
  User.findById(req.user._id)
    .then((user) => {
      if (user && user.isAdmin) {
        // Assuming 'isAdmin' boolean based on previous context
        next();
      } else {
        res
          .status(403)
          .json({ message: "Access denied: Not an administrator" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

// Exporting both
module.exports = { authMiddleware, isAdmin };
