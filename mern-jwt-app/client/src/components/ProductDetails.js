import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../api/cart";
import { AuthContext } from "../contexts/AuthContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  // Get authentication status for conditional rendering and routing
  const { isAuthenticated } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Logic to handle Add to Cart click
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to add items to the cart!");
      history.push("/login");
      return;
    }

    try {
      setAdding(true);
      await addToCart(product._id, 1);

      // OPTIONAL: Redirect to cart after adding for smooth UX
      // alert("Item added to cart successfully!");
      history.push("/cart");

      setAdding(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item. Please try again.");
      setAdding(false);
    }
  };

  // NEW: Handler for View Cart button
  const handleViewCart = () => {
    history.push("/cart");
  };

  if (loading)
    return (
      <div className="product-details-container">
        <h2>Loading...</h2>
      </div>
    );

  if (!product)
    return (
      <div className="product-details-container">
        <h2>Product not found</h2>
      </div>
    );

  return (
    <div className="product-details-container">
      {/* Left Side: Image */}
      <div className="product-image-section">
        <img
          src={product.imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400";
          }}
        />
      </div>

      {/* Right Side: Details */}
      <div className="product-info-section">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-price">${product.price}</p>

        <div className="product-description">
          <h3>Description:</h3>
          <p>{product.description}</p>
        </div>

        {/* Buttons Container */}
        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          {/* Add to Cart Button */}
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={adding}
            style={adding ? { opacity: 0.7, cursor: "not-allowed" } : {}}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          {/* NEW: View Cart Button */}
          <button
            className="view-cart-btn"
            onClick={handleViewCart}
            // Simple styling to distinguish it from the primary action button
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🛒 View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
