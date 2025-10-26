// Dashboard.jsx
// Admin Dashboard (responsive) — hamburgermenu fixes
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserManager from "./UserManager";
import ProductManager from "./ProductManager";
import OrderManager from "./OrderManager";
import { FaBars } from "react-icons/fa";

// simple hamburger svg (or use any icon library)

function Dashboard() {
  const [tab, setTab] = useState("users");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // close menu on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  // close menu on route change / tab change
  useEffect(() => setMenuOpen(false), [tab]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const goToProductList = () => {
    navigate("/");
  };

  // helper check admin role from stored user (if any)
  const currentUserRaw = localStorage.getItem("user");
  let currentUser = null;
  try {
    currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;
  } catch (e) {
    currentUser = null;
  }
  const isAdmin = currentUser?.role === "admin";

  return (
    <div
      style={{
        backgroundColor: "#f9fff9", // pale green background
        minHeight: "100vh",
        fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          backgroundColor: "#c8f7c5",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 1200,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 18, color: "#2d6a4f" }}>
                Admin Dashboard
              </h1>
              <div style={{ fontSize: 12, color: "#325a3a" }}>
                Quản trị hệ thống
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: desktop nav (hidden on small screens via CSS below) */}
        <nav
          className="desktop-nav"
          style={{ display: "flex", gap: 10, alignItems: "center" }}
        >
          <button
            onClick={() => setTab("users")}
            className="nav-btn"
            style={tab === "users" ? styles.activeNavBtn : styles.navBtn}
          >
            👤 Quản lý User
          </button>

          <button
            onClick={() => setTab("products")}
            className="nav-btn"
            style={tab === "products" ? styles.activeNavBtn : styles.navBtn}
          >
            📦 Quản lý Sản phẩm
          </button>

          <button
            onClick={() => setTab("orders")}
            className="nav-btn"
            style={tab === "orders" ? styles.activeNavBtn : styles.navBtn}
          >
            🧾 Quản lý Đơn hàng
          </button>

          {isAdmin && (
            <button
              onClick={goToProductList}
              className="nav-btn"
              style={styles.navBtn}
            >
              🌐 Xem sản phẩm
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              ...styles.navBtn,
              backgroundColor: "#ff6b6b",
              color: "#fff",
              border: "none",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#e63946")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#ff6b6b")
            }
          >
            🚪 Đăng xuất
          </button>
        </nav>

        {/* Hamburger (only shows on small screens via CSS) */}
        <div
          className="hamburger"
          style={{ display: "none", position: "relative" }}
          ref={menuRef}
        >
          <button
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Open menu"
            style={{
              background: "#2d6a4f",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <FaBars size={22} color="#fff" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <>
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  background: "#fff",
                  border: "1px solid #e6f1ea",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                  borderRadius: 8,
                  overflow: "hidden",
                  zIndex: 1300,
                  minWidth: 180,
                }}
              >
                <button
                  onClick={() => setTab("users")}
                  style={dropdownItemStyle}
                >
                  👤 Quản lý User
                </button>
                <button
                  onClick={() => setTab("products")}
                  style={dropdownItemStyle}
                >
                  📦 Quản lý Sản phẩm
                </button>
                <button
                  onClick={() => setTab("orders")}
                  style={dropdownItemStyle}
                >
                  🧾 Quản lý Đơn hàng
                </button>
                {isAdmin && (
                  <button onClick={goToProductList} style={dropdownItemStyle}>
                    🌐 Xem sản phẩm
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    ...dropdownItemStyle,
                    color: "#fff",
                    background: "#e63946",
                  }}
                >
                  🚪 Đăng xuất
                </button>
              </div>

              {/* optional overlay to dim rest of page (closes menu on click) */}
              <div
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 1100,
                  background: "transparent",
                }}
                aria-hidden
              />
            </>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main
        style={{
          padding: "24px",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          margin: "20px auto",
          width: "95%",
          maxWidth: 1200,
          boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
        }}
      >
        {tab === "users" && <UserManager />}
        {tab === "products" && <ProductManager />}
        {tab === "orders" && <OrderManager />}
      </main>

      {/* Responsive CSS */}
      <style>{`
        /* Hide desktop-nav on small screens and show hamburger */
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }

        /* On larger screens hide hamburger */
        @media (min-width: 901px) {
          .hamburger { display: none !important; }
        }

        /* button reset to remove default focus outline but keep accessibility */
        button:focus { outline: 2px solid rgba(46,125,50,0.25); outline-offset: 2px; }
      `}</style>
    </div>
  );
}

// styles used in JSX
const styles = {
  navBtn: {
    backgroundColor: "#ffffff",
    color: "#2d6a4f",
    border: "1px solid #2d6a4f",
    borderRadius: 8,
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: 600,
  },
  activeNavBtn: {
    backgroundColor: "#2d6a4f",
    color: "#ffffff",
    border: "1px solid #2d6a4f",
    borderRadius: 8,
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: 700,
  },
};

const dropdownItemStyle = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "10px 14px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#2d6a4f",
  fontWeight: 600,
};

export default Dashboard;
