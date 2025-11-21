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
    localStorage.removeItem("jwtToken");
    history.push("/login");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>✨ Loading amazing products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>😔 {error}</h2>
        <button onClick={fetchProducts}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-inner">
        <div className="home-header">
          <div className="header-title">
            <h1>Our Products</h1>
            <p>Discover amazing items at great prices</p>
          </div>

          <div className="header-actions">
            <button
              className="btn cart-btn"
              onClick={() => history.push("/cart")}
            >
              🛒 Cart
            </button>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products available at the moment.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">
                    {product.description.substring(0, 80)}
                    {product.description.length > 80 ? "..." : ""}
                  </p>

                  <div className="product-footer">
                    <span className="product-price">
                      ${product.price.toFixed(2)}
                    </span>
                    <span
                      className={`product-stock ${
                        product.countInStock > 0 ? "in-stock" : "out-stock"
                      }`}
                    >
                      {product.countInStock > 0
                        ? `${product.countInStock} left`
                        : "Out of stock"}
                    </span>
                  </div>

                  <button
                    className="view-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product._id);
                    }}
                  >
                    View Details
                  </button>

                  <span className="product-category">{product.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
