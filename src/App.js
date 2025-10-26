// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// Components
import Home from "./components/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import UserProfile from "./components/Profile/UserProfile";
import OrderHistory from "./components/Order/OrderHistory";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Admin/Dashboard";

function AppContent() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // state chờ load user
  const navigate = useNavigate();
  const location = useLocation();

  // Load user từ localStorage khi AppContent mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoadingUser(false); // đã load xong
  }, []);

  // Login handler
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    if (userData.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userCart");
    setUser(null);
    navigate("/");
  };

  const handleUserUpdate = (updatedUserData) => {
    setUser(updatedUserData);
  };

  // Add to cart logic
  const handleAddToCart = (product) => {
    if (!user || !product?.id) return false;

    try {
      const currentCart = JSON.parse(localStorage.getItem("userCart") || "[]");
      const existingIndex = currentCart.findIndex(
        (item) => item.product_id === product.id
      );

      let updatedCart;
      if (existingIndex > -1) {
        updatedCart = currentCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...currentCart,
          {
            cart_item_id: Date.now(),
            user_id: user.id,
            product_id: product.id,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem("userCart", JSON.stringify(updatedCart));
      return true;
    } catch (err) {
      console.error("Error updating cart:", err);
      return false;
    }
  };

  // Show loader khi đang load user
  if (loadingUser) {
    return (
      <div
        style={{ textAlign: "center", marginTop: "50px", fontSize: "1.2rem" }}
      >
        Đang tải thông tin người dùng...
      </div>
    );
  }

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <Home
            user={user}
            onLogout={handleLogout}
            onAddToCart={handleAddToCart}
          />
        }
      />

      {/* Product details */}
      <Route
        path="/product/:id"
        element={<ProductDetails user={user} onAddToCart={handleAddToCart} />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          !user ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" replace />}
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          user ? (
            <UserProfile user={user} onUserUpdate={handleUserUpdate} />
          ) : (
            <Navigate to="/login" replace state={{ from: "/profile" }} />
          )
        }
      />

      {/* Orders */}
      <Route
        path="/orders"
        element={
          user ? (
            <OrderHistory user={user} />
          ) : (
            <Navigate to="/login" replace state={{ from: "/orders" }} />
          )
        }
      />

      {/* Cart */}
      <Route
        path="/cart"
        element={
          user ? (
            <Cart user={user} />
          ) : (
            <Navigate to="/login" replace state={{ from: "/cart" }} />
          )
        }
      />

      {/* Checkout */}
      <Route
        path="/checkout"
        element={
          user ? (
            <Checkout user={user} />
          ) : (
            <Navigate to="/login" replace state={{ from: "/checkout" }} />
          )
        }
      />

      {/* Admin dashboard */}
      <Route
        path="/admin/*"
        element={
          user && user.role === "admin" ? (
            <Dashboard />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// App wrapper
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
