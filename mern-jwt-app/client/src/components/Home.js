import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/products";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    history.push(`/product/${productId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Use 'jwtToken' for consistency
    history.push("/login");
  };

  if (loading) {
    return (
      <div className="loading-container">
                <h2>Loading products...</h2>     {" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
                <h2>{error}</h2>       {" "}
        <button onClick={fetchProducts}>Retry</button>     {" "}
      </div>
    );
  }

  return (
    <div className="home-container">
           {" "}
      <div
        className="home-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          // CRITICAL: Ensure items are vertically centered in the header
          alignItems: "center",
          // Added padding/margin reset to fight external CSS
          padding: "10px 0",
          margin: "0",
        }}
      >
        {/* Title Block */}       {" "}
        <div className="header-title-block" style={{ margin: 0, padding: 0 }}>
          {/* CRITICAL: Force margin/padding reset on the text container */}   
                <h1>Our Products</h1>         {" "}
          <p>Browse through our amazing collection</p>       {" "}
        </div>
        {/* Navigation Wrapper (Cart + Logout) */}       {" "}
        <div
          className="home-nav"
          style={{ display: "flex", gap: "15px", alignItems: "center" }}
        >
          {/* Cart Button */}
          <button
            className="cart-btn"
            onClick={() => history.push("/cart")}
            style={{
              padding: "10px 15px",
              background: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🛒 View Cart
          </button>
          {/* Existing Logout Button */}           {" "}
          <button
            className="logout-btn"
            onClick={handleLogout}
            style={{ padding: "10px 15px", borderRadius: "4px" }}
          >
                          Logout            {" "}
          </button>
        </div>
             {" "}
      </div>
      {/* Horizontal Rule below the header */}
      <hr
        style={{ width: "100%", border: "0.5px solid #eee", margin: "20px 0" }}
      />
           {" "}
      {products.length === 0 ? (
        <div className="no-products">
                    <p>No products available at the moment.</p>       {" "}
        </div>
      ) : (
        <div className="products-grid">
                   {" "}
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card" // Keep card clickable for better UX
              onClick={() => handleProductClick(product._id)}
              style={{ cursor: "pointer" }}
            >
                           {" "}
              <div className="product-image">
                               {" "}
                <img src={product.imageUrl} alt={product.name} />             {" "}
              </div>
                           {" "}
              <div className="product-info">
                                <h3>{product.name}</h3>               {" "}
                <p className="product-description">
                                    {product.description.substring(0, 80)}     
                              {product.description.length > 80 ? "..." : ""}   
                             {" "}
                </p>
                               {" "}
                <div className="product-footer">
                                   {" "}
                  <span className="product-price">
                                        ${product.price.toFixed(2)}             
                       {" "}
                  </span>
                                   {" "}
                  <span
                    className={`product-stock ${
                      product.countInStock > 0 ? "in-stock" : "out-stock"
                    }`}
                  >
                                       {" "}
                    {product.countInStock > 0
                      ? `${product.countInStock} in stock`
                      : "Out of stock"}
                                     {" "}
                  </span>
                                 {" "}
                </div>
                                {/* ADDED: Explicit View Details Button */}     
                         {" "}
                <button
                  className="view-details-btn"
                  style={{
                    marginTop: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents double-triggering the card click
                    handleProductClick(product._id);
                  }}
                >
                                    View Details                {" "}
                </button>
                               {" "}
                <span className="product-category">{product.category}</span>   
                         {" "}
              </div>
                                       {" "}
            </div>
          ))}
                 {" "}
        </div>
      )}
         {" "}
    </div>
  );
};

export default Home;
