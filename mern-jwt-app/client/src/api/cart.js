import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

// 1. Add item to cart (POST)
export const addToCart = async (productId, quantity) => {
  // FIX: Using 'jwtToken' key
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const body = { productId, quantity };
  const response = await axios.post(API_URL, body, config);
  return response.data;
};

// 2. Get user's cart (GET)
export const getCart = async () => {
  // FIX: Using 'jwtToken' key
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// 3. Update item quantity (PUT)
export const updateCartItem = async (productId, quantity) => {
  // FIX: Using 'jwtToken' key
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const body = { quantity }; // PUT request to /api/cart/:productId
  const response = await axios.put(`${API_URL}/${productId}`, body, config);
  return response.data;
};

// 4. Remove item from cart (DELETE)
export const removeFromCart = async (productId) => {
  // FIX: Using 'jwtToken' key
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }; // DELETE request to /api/cart/:productId

  const response = await axios.delete(`${API_URL}/${productId}`, config);
  return response.data;
};
