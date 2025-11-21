import axios from "axios";

const API_URL = "https://ecommerce-backend-three-chi.vercel.app/api/auth/";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export { register as registerUser, login as loginUser, logout, getCurrentUser };
