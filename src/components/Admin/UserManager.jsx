// UserManager.jsx (Enhanced Green Dashboard v2 - with uniqueness checks)
// 🌿 Quản lý người dùng, kiểm tra email/username độc nhất + UI cải tiến
// 🧩 Giữ nguyên logic cũ, chỉ thêm kiểm tra và tinh chỉnh hiển thị
// 🕒 Cập nhật: 25/10/2025

import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUserEdit,
  FaTrashAlt,
  FaKey,
  FaPlusCircle,
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function filterUsersByDate(users, days) {
  const now = new Date();
  return users.filter((u) => {
    const created = new Date(u.created_at);
    return (now - created) / (1000 * 60 * 60 * 24) <= days;
  });
}

function UserManager() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: "user",
    status: "active",
  });
  const [newUser, setNewUser] = useState(false);
  const [msg, setMsg] = useState("");
  const [resetPwd, setResetPwd] = useState({ id: null, pwd: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 10;

  // fetch list
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:9999/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
      setMsg("❌ Lỗi tải dữ liệu người dùng.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Dashboard data
  const users7days = filterUsersByDate(users, 7);
  const users30days = filterUsersByDate(users, 30);
  const users365days = filterUsersByDate(users, 365);

  const barData = {
    labels: ["7 ngày", "1 tháng", "1 năm"],
    datasets: [
      {
        label: "Số lượng đăng ký",
        data: [users7days.length, users30days.length, users365days.length],
        backgroundColor: ["#66BB6A", "#A5D6A7", "#388E3C"],
      },
    ],
  };

  const lineLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString();
  });

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Đăng ký mỗi ngày (7 ngày gần nhất)",
        data: lineLabels.map(
          (date) =>
            users.filter(
              (u) => new Date(u.created_at).toLocaleDateString() === date
            ).length
        ),
        borderColor: "#2E7D32",
        backgroundColor: "#C8E6C9",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        data: Object.values(roleCounts),
        backgroundColor: ["#A5D6A7", "#81C784", "#43A047"],
      },
    ],
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;

  // helpers: check uniqueness
  const isUsernameTaken = async (username, excludeId = null) => {
    if (!username) return false;
    try {
      const res = await fetch(
        `http://localhost:9999/users?username=${encodeURIComponent(username)}`
      );
      const list = await res.json();
      if (excludeId == null) return list.length > 0;
      return list.some((u) => u.id !== excludeId);
    } catch (err) {
      console.error("check username error", err);
      return false;
    }
  };

  const isEmailTaken = async (email, excludeId = null) => {
    if (!email) return false;
    try {
      const res = await fetch(
        `http://localhost:9999/users?email=${encodeURIComponent(email)}`
      );
      const list = await res.json();
      if (excludeId == null) return list.length > 0;
      return list.some((u) => u.id !== excludeId);
    } catch (err) {
      console.error("check email error", err);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Create new user with uniqueness checks
  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg("");
    // basic validation
    if (!form.username || !form.password || !form.email) {
      setMsg("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // uniqueness checks
    if (await isUsernameTaken(form.username)) {
      setMsg("⚠️ Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }
    if (await isEmailTaken(form.email)) {
      setMsg(
        "⚠️ Email đã được đăng ký. Mỗi email chỉ được dùng cho 1 tài khoản."
      );
      return;
    }

    try {
      const hashed = await bcrypt.hash(form.password, 10);
      const newUserData = {
        ...form,
        password: hashed,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      await fetch("http://localhost:9999/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });
      setMsg("✅ Tạo tài khoản thành công!");
      setNewUser(false);
      fetchUsers();
      // clear form
      setForm({
        username: "",
        password: "",
        full_name: "",
        email: "",
        role: "user",
        status: "active",
      });
    } catch (err) {
      console.error(err);
      setMsg("❌ Lỗi khi tạo tài khoản.");
    }
  };

  // prepare editing
  const handleEdit = (u) => {
    setEditing(u.id);
    setForm({ ...u, password: "" });
    setNewUser(false);
  };

  // Update with uniqueness checks
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!form.email || !form.full_name) {
      setMsg("⚠️ Vui lòng nhập thông tin bắt buộc (Họ tên, Email).");
      return;
    }

    // Check email uniqueness (exclude current editing id)
    if (await isEmailTaken(form.email, editing)) {
      setMsg(
        "⚠️ Email đã được dùng bởi tài khoản khác. Mỗi email chỉ được dùng cho 1 tài khoản."
      );
      return;
    }

    // Check username uniqueness if username editable (defensive)
    if (form.username && (await isUsernameTaken(form.username, editing))) {
      setMsg("⚠️ Tên đăng nhập đã được dùng bởi tài khoản khác.");
      return;
    }

    try {
      const updateData = { ...form, updated_at: new Date().toISOString() };
      if (form.password) {
        updateData.password = await bcrypt.hash(form.password, 10);
      } else {
        delete updateData.password;
      }
      await fetch(`http://localhost:9999/users/${editing}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      setMsg("✅ Cập nhật thông tin thành công!");
      setEditing(null);
      fetchUsers();
      setForm({
        username: "",
        password: "",
        full_name: "",
        email: "",
        role: "user",
        status: "active",
      });
    } catch (err) {
      console.error(err);
      setMsg("❌ Lỗi khi cập nhật người dùng.");
    }
  };

  // Delete: keep existing confirm prompt flow
  const handleDelete = async (u) => {
    const confirmMsg = `Bạn có chắc chắn muốn xóa ${u.username}?\nNhập: Tôi chắc chắn muốn xóa ${u.username}`;
    const answer = window.prompt(confirmMsg);
    if (answer === `Tôi chắc chắn muốn xóa ${u.username}`) {
      try {
        await fetch(`http://localhost:9999/users/${u.id}`, {
          method: "DELETE",
        });
        setMsg(`🗑️ Đã xóa ${u.username}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
        setMsg("❌ Lỗi khi xóa người dùng.");
      }
    } else {
      setMsg("⚠️ Bạn phải nhập đúng câu xác nhận để xóa tài khoản!");
    }
  };

  const handleResetPwd = async (e) => {
    e.preventDefault();
    if (!resetPwd.pwd) {
      setMsg("⚠️ Vui lòng nhập mật khẩu mới!");
      return;
    }
    try {
      const hashed = await bcrypt.hash(resetPwd.pwd, 10);
      await fetch(`http://localhost:9999/users/${resetPwd.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: hashed }),
      });
      setMsg("🔑 Đặt lại mật khẩu thành công!");
      setResetPwd({ id: null, pwd: "" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMsg("❌ Lỗi khi đặt lại mật khẩu.");
    }
  };

  // Filter by search term (username hoặc full_name)
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.full_name &&
        u.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 Quản lý người dùng</h2>

      {/* Dashboard */}
      <div style={styles.dashboard}>
        <div style={styles.chartBox}>
          <h4>📅 Đăng ký theo thời gian</h4>
          <Bar data={barData} />
        </div>
        <div style={styles.chartBox}>
          <h4>📈 Xu hướng 7 ngày</h4>
          <Line data={lineData} />
        </div>
        <div style={styles.chartBox}>
          <h4>🧩 Phân loại Role</h4>
          <Pie data={pieData} />
        </div>
      </div>

      <div style={styles.stats}>
        <strong>Tổng user:</strong> {totalUsers} |{" "}
        <strong style={{ color: "#2E7D32" }}>Active:</strong> {activeUsers} |{" "}
        <strong style={{ color: "#757575" }}>Inactive:</strong> {inactiveUsers}
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <button
          onClick={() => {
            setNewUser(true);
            setEditing(null);
            setForm({
              username: "",
              password: "",
              full_name: "",
              email: "",
              role: "user",
              status: "active",
            });
            setMsg("");
          }}
          style={styles.addBtn}
        >
          <FaPlusCircle style={{ marginRight: 8 }} /> Thêm người dùng
        </button>
        <input
          type="text"
          placeholder="🔍 Tìm theo tên hoặc username..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // quay lại trang đầu khi tìm
          }}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
            flex: 1,
            maxWidth: 300,
          }}
        />
      </div>

      {msg && <p style={styles.message}>{msg}</p>}

      {(newUser || editing) && (
        <form
          onSubmit={newUser ? handleCreate : handleUpdate}
          style={styles.form}
        >
          <div style={{ display: "grid", gap: 8, flex: "1 1 400px" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                name="username"
                placeholder="Tên đăng nhập"
                value={form.username}
                onChange={handleChange}
                required
                disabled={!!editing}
                style={styles.input}
              />
              <input
                name="password"
                type="password"
                placeholder={editing ? "Đổi mật khẩu (nếu cần)" : "Mật khẩu"}
                value={form.password}
                onChange={handleChange}
                required={newUser}
                style={styles.input}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <input
                name="full_name"
                placeholder="Họ tên"
                value={form.full_name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="user">👤 user</option>
                <option value="admin">🧑‍💼 admin</option>
              </select>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="active">🟢 active</option>
                <option value="inactive">⚪ inactive</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" style={styles.saveBtn}>
                <FaCheckCircle style={{ marginRight: 6 }} />
                {newUser ? "Tạo mới" : "Lưu thay đổi"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewUser(false);
                  setEditing(null);
                  setMsg("");
                }}
                style={styles.cancelBtn}
              >
                <FaTimesCircle style={{ marginRight: 6 }} /> Hủy
              </button>
            </div>
          </div>
        </form>
      )}

      {resetPwd.id && (
        <form onSubmit={handleResetPwd} style={styles.form}>
          <input
            type="password"
            placeholder="🔑 Mật khẩu mới"
            value={resetPwd.pwd}
            onChange={(e) => setResetPwd({ ...resetPwd, pwd: e.target.value })}
            required
            style={styles.input}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" style={styles.saveBtn}>
              Xác nhận
            </button>
            <button
              type="button"
              onClick={() => setResetPwd({ id: null, pwd: "" })}
              style={styles.cancelBtn}
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div style={{ overflowX: "auto", marginTop: 8 }}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Tên đăng nhập</th>
              <th style={styles.th}>Họ tên</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Trạng thái</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u.id} style={styles.tableRow}>
                <td style={styles.tdId}>{u.id}</td>
                <td style={styles.tdUser}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div style={styles.avatar}>
                      {(u.full_name || u.username || "U")
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{u.username}</div>
                      <div style={{ fontSize: 12, color: "#777" }}>
                        {u.created_at
                          ? new Date(u.created_at).toLocaleDateString()
                          : ""}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>{u.full_name}</td>
                <td style={styles.td}>
                  <FaEnvelope style={{ color: "#777", marginRight: 6 }} />
                  {u.email}
                </td>
                <td style={styles.td}>
                  {u.role === "admin" ? (
                    <span style={styles.adminRole}>
                      <FaUserShield style={{ marginRight: 6 }} /> Admin
                    </span>
                  ) : (
                    <span style={styles.userRole}>
                      <FaUser style={{ marginRight: 6 }} /> User
                    </span>
                  )}
                </td>
                <td style={styles.td}>
                  {u.status === "active" ? (
                    <span style={styles.activeStatus}>
                      <FaCheckCircle style={{ marginRight: 6 }} /> Active
                    </span>
                  ) : (
                    <span style={styles.inactiveStatus}>
                      <FaTimesCircle style={{ marginRight: 6 }} /> Inactive
                    </span>
                  )}
                </td>
                <td style={styles.tdActions}>
                  <button
                    style={styles.actionBtn}
                    onClick={() => handleEdit(u)}
                    title="Sửa"
                  >
                    <FaUserEdit />
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(u)}
                    title="Xóa"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    style={styles.resetBtn}
                    onClick={() => setResetPwd({ id: u.id, pwd: "" })}
                    title="Đặt lại mật khẩu"
                  >
                    <FaKey />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div style={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.pageBtn}
        >
          ◀ Trang trước
        </button>

        <span style={styles.pageInfo}>
          Trang {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={styles.pageBtn}
        >
          Trang sau ▶
        </button>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    padding: 20,
    fontFamily: "Segoe UI, sans-serif",
    background: "#F9FFF9",
    minHeight: "100vh",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#2E7D32",
    fontWeight: 600,
    marginBottom: 20,
  },
  dashboard: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
    marginBottom: 30,
  },
  chartBox: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
  },
  stats: {
    textAlign: "center",
    marginBottom: 20,
  },
  addBtn: {
    background: "#43A047",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    color: "#2E7D32",
    fontWeight: 500,
    marginBottom: 10,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    background: "#fff",
    padding: 12,
    marginBottom: 18,
    border: "1px solid #C8E6C9",
    borderRadius: 10,
  },
  saveBtn: {
    background: "#2E7D32",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#ccc",
    color: "#333",
    padding: "8px 12px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    flex: 1,
  },
  select: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
    flex: 1,
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 8px",
    background: "transparent",
  },
  tableHeader: {
    background: "#E8F5E9",
    color: "#2E7D32",
  },
  th: {
    textAlign: "left",
    padding: "10px 12px",
    fontWeight: 600,
    fontSize: 14,
  },
  td: {
    padding: "12px",
    background: "#fff",
    verticalAlign: "middle",
  },
  tdId: {
    padding: "12px",
    width: 60,
    background: "#fff",
    verticalAlign: "middle",
    fontWeight: 600,
  },
  tdUser: { padding: "12px", background: "#fff", verticalAlign: "middle" },
  tableRow: {
    // white card look per row
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
    borderRadius: 8,
    overflow: "hidden",
  },
  avatar: {
    width: 36,
    height: 36,
    background: "#A5D6A7",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
  },
  adminRole: {
    color: "#1B5E20",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
  },
  userRole: { color: "#4CAF50", display: "inline-flex", alignItems: "center" },
  activeStatus: {
    color: "#2E7D32",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
  },
  inactiveStatus: {
    color: "#999",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
  },
  actionBtn: {
    background: "#81C784",
    border: "none",
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
    marginRight: 6,
  },
  deleteBtn: {
    background: "#E57373",
    border: "none",
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
    marginRight: 6,
    color: "#fff",
  },
  resetBtn: {
    background: "#AED581",
    border: "none",
    padding: "8px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  tdActions: {
    padding: "12px",
    background: "#fff",
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
  },
  pageBtn: {
    background: "#43A047",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 500,
  },
  pageInfo: {
    fontWeight: 600,
    color: "#2E7D32",
  },
};

export default UserManager;
