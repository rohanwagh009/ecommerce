import React, { useEffect, useState } from "react";
import { getCart, updateCartItem, removeFromCart } from "../api/cart";
import { useHistory } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory(); // Fetch cart on component mount

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart. Please ensure you are logged in.");
      setLoading(false);
    }
  }; // Handler for Quantity Change (Increase/Decrease)

  const handleQuantityChange = async (productId, newQuantity) => {
    // Only allow positive quantities
    if (newQuantity < 1) return;

    try {
      // Optimistic UI update for perceived speed
      const updatedItems = cart.items.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCart({ ...cart, items: updatedItems }); // Call the API

      const updatedCart = await updateCartItem(productId, newQuantity);
      setCart(updatedCart); // Sync state with server response
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Could not update quantity. Please try again.");
      loadCart(); // Revert on error
    }
  }; // Handler for Remove Item

  const handleRemove = async (productId) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    try {
      const updatedCart = await removeFromCart(productId);
      setCart(updatedCart);
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Could not remove item.");
    }
  };

  if (loading)
    return (
      <div className="cart-container">
                <h2>Loading Cart...</h2>     {" "}
      </div>
    );
  if (error)
    return (
      <div className="cart-container">
                <h2>{error}</h2>     {" "}
      </div>
    );

  const cartItems = cart ? cart.items : []; // Calculate Total Price

  const totalPrice = cartItems.reduce((acc, item) => {
    // Ensure item.product exists before accessing price
    return acc + (item.product?.price || 0) * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty-cart">
                <h2>Your cart is empty</h2>       {" "}
        <p>Looks like you haven't added anything to your cart yet.</p>       {" "}
        <button
          className="checkout-btn"
          onClick={() => history.push("/")}
          style={{ marginTop: "20px" }}
        >
                    Start Shopping        {" "}
        </button>
             {" "}
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* NEW: Home/Continue Shopping Button */}
      <button
        onClick={() => history.push("/")}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: "#555",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ⬅️ Continue Shopping
      </button>
            <h1>Shopping Cart ({cartItems.length} items)</h1>     {" "}
      <table className="cart-table">
               {" "}
        <thead>
                   {" "}
          <tr>
                        <th>Product</th>            <th>Price</th>           {" "}
            <th>Quantity</th>            <th>Subtotal</th>           {" "}
            <th>Action</th>         {" "}
          </tr>
                 {" "}
        </thead>
               {" "}
        <tbody>
                   {" "}
          {cartItems.map((item) => (
            <tr key={item.product._id}>
                           {" "}
              <td data-label="Product">
                               {" "}
                <div className="item-info">
                                   {" "}
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80";
                    }}
                  />
                                   {" "}
                  <div>
                                        <strong>{item.product.name}</strong>   
                                   {" "}
                    <p style={{ fontSize: "0.85rem", color: "#666" }}>
                                            {item.product.category}             
                           {" "}
                    </p>
                                     {" "}
                  </div>
                                 {" "}
                </div>
                             {" "}
              </td>
                            <td>${item.product.price.toFixed(2)}</td>           
               {" "}
              <td>
                                {/* Quantity Input linked to handler */}
                               {" "}
                <input
                  type="number"
                  className="qty-input"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.product._id,
                      parseInt(e.target.value)
                    )
                  }
                />
                             {" "}
              </td>
                           {" "}
              <td>${(item.product.price * item.quantity).toFixed(2)}</td>       
                   {" "}
              <td>
                                {/* Remove Button linked to handler */}         
                     {" "}
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.product._id)}
                >
                                    Remove                {" "}
                </button>
                             {" "}
              </td>
                         {" "}
            </tr>
          ))}
                 {" "}
        </tbody>
             {" "}
      </table>
           {" "}
      <div className="cart-summary">
               {" "}
        <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>     
         {" "}
        <button
          className="checkout-btn"
          onClick={() => alert("Checkout functionality coming soon!")}
        >
                    Proceed to Checkout        {" "}
        </button>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Cart;
