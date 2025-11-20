const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../middleware/auth");

// Get user details
router.get("/me", authMiddleware, userController.getUserById);

// Update user details
router.put("/me", authMiddleware, userController.updateUser);

// Delete user account
router.delete("/me", authMiddleware, userController.deleteUser);

module.exports = router;
