// Register.jsx
// Form đăng ký tài khoản, giao diện Xanh & Trắng, icon input
// Cập nhật: 26/10/2025

import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaIdCard } from "react-icons/fa";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
    full_name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => /^[a-zA-Z0-9]{4,20}$/.test(username);
  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!validateUsername(form.username)) {
      setError("Tên đăng nhập chỉ gồm chữ, số, 4-20 ký tự");
      setLoading(false);
      return;
    }
    if (!validatePassword(form.password)) {
      setError("Mật khẩu phải từ 6 ký tự trở lên");
      setLoading(false);
      return;
    }
    if (form.password !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp");
      setLoading(false);
      return;
    }
    if (!form.full_name.trim()) {
      setError("Vui lòng nhập họ tên");
      setLoading(false);
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Email không hợp lệ");
      setLoading(false);
      return;
    }

    try {
      // Kiểm tra trùng username/email
      const resUser = await fetch(
        `http://localhost:9999/users?username=${form.username}`
      );
      const users = await resUser.json();
      if (users.length > 0) {
        setError("Tên đăng nhập đã tồn tại");
        setLoading(false);
        return;
      }
      const resEmail = await fetch(
        `http://localhost:9999/users?email=${form.email}`
      );
      const emails = await resEmail.json();
      if (emails.length > 0) {
        setError("Email đã được sử dụng");
        setLoading(false);
        return;
      }

      const hashedPassword = await bcrypt.hash(form.password, 10);

      await fetch("http://localhost:9999/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: hashedPassword,
          full_name: form.full_name,
          email: form.email,
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: "active",
        }),
      });

      setSuccess("Đăng ký thành công! Hãy đăng nhập.");
      setForm({
        username: "",
        password: "",
        confirm: "",
        full_name: "",
        email: "",
      });
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        {loading && (
          <div className="loading-overlay">
            <div className="loader">
              <FaLock className="spinner-icon" />
            </div>
            <p>Đang xử lý...</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`login-form ${loading ? "blurred" : ""}`}
        >
          <h2>Đăng ký</h2>

          {error && <p className="message error">{error}</p>}
          {success && <p className="message success">{success}</p>}

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">
              <FaUser /> Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nhập tên đăng nhập"
              value={form.username}
              onChange={handleChange}
              className="form-input-text"
              disabled={loading}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="form-input-text"
              disabled={loading}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirm">
              <FaLock /> Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Nhập lại mật khẩu"
              value={form.confirm}
              onChange={handleChange}
              className="form-input-text"
              disabled={loading}
              required
            />
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="full_name">
              <FaIdCard /> Họ tên
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Nhập họ tên"
              value={form.full_name}
              onChange={handleChange}
              className="form-input-text"
              disabled={loading}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email"
              value={form.email}
              onChange={handleChange}
              className="form-input-text"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-login"
            disabled={loading}
          >
            {loading ? <FaLock className="button-spinner" /> : "Đăng ký"}
          </button>

          <p className="register-link">
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </p>
        </form>
      </div>

      <style>{`
          /* Giữ nguyên toàn bộ CSS từ Login.jsx */
          .login-page-container { display: flex; justify-content: center; align-items: center; min-height: 80vh; background-color: #f9fff9; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .login-form-container { position: relative; max-width: 450px; width: 100%; padding: 40px; background-color: #fff; border-radius: 16px; box-shadow: 0 8px 25px rgba(0, 80, 0, 0.1); border: 1px solid #e0f2e9; overflow: hidden; }
          .login-form h2 { text-align: center; color: #1b5e20; margin-top: 0; margin-bottom: 30px; font-size: 1.8rem; }
          .form-group { margin-bottom: 25px; }
          .form-group label { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-weight: 600; color: #2e7d32; font-size: 0.95rem; }
          .form-group label svg { color: #66bb6a; }
          .form-input-text { width: 100%; padding: 12px 15px; border: 1px solid #c8e6c9; border-radius: 8px; box-sizing: border-box; background-color: #fafffa; color: #333; transition: border-color 0.3s ease, box-shadow 0.3s ease; font-size: 1rem; }
          .form-input-text:focus { outline: none; border-color: #66bb6a; box-shadow: 0 0 0 3px rgba(102,187,106,0.25); }
          .form-input-text:disabled { background-color: #f0f4f0; cursor: not-allowed; }
          .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 20px; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 1rem; text-decoration: none; width: 100%; }
          .btn-primary { background-color: #4CAF50; color: white; box-shadow: 0 4px 8px rgba(0, 80, 0, 0.15); border: none;}
          .btn-primary:hover:not(:disabled) { background-color: #388E3C; box-shadow: 0 6px 12px rgba(0,80,0,0.2); transform: translateY(-1px); }
          .btn-primary:disabled { background-color: #a5d6a7; cursor: not-allowed; opacity: 0.7;}
          .btn-login { padding: 14px; font-size: 1.1rem; margin-top: 10px;}
          .button-spinner { animation: spin 1s linear infinite; font-size: 1em; }
          .message.error { margin-bottom: 20px; padding: 12px; border-radius: 8px; font-weight: 500; font-size: 0.95rem; line-height: 1.5; color: #c62828; background-color: #ffebee; border: 1px solid #ffcdd2; text-align: center; }
          .message.success { margin-bottom: 20px; padding: 12px; border-radius: 8px; font-weight: 500; font-size: 0.95rem; line-height: 1.5; color: #2e7d32; background-color: #e8f5e9; border: 1px solid #c8e6c9; text-align: center; }
          .register-link { text-align: center; margin-top: 25px; font-size: 0.95rem; color: #555; }
          .register-link a { color: #2e7d32; font-weight: 600; text-decoration: none; transition: color 0.2s; }
          .register-link a:hover { color: #1b5e20; text-decoration: underline; }
          .loading-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255,255,255,0.85); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 10; border-radius: 16px; backdrop-filter: blur(3px); transition: opacity 0.3s ease; }
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

export default Register;
