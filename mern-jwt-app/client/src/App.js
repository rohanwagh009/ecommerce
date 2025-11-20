import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart"; // 1. Import Cart
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* Protected Home Route */}
          <ProtectedRoute exact path="/" component={Home} />

          {/* Protected Product Details Route */}
          <ProtectedRoute path="/product/:id" component={ProductDetails} />

          {/* Protected Cart Route - ADDED THIS */}
          <ProtectedRoute path="/cart" component={Cart} />

          {/* Public Routes */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
