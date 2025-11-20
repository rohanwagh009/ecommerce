import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Simple Home Component (Placeholder for your Product List)
const Home = () => {
  return <h1>Welcome to the Home Page! (Products coming soon)</h1>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* FIX: Instead of redirecting to login, show the Home component */}
          <ProtectedRoute exact path="/" component={Home} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
