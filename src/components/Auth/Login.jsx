// Login.jsx
// Form đăng nhập, giao diện Xanh & Trắng
// Cập nhật: 26/10/2025 - Sửa lỗi "Race Condition"

import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaSpinner } from "react-icons/fa";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Bỏ 'useLocation' vì logic điều hướng đã được chuyển đi
  // const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:9999/users?username=${username}`
      );
      if (!res.ok) throw new Error(`Lỗi mạng: ${res.status}`);

      const users = await res.json();
      if (users.length === 0) {
        setError("Sai tên đăng nhập hoặc mật khẩu.");
        setLoading(false);
        return;
      }

      const user = users[0];

      let isMatch = false;
      try {
        isMatch = await bcrypt.compare(password, user.password);
      } catch (compareError) {
        console.error("Bcrypt compare error:", compareError);
        throw new Error("Lỗi xác thực mật khẩu.");
      }

      if (!isMatch) {
        setError("Sai tên đăng nhập hoặc mật khẩu.");
        setLoading(false);
        return;
      }

      // --- SỬA LỖI LOGIC TẠI ĐÂY ---
      // Xóa bỏ setTimeout và các lệnh navigate.
      // Chỉ cần gọi onLogin(user) và để App.jsx tự xử lý việc điều hướng.
      setLoading(false);
      onLogin(user);
      // --- KẾT THÚC SỬA LỖI ---
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  // --- GIAO DIỆN HIỂN THỊ (RETURN) ĐƯỢC GIỮ NGUYÊN ---
  return (
    <div className="login-page-container">
      <div className="login-form-container">
        {loading && (
          <div className="loading-overlay">
            <div className="loader">
              <FaSpinner className="spinner-icon" />
            </div>
            <p>Đang đăng nhập...</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`login-form ${loading ? "blurred" : ""}`}
        >
          <h2>
            <FaSignInAlt /> Đăng nhập
          </h2>

          {error && <p className="message error">{error}</p>}

          <div className="form-group">
            <label htmlFor="username">
              <FaUser /> Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              className="form-input-text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="form-input-text"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-login"
            disabled={loading}
          >
            {loading ? <FaSpinner className="button-spinner" /> : "Đăng nhập"}
          </button>

          <p className="register-link">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>

          {/* Nút quay lại trang chủ */}
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              Quay lại trang chủ
            </button>
          </div>
        </form>
      </div>

      <style>{`
    .login-page-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background-color: #f9fff9;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .login-form-container {
      position: relative;
      max-width: 450px;
      width: 100%;
      padding: 40px;
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 25px rgba(0, 80, 0, 0.1);
      border: 1px solid #e0f2e9;
      overflow: hidden;
    }

    .login-form h2 {
      text-align: center;
      color: #1b5e20;
      margin-top: 0;
      margin-bottom: 30px;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .form-group { margin-bottom: 25px; }
    .form-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-weight: 600;
      color: #2e7d32;
      font-size: 0.95rem;
    }
    .form-group label svg { color: #66bb6a; }

    .form-input-text {
      width: 100%; padding: 12px 15px; border: 1px solid #c8e6c9;
      border-radius: 8px; box-sizing: border-box; background-color: #fafffa;
      color: #333; transition: border-color 0.3s ease, box-shadow 0.3s ease;
      font-size: 1rem;
    }
    .form-input-text:focus {
      outline: none; border-color: #66bb6a;
      box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.25);
    }
    .form-input-text:disabled { background-color: #f0f4f0; cursor: not-allowed; }

    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 20px; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 1rem; text-decoration: none; width: 100%; }
    .btn-primary { background-color: #4CAF50; color: white; box-shadow: 0 4px 8px rgba(0, 80, 0, 0.15); border: none;}
    .btn-primary:hover:not(:disabled) { background-color: #388E3C; box-shadow: 0 6px 12px rgba(0, 80, 0, 0.2); transform: translateY(-1px);}
    .btn-primary:disabled { background-color: #a5d6a7; cursor: not-allowed; opacity: 0.7;}
    .btn-login { padding: 14px; font-size: 1.1rem; margin-top: 10px;}

    .btn-secondary {
     display: inline-flex; align-items: center; justify-content: center;
      gap: 6px; padding: 10px 20px; border: 2px solid #2e7d32;
      border-radius: 10px; background-color: white; color: #2e7d32;
      font-weight: 600; cursor: pointer; transition: all 0.3s ease; width: 100%;
    }
    .btn-secondary:hover:not(:disabled) {
      background-color: #2e7d32; color: white;
Vertical-align:  }
    .btn-secondary:disabled { opacity: 0.7; cursor: not-allowed; }

    .message.error {
      margin-bottom: 20px; padding: 12px; border-radius: 8px;
      font-weight: 500; font-size: 0.95rem; line-height: 1.5;
      color: #c62828; background-color: #ffebee; border: 1px solid #ffcdd2;
    text-align: center;
    }

    .register-link { text-align: center; margin-top: 25px; font-size: 0.95rem; color: #555; }
    .register-link a { color: #2e7d32; font-weight: 600; text-decoration: none; transition: color 0.2s; }
    .register-link a:hover { color: #1b5e20; text-decoration: underline; }

    .loading-overlay {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(255, 255, 255, 0.85);
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      z-index: 10; border-radius: 16px;
     D backdrop-filter: blur(3px);
      transition: opacity 0.3s ease;
    }
    .loader { margin-bottom: 15px; }
    .spinner-icon { font-size: 40px; color: #4caf50; animation: spin 1s linear infinite; }
    .loading-overlay p { font-weight: 600; color: #2e7d32; }

    .login-form.blurred { filter: blur(3px); pointer-events: none; user-select: none; }

    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

   @media (max-width: 500px) { .login-form-container { padding: 30px; } .login-form h2 { font-size: 1.6rem; } }
   `}</style>
    </div>
  );
}

export default Login;
