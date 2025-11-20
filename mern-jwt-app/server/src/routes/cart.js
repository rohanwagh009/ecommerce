const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// FIX: Importing the correct function name, 'authMiddleware'
const { authMiddleware } = require("../middleware/auth");

// @route   GET /cart
// @desc    Get the logged-in user's cart
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Find the cart for the current user and populate product details (name, price, image)
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.json({ items: [] }); // Return empty if no cart exists yet
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST /cart
// @desc    Add item to cart
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // 1. Check if the cart exists for this user
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
      return res.status(201).json(cart);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists in cart -> Update quantity
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      // Product not in cart -> Add new item
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===================================================================
// NEW: UPDATE QUANTITY ROUTE (PUT)
// ===================================================================
// @route   PUT /cart/:productId
// @desc    Update item quantity (required for the input field)
// @access  Private
router.put("/:productId", authMiddleware, async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === req.params.productId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      await cart.save();

      // Re-populate and send back full data
      const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product"
      );
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ===================================================================
// NEW: REMOVE ITEM ROUTE (DELETE)
// ===================================================================
// @route   DELETE /cart/:productId
// @desc    Remove item from cart
// @access  Private
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item whose ID matches the URL parameter
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    // Re-populate and send back the updated cart
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
