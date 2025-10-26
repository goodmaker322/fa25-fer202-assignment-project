// UserProfile.jsx
// Hồ sơ người dùng: Giao diện Xanh & Trắng, Validate
// Logic tải ảnh: Base64 (Giống ProductManager)
// Sửa lỗi tự reload và tối ưu UI
// Cập nhật: 25/10/2025

import React, { useState, useEffect, useCallback } from "react";
import { FaEdit, FaHome, FaSave, FaTimes, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// URL của backend API
const USERS_API_URL = "http://localhost:9999/users";

// Thêm prop 'onUserUpdate' để báo cho component cha cập nhật state
function UserProfile({ user, onUserUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // STATE MỚI: Chỉ dùng cho ô input "Dán link ảnh URL..."
  const [avatarLinkInput, setAvatarLinkInput] = useState("");

  // Cập nhật 'form' VÀ 'avatarLinkInput' khi 'user' (prop) thay đổi
  useEffect(() => {
    setForm({ ...user });

    // Chỉ điền vào ô input nếu avatar_url là URL (không phải Base64)
    if (user.avatar_url && !user.avatar_url.startsWith("data:")) {
      setAvatarLinkInput(user.avatar_url);
    } else {
      setAvatarLinkInput("");
    }

    // Reset lỗi và msg khi prop thay đổi
    setErrors({});
    setMsg("");
  }, [user]); // Chỉ chạy khi 'user' prop thay đổi

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!form.full_name || form.full_name.trim() === "") {
      newErrors.full_name = "Họ tên không được để trống.";
    }
    const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (form.phone && !phoneRegex.test(form.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form.full_name, form.phone]);

  // Xử lý khi thay đổi input text (cho các trường chung)
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Cập nhật khi gõ vào ô input URL
  const handleLinkChange = (e) => {
    const url = e.target.value;
    setAvatarLinkInput(url); // Cập nhật state của ô input
    setForm({ ...form, avatar_url: url }); // Cập nhật data sẽ được lưu
  };

  // Cập nhật khi TẢI FILE lên (Base64)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      // 2MB
      setMsg("Lỗi: Kích thước ảnh quá lớn, vui lòng chọn ảnh dưới 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // Cập nhật data sẽ được lưu (Base64)
      setForm({ ...form, avatar_url: reader.result });
      // Xóa rỗng ô input URL
      setAvatarLinkInput("");
    };
    reader.onerror = () => {
      setMsg("Lỗi: Không thể đọc file ảnh.");
    };
    reader.readAsDataURL(file);
  };

  // Xử lý LƯU
  const handleSave = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!validateForm()) return;

    const dataToSave = { ...form };

    try {
      const response = await fetch(`${USERS_API_URL}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Cập nhật thông tin thất bại!");
      }

      const updatedUser = await response.json();
      setMsg("Cập nhật thông tin thành công!");
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // BÁO CHO COMPONENT CHA CẬP NHẬT
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }

      setIsEditing(false);
      setErrors({});
      // setForm và setAvatarLinkInput sẽ được tự động cập nhật
      // bởi 'useEffect' khi 'user' (prop) mới được truyền xuống
    } catch (error) {
      setMsg(`Lỗi cập nhật: ${error.message}`);
    }
  };

  // Xử lý HỦY
  const handleCancel = () => {
    setIsEditing(false);
    // Reset thủ công về 'user' (prop) hiện tại, vì 'useEffect' sẽ không chạy
    setForm({ ...user });
    if (user.avatar_url && !user.avatar_url.startsWith("data:")) {
      setAvatarLinkInput(user.avatar_url);
    } else {
      setAvatarLinkInput("");
    }
    setErrors({});
    setMsg("");
  };

  // Placeholder avatar nếu không có URL
  const defaultAvatar =
    "https://via.placeholder.com/130x130.png?text=No+Avatar";
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="user-profile-container">
      <form onSubmit={handleSave}>
        {/* Header */}
        <div className="profile-header">
          <button type="button" className="btn-edit" onClick={goToHome}>
            <FaHome /> Trang chủ
          </button>
        </div>
        <div className="profile-header">
          <h2>Thông tin cá nhân</h2>
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  <FaTimes /> Hủy
                </button>
                <button type="submit" className="btn-save">
                  <FaSave /> Lưu thay đổi
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit /> Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="profile-body">
          <div className="profile-left">
            <div className="profile-avatar">
              <img
                src={form.avatar_url || defaultAvatar}
                alt="Ảnh đại diện"
                key={form.avatar_url} // Dùng chính URL/Base64 làm key
              />
            </div>
            {isEditing && (
              <div className="avatar-edit-options">
                {/* Ô INPUT ĐÃ ĐƯỢC TỐI ƯU */}
                <div className="form-group-inline">
                  <label htmlFor="avatar_url" className="sr-only">
                    Link ảnh
                  </label>
                  <input
                    id="avatar_url"
                    name="avatar_url_input" // Đổi tên để tránh nhầm lẫn
                    type="text"
                    value={avatarLinkInput} // <-- SỬ DỤNG STATE RIÊNG
                    onChange={handleLinkChange} // <-- SỬ DỤNG HANDLER RIÊNG
                    placeholder="Dán link ảnh URL..."
                    className="form-input-text" // <-- CLASS THỐNG NHẤT
                  />
                </div>
                <div className="form-group-inline avatar-upload-section">
                  <label htmlFor="avatar_file" className="btn-upload">
                    <FaUpload /> Hoặc tải file lên
                  </label>
                  <input
                    id="avatar_file"
                    name="avatar_file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="profile-right">
            {/* Họ tên */}
            <div className="form-group">
              <label htmlFor="full_name">Họ tên</label>
              <input
                id="full_name"
                name="full_name"
                value={form.full_name}
                onChange={handleTextChange}
                placeholder="Họ tên"
                disabled={!isEditing}
                className="form-input-text" // <-- CLASS THỐNG NHẤT
              />
              {errors.full_name && (
                <p className="error-text">{errors.full_name}</p>
              )}
            </div>

            {/* Email (Không thể sửa) */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                disabled
                title="Không thể thay đổi email"
                className="form-input-text" // <-- CLASS THỐNG NHẤT
              />
            </div>

            {/* Số điện thoại */}
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleTextChange}
                placeholder="Số điện thoại"
                disabled={!isEditing}
                className="form-input-text" // <-- CLASS THỐNG NHẤT
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            {/* Địa chỉ */}
            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <input
                id="address"
                name="address"
                value={form.address}
                onChange={handleTextChange}
                placeholder="Địa chỉ"
                disabled={!isEditing}
                className="form-input-text" // <-- CLASS THỐNG NHẤT
              />
            </div>

            {/* Thông báo */}
            {msg && (
              <p
                className={`message ${
                  msg.includes("Lỗi") ? "error" : "success"
                }`}
              >
                {msg}
              </p>
            )}
          </div>
        </div>
      </form>

      {/* 🎨 CSS (Đã tối ưu và thống nhất) */}
      <style>{`
        /* --- Cơ bản --- */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .user-profile-container {
          max-width: 850px;
          margin: 30px auto;
          padding: 35px;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 80, 0, 0.08);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          border: 1px solid #e0f2e9;
        }
        
        /* --- Header --- */
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e8f5e9;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .profile-header h2 {
          color: #1b5e20;
          margin: 0;
          font-size: 2rem;
          font-weight: 600;
        }

        /* --- Các nút hành động --- */
        .profile-actions button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-left: 12px;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        .profile-actions button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-edit { background-color: #66bb6a; color: white; }
        .btn-edit:hover:not(:disabled) { background-color: #57a95b; }
        .btn-save { background-color: #2e7d32; color: white; }
        .btn-save:hover:not(:disabled) { background-color: #1b5e20; }
        .btn-cancel { background-color: #ffffff; color: #555; border: 1px solid #cfd8dc; }
        .btn-cancel:hover:not(:disabled) { background-color: #f7f7f7; border-color: #b0bec5; }
        
        /* --- Bố cục Body (flex) --- */
        .profile-body {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .profile-left {
            flex: 1;
            min-width: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .profile-right {
            flex: 2;
            min-width: 350px;
        }
        
        /* --- Avatar --- */
        .profile-avatar { margin-bottom: 10px; }
        .profile-avatar img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #c8e6c9;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .avatar-edit-options {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }
        
        /* --- Trường thông tin --- */
        .form-group { margin-bottom: 22px; }
        .form-group-inline {
            margin-bottom: 0;
            width: 100%;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #2e7d32;
          font-size: 0.95rem;
        }
        
        /* --- CLASS THỐNG NHẤT CHO CÁC Ô INPUT --- */
        .form-input-text {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #c8e6c9;
          border-radius: 8px;
          box-sizing: border-box; 
          background-color: #fafffa;
          color: #333;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          font-size: 1rem;
        }
        
        .form-input-text:focus {
          outline: none;
          border-color: #66bb6a;
          box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.25);
        }

        .form-input-text:disabled {
          background-color: #f0f4f0;
          color: #757575;
          cursor: not-allowed;
          border-color: #e0e0e0;
        }
        /* --- KẾT THÚC CLASS THỐNG NHẤT --- */
        
        /* --- Nút Upload File --- */
        .avatar-upload-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            width: 100%;
        }

        .btn-upload {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: fit-content;
          padding: 10px 20px;
          background-color: #81c784;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: background-color 0.2s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .btn-upload:hover:not(:disabled) { background-color: #66bb6a; }
        .btn-upload:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* --- Thông báo --- */
        .message {
          margin-top: 25px;
          padding: 15px;
          border-radius: 10px;
          font-weight: 500;
          font-size: 1rem;
          line-height: 1.5;
        }
        .message.success { color: #1b5e20; background-color: #e8f5e9; border: 1px solid #c8e6c9; }
        .message.error { color: #c62828; background-color: #ffebee; border: 1px solid #ffcdd2; }

        /* --- Lỗi Validate --- */
        .error-text { color: #d32f2f; font-size: 0.85rem; margin-top: 6px; padding-left: 2px; }
        
        .form-input-text:has(+ .error-text) {
           border-color: #ef9a9a;
           background-color: #fffafa;
        }

        /* --- Responsive --- */
        @media (max-width: 768px) {
            .profile-body { flex-direction: column; align-items: center; gap: 30px; }
            .profile-header { flex-direction: column; align-items: flex-start; gap: 15px; }
            .profile-actions { width: 100%; display: flex; justify-content: space-around; margin-left: 0; }
            .profile-actions button { flex: 1; margin: 0 5px; }
            .profile-left, .profile-right { width: 100%; min-width: unset; }
            .user-profile-container { padding: 20px; }
        }
      `}</style>
    </div>
  );
}

export default UserProfile;
