import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { registerUser } from "../api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser(formData);

      // If backend returns a token on register, login immediately
      if (data.token) {
        login(data.token);
        history.push("/"); // Redirect to Home
      } else {
        history.push("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  // Styles object for clean code
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "20px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#007BFF", // Blue color
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    error: {
      color: "red",
      backgroundColor: "#ffe6e6",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    link: {
      color: "#007BFF",
      cursor: "pointer",
      textDecoration: "underline",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <span onClick={() => history.push("/login")} style={styles.link}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
