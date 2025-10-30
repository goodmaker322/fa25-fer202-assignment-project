// 🌿 Home.jsx
// Trang chủ: Includes HotProducts Carousel and handles AddToCart messages
// Cập nhật: 26/10/2025 (Cập nhật Footer - Thêm bản đồ)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUserCircle,
  FaShoppingCart,
  FaBox,
  FaSignInAlt,
  FaSignOutAlt,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import ProductList from "./Product/ProductList"; // Main product list
import HotProducts from "./Product/HotProducts"; // <-- 1. IMPORT HOTPRODUCTS

// Home receives user, onLogout, onAddToCart (the core logic) from App.jsx
function Home({ user, onLogout, onAddToCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [msg, setMsg] = useState(""); // State for cart messages
  const navigate = useNavigate();

  // Navigation and menu functions
  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };
  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Wrapper function for Add to Cart (Handles Message Display)
  const handleAddToCartWrapper = (product) => {
    if (!user) {
      navigate("/login", { state: { from: "/" } });
      return;
    }
    const success = onAddToCart(product); // Call logic from App.jsx
    if (success) {
      setMsg(`✅ Đã thêm ${product.name} vào giỏ hàng!`);
    } else {
      setMsg("❌ Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại.");
    }
    setTimeout(() => setMsg(""), 3000); // Clear message
  };

  // --- Style cho các link ở Footer ---
  const footerLinkStyle = {
    display: "block",
    color: "#f9fff9",
    textDecoration: "none",
    marginBottom: "8px",
    fontSize: "0.9rem",
  };

  return (
    <div
      style={{
        backgroundColor: "#f9fff9",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        // --- 3. ADJUST LAYOUT ---
        display: "flex",
        flexDirection: "column",
        gap: "20px", // Adds space between Header, Msg, HotProducts, ProductList
        // --- END LAYOUT ADJUST ---
      }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#c8f7c5",
          borderRadius: "8px",
          padding: "15px 25px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          position: "relative",
          flexShrink: 0, // Prevent header shrinking
        }}>
        <h1
          style={{
            color: "#2d6a4f",
            margin: 0,
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => handleNavigate("/")}>
          🌿Backlink Entity
        </h1>
        <div
          className="menu-icon"
          onClick={toggleMenu}
          style={{
            display: "none",
            fontSize: "1.6rem",
            color: "#2d6a4f",
            cursor: "pointer",
          }}>
          <FaBars />
        </div>
        <nav
          className="nav-desktop"
          style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {user ? (
            <>
              <button
                className="nav-button"
                onClick={() => handleNavigate("/profile")}>
                <FaUserCircle /> Hồ sơ
              </button>
              <button
                className="nav-button"
                onClick={() => handleNavigate("/cart")}>
                <FaShoppingCart /> Giỏ hàng
              </button>
              <button
                className="nav-button"
                onClick={() => handleNavigate("/orders")}>
                <FaBox /> Đơn hàng
              </button>
              {user.role === "admin" && (
                <button
                  className="nav-button"
                  onClick={() => handleNavigate("/admin")}>
                  ⚙️ Quản lý
                </button>
              )}
              <button className="nav-button logout" onClick={handleLogout}>
                <FaSignOutAlt /> Đăng xuất
              </button>
            </>
          ) : (
            <button
              className="nav-button"
              onClick={() => handleNavigate("/login")}>
              <FaSignInAlt /> Đăng nhập
            </button>
          )}
        </nav>
        {menuOpen && (
          <div
            className="dropdown-menu"
            style={{
              position: "absolute",
              top: "70px",
              right: "20px",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              zIndex: 10,
              minWidth: "180px",
            }}>
            {user ? (
              <>
                <button
                  className="dropdown-button"
                  onClick={() => handleNavigate("/profile")}>
                  <FaUserCircle /> Hồ sơ
                </button>
                <button
                  className="dropdown-button"
                  onClick={() => handleNavigate("/cart")}>
                  <FaShoppingCart /> Giỏ hàng
                </button>
                <button
                  className="dropdown-button"
                  onClick={() => handleNavigate("/orders")}>
                  <FaBox /> Đơn hàng
                </button>
                <button
                  className="dropdown-button logout"
                  onClick={handleLogout}>
                  <FaSignOutAlt /> Đăng xuất
                </button>
              </>
            ) : (
              <button
                className="dropdown-button"
                onClick={() => handleNavigate("/login")}>
                <FaSignInAlt /> Đăng nhập
              </button>
            )}
          </div>
        )}
      </header>

      {/* --- Display Message Area --- */}
      {msg && (
        <div
          className={`cart-message ${msg.includes("Lỗi") ? "error" : ""}`}
          style={{ flexShrink: 0 }}>
          {" "}
          {/* Prevent shrinking */}
          <span>{msg}</span>
          <button onClick={() => setMsg("")}>&times;</button>
        </div>
      )}

      {/* --- 2. RENDER HOTPRODUCTS CAROUSEL --- */}
      <HotProducts />
      {/* ------------------------------------ */}

      {/* --- RENDER MAIN PRODUCT LIST --- */}
      {/* Pass the WRAPPER function down */}
      <ProductList user={user} onAddToCart={handleAddToCartWrapper} />
      {/* ----------------------------- */}

      {/* ========== FOOTER START ========== */}
      <footer
        style={{
          backgroundColor: "#2d6a4f", // Nền xanh đậm
          color: "#f9fff9", // Chữ sáng
          padding: "30px 25px",
          marginTop: "auto", // Quan trọng: Đẩy footer xuống cuối nếu trang ngắn
          borderRadius: "8px", // Giống header
          flexShrink: 0, // Ngăn co rút
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "20px",
          }}>
          {/* Cột 1: Giới thiệu */}
          <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
            <h4
              style={{
                margin: 0,
                marginBottom: "10px",
                color: "#c8f7c5", // Xanh lá nhạt
              }}>
              🌿 Backlink Entity
            </h4>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
              Chúng tôi cung cấp các giải pháp và sản phẩm thân thiện với môi
              trường, hướng tới một tương lai bền vững.
            </p>
          </div>

          {/* Cột 2: Địa chỉ công ty (ĐÃ THAY THẾ) */}
          <div style={{ flex: "1 1 250px", minWidth: "200px" }}>
            <h5
              style={{
                margin: 0,
                marginBottom: "10px",
                color: "#c8f7c5",
              }}>
              Địa chỉ công ty
            </h5>
            {/* LƯU Ý: Link 'src' bên dưới KHÔNG HỢP LỆ. 
              Bạn cần thay thế bằng link "Nhúng bản đồ" (Embed) thực tế từ Google Maps.
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.710699666518!2d105.52329867400861!3d21.01278168832957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgSMOgIE7hu5lp!5e1!3m2!1svi!2s!4v1761638306820!5m2!1svi!2s"
              width="100%" // Đã sửa (để vừa cột)
              height="200" // Đã sửa (chiều cao hợp lý)
              style={{ border: 0, borderRadius: "8px" }} // Đã sửa cú pháp
              allowFullScreen={true} // Đã sửa cú pháp
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" // Đã sửa cú pháp
            ></iframe>
          </div>

          {/* Cột 3: Theo dõi */}
          <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
            <h5
              style={{
                margin: 0,
                marginBottom: "10px",
                color: "#c8f7c5",
              }}>
              Thông tin liên hệ
            </h5>
            <a
              href="https://www.whatsapp.com"
              style={footerLinkStyle}
              className="footer-link"
              target="_blank" // Thêm target="_blank" để mở link ở tab mới
              rel="noopener noreferrer" // Bảo mật khi dùng target="_blank"
            >
              <FaWhatsapp /> _Hotline: 0912345678
            </a>
            <a
              href="https://www.facebook.com"
              style={footerLinkStyle}
              className="footer-link"
              target="_blank" // Thêm target="_blank" để mở link ở tab mới
              rel="noopener noreferrer" // Bảo mật khi dùng target="_blank"
            >
              <FaFacebook /> _Facebook
            </a>
            <a
              href="https://www.instagram.com"
              style={footerLinkStyle}
              className="footer-link"
              target="_blank" // Thêm target="_blank" để mở link ở tab mới
              rel="noopener noreferrer" // Bảo mật khi dùng target="_blank"
            >
              <FaInstagram />
              _Instagram
            </a>
          </div>
        </div>

        {/* Dòng Copyright */}
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid #4a7c65", // Border màu xanh nhạt hơn
            paddingTop: "20px",
            marginTop: "10px",
            fontSize: "0.9rem",
            color: "#a5d6a7", // Chữ xanh lá cây nhạt
          }}>
          © 2025 Backlink Entity by Damtq. All Rights Reserved.
        </div>
      </footer>
      {/* ========== FOOTER END ========== */}

      {/* CSS */}
      <style>{`
        /* Keep all previous styles */
        @media (max-width: 768px) { .menu-icon { display: block; } .nav-desktop { display: none; } }
        .nav-button { display: flex; align-items: center; gap: 6px; background-color: transparent; color: #2d6a4f; border: 2px solid #2d6a4f; border-radius: 6px; padding: 8px 14px; cursor: pointer; font-weight: bold; font-size: 0.9rem; transition: all 0.2s ease; }
        .nav-button:hover { background-color: #2d6a4f; color: white; }
        .nav-button.logout { border-color: #d00000; color: #d00000; }
        .nav-button.logout:hover { background-color: #d00000; color: white; }
        .dropdown-button { display: flex; align-items: center; gap: 8px; background-color: white; color: #333; border: none; border-radius: 6px; padding: 10px 12px; cursor: pointer; font-weight: bold; font-size: 1rem; text-align: left; width: 100%; transition: background-color 0.2s ease; }
        .dropdown-button:hover { background-color: #f4f4f4; }
        .dropdown-button.logout { color: #d00000; }

        /* Ensure Cart Message CSS is present */
        .cart-message {
          padding: 15px; /* Margin top/bottom handled by flex gap */
          background-color: #e8f5e9; color: #1b5e20;
          border: 1px solid #c8e6c9; border-radius: 8px;
          font-weight: bold; display: flex;
          justify-content: space-between; align-items: center;
          animation: fadeIn 0.3s ease; position: relative; z-index: 5;
          flex-shrink: 0; /* Add flex-shrink here too */
        }
        .cart-message.error { background-color: #ffebee; color: #c62828; border-color: #ffcdd2; }
        .cart-message button { background: transparent; border: none; font-size: 1.5rem; color: inherit; cursor: pointer; padding: 0 5px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        /* Remove default margin from HotProducts container if needed */
        .hot-products-container {
            margin-top: 0 !important; /* Override default margin if necessary */
            margin-bottom: 0 !important;
        }

        /* --- CSS CHO FOOTER --- */
        .footer-link {
           transition: color 0.2s ease;
        }
        .footer-link:hover {
           color: #c8f7c5; /* Hover màu xanh lá nhạt */
           text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Home;
