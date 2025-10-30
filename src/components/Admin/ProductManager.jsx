// ProductManager.jsx
// Quản lý sản phẩm (CRUD, tìm kiếm, lọc, upload ảnh, phân trang)
// Giao diện màu chủ đạo xanh lá nhạt & trắng
// Cập nhật: 25/10/2025 (Cập nhật style phân trang)

import React, { useEffect, useState } from "react";

function ProductManager() {
  // --- State ---
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    details: "",
    image_url: "",
    is_active: true,
  });
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [imageFile, setImageFile] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // --- Phân trang ---
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // --- Load sản phẩm ---
  useEffect(() => {
    reloadProducts();
  }, []);

  const reloadProducts = () => {
    fetch("http://localhost:9999/products")
      .then((res) => res.json())
      .then(setProducts);
  };

  // --- Xử lý input ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // --- Upload ảnh (base64) ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(reader.result);
      setForm({ ...form, image_url: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // --- Reset form ---
  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      details: "",
      image_url: "",
      is_active: true,
    });
    setEditing(null);
    setImageFile(null);
  };

  // --- Thêm mới / Cập nhật ---
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      setMsg("⚠️ Vui lòng nhập tên và giá sản phẩm!");
      return;
    }

    try {
      const payload = { ...form };

      if (editing) {
        await fetch(`http://localhost:9999/products/${editing}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setMsg("✅ Cập nhật sản phẩm thành công!");
      } else {
        await fetch("http://localhost:9999/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setMsg("🆕 Tạo sản phẩm mới thành công!");
      }

      reloadProducts();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setMsg("❌ Lỗi khi lưu sản phẩm!");
    }
  };

  // --- Xóa sản phẩm ---
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    await fetch(`http://localhost:9999/products/${id}`, { method: "DELETE" });
    setMsg("🗑️ Đã xóa sản phẩm!");
    reloadProducts();
  };

  // --- Lọc & Tìm kiếm ---
  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) =>
      filterStatus === "all"
        ? true
        : filterStatus === "active"
        ? p.is_active
        : !p.is_active
    );

  // --- Phân trang ---
  const totalPages = Math.ceil(filtered.length / perPage);
  const currentProducts = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "#f9fff9",
        minHeight: "100vh",
        color: "#2c3e50",
      }}>
      <h2
        style={{
          marginBottom: 20,
          color: "#388e3c",
          textAlign: "center",
          borderBottom: "2px solid #a5d6a7",
          paddingBottom: 10,
        }}>
        🛒 Quản lý Sản phẩm
      </h2>

      {msg && (
        <div
          style={{
            background: "#e8f5e9",
            border: "1px solid #81c784",
            padding: "10px 15px",
            borderRadius: 8,
            color: "#2e7d32",
            marginBottom: 15,
            textAlign: "center",
          }}>
          {msg}
        </div>
      )}

      {/* Bộ lọc & tìm kiếm */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          marginBottom: 16,
        }}>
        <input
          placeholder="🔍 Tìm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 250px",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}>
          <option value="all">Tất cả</option>
          <option value="active">Đang bán</option>
          <option value="inactive">Ẩn</option>
        </select>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          style={{
            background: "#4caf50",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
          }}>
          ➕ Tạo sản phẩm mới
        </button>
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <form
          onSubmit={handleSave}
          style={{
            margin: "12px 0 20px",
            border: "1px solid #c8e6c9",
            borderRadius: 10,
            padding: 16,
            background: "white",
          }}>
          <div style={{ display: "grid", gap: 10 }}>
            <input
              name="name"
              placeholder="Tên sản phẩm"
              value={form.name}
              onChange={handleChange}
              required
              style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <input
              name="price"
              type="number"
              placeholder="Giá (VNĐ)"
              value={form.price}
              onChange={handleChange}
              required
              style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <input
              name="image_url"
              placeholder="Link ảnh sản phẩm (tuỳ chọn)"
              value={form.image_url}
              onChange={handleChange}
              style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ padding: 6 }}
            />
            {form.image_url && (
              <img
                src={form.image_url}
                alt="Preview"
                width="120"
                height="120"
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  margin: "10px 0",
                }}
              />
            )}
            <textarea
              name="description"
              placeholder="Mô tả ngắn"
              value={form.description}
              onChange={handleChange}
              style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <textarea
              name="details"
              placeholder="Chi tiết sản phẩm"
              value={form.details}
              onChange={handleChange}
              style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
              />{" "}
              Đang bán
            </label>
          </div>

          <div style={{ marginTop: 14 }}>
            <button
              type="submit"
              style={{
                background: "#43a047",
                color: "white",
                padding: "8px 14px",
                borderRadius: 6,
                border: "none",
                marginRight: 8,
                cursor: "pointer",
              }}>
              💾 {editing ? "Lưu cập nhật" : "Tạo mới"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              style={{
                background: "#ef5350",
                color: "white",
                padding: "8px 14px",
                borderRadius: 6,
                border: "none",
              }}>
              ❌ Hủy
            </button>
          </div>
        </form>
      )}

      {/* Bảng sản phẩm */}
      <div style={{ overflowX: "auto" }}>
        <table
          border="1"
          cellPadding="8"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderColor: "#c8e6c9",
            background: "white",
          }}>
          <thead style={{ background: "#a5d6a7" }}>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      width="60"
                      height="60"
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()}đ</td>
                <td
                  style={{
                    color: p.is_active ? "#2e7d32" : "#999",
                    fontWeight: "bold",
                  }}>
                  {p.is_active ? "Đang bán" : "Ẩn"}
                </td>
                <td>
                  <button
                    onClick={() => {
                      setEditing(p.id);
                      setForm({ ...p });
                      setShowForm(true);
                    }}
                    style={{
                      background: "#fff59d",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 4,
                      cursor: "pointer",
                      marginRight: 8,
                    }}>
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      background: "#e57373",
                      color: "white",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang (Đã cập nhật style) */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={{
            background: "#43A047",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
          }}>
          ◀ Trang trước
        </button>
        <span
          style={{
            fontWeight: 600,
            color: "#2E7D32",
          }}>
          Trang {currentPage}/{totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            background: "#43A047",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 500,
          }}>
          Trang sau ▶
        </button>
      </div>
    </div>
  );
}

export default ProductManager;
