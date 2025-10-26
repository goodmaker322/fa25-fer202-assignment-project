// OrderManager.jsx
// 📦 Quản lý đơn hàng (v6 - biểu đồ chỉ còn 5 trạng thái chuẩn tiếng Việt)
// Cập nhật: 26/10/2025

import React, { useEffect, useState } from "react";
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
  FaEdit,
  FaTrashAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaShippingFast,
  FaTimesCircle,
  FaCreditCard,
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

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    reloadAll();
  }, []);

  const reloadAll = () => {
    fetch("http://localhost:9999/orders")
      .then((res) => res.json())
      .then(setOrders);
    fetch("http://localhost:9999/products")
      .then((res) => res.json())
      .then(setProducts);
    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then(setUsers);
  };

  const getProduct = (id) => products.find((p) => p.id === id);
  const getUser = (id) => users.find((u) => u.id === id);

  const handleEdit = (order) => {
    setEditing(order.id);
    setNewStatus(order.order_status);
  };

  const handleUpdate = async (id) => {
    await fetch(`http://localhost:9999/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_status: newStatus }),
    });
    setMsg("✅ Cập nhật trạng thái thành công!");
    setEditing(null);
    reloadAll();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;
    await fetch(`http://localhost:9999/orders/${id}`, { method: "DELETE" });
    setMsg("🗑️ Đã xóa đơn hàng!");
    reloadAll();
  };

  // 🧭 Biểu đồ tỷ lệ đơn hàng (5 trạng thái chuẩn)
  const statusMap = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    waiting_payment: "Đang chờ thanh toán",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  };

  const statusCounts = orders.reduce((acc, o) => {
    let s = o.order_status?.toLowerCase().trim();
    if (["pending", "new"].includes(s)) s = "Chờ xử lý";
    else if (["processing", "in_progress", "processing_order"].includes(s))
      s = "Đang xử lý";
    else if (["waiting_payment", "pending_payment"].includes(s))
      s = "Đang chờ thanh toán";
    else if (["completed", "done", "success"].includes(s)) s = "Hoàn thành";
    else if (["cancelled", "canceled", "failed"].includes(s)) s = "Đã hủy";
    else s = "Khác";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const pieLabels = [
    "Chờ xử lý",
    "Đang xử lý",
    "Đang chờ thanh toán",
    "Hoàn thành",
    "Đã hủy",
  ];
  const pieColors = ["#FFEB3B", "#42A5F5", "#BA68C8", "#66BB6A", "#EF5350"];

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        label: "Tỷ lệ đơn hàng",
        data: pieLabels.map((label) => statusCounts[label] || 0),
        backgroundColor: pieColors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#2E7D32",
          font: { size: 14, weight: "500" },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.formattedValue} đơn hàng`,
        },
      },
    },
  };

  // 📈 Doanh thu 7 ngày gần nhất
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const revenueData = last7Days.map((day) => {
    const dateStr = day.toLocaleDateString();
    return orders
      .filter(
        (o) =>
          new Date(o.order_date).toLocaleDateString() === dateStr &&
          o.order_status !== "cancelled"
      )
      .reduce((sum, o) => sum + (o.total_price || 0), 0);
  });

  const lineData = {
    labels: last7Days.map((d) => d.toLocaleDateString()),
    datasets: [
      {
        label: "Doanh thu 7 ngày gần nhất",
        data: revenueData,
        borderColor: "#2E7D32",
        backgroundColor: "#C8E6C9",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // 📊 Đơn hàng theo người dùng
  const orderPerUser = users.map((u) => ({
    name: u.full_name,
    count: orders.filter((o) => o.user_id === u.id).length,
  }));

  const barData = {
    labels: orderPerUser.map((u) => u.name),
    datasets: [
      {
        label: "Số đơn hàng theo khách hàng",
        data: orderPerUser.map((u) => u.count),
        backgroundColor: "#81C784",
      },
    ],
  };

  const totalRevenue = orders
    .filter((o) => o.order_status !== "cancelled")
    .reduce((sum, o) => sum + (o.total_price || 0), 0);

  // 📄 Phân trang
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Quản lý Đơn hàng</h2>
      {msg && <p style={styles.message}>{msg}</p>}

      {/* Dashboard */}
      <div style={styles.dashboard}>
        <div style={styles.chartBox}>
          <h4>📊 Tỷ lệ đơn hàng</h4>
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div style={styles.chartBox}>
          <h4>💰 Doanh thu 7 ngày</h4>
          <Line data={lineData} />
        </div>
        <div style={styles.chartBox}>
          <h4>👥 Đơn hàng theo khách hàng</h4>
          <Bar data={barData} />
        </div>
      </div>

      <p style={styles.stats}>
        <strong>Tổng đơn:</strong> {orders.length} |{" "}
        <strong>Tổng doanh thu:</strong> {totalRevenue.toLocaleString()}đ
      </p>

      {/* Bảng đơn hàng */}
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th>STT</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((o, index) => (
              <tr key={o.id} style={styles.tableRow}>
                <td>{(currentPage - 1) * ordersPerPage + index + 1}</td>
                <td>{getUser(o.user_id)?.full_name || "?"}</td>
                <td>{getProduct(o.product_id)?.name || "?"}</td>
                <td>{o.quantity}</td>
                <td>{o.total_price?.toLocaleString()}đ</td>
                <td>
                  {editing === o.id ? (
                    <>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        style={styles.select}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="waiting_payment">
                          Đang chờ thanh toán
                        </option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                      <button
                        style={styles.saveBtn}
                        onClick={() => handleUpdate(o.id)}
                      >
                        Lưu
                      </button>
                      <button
                        style={styles.cancelBtn}
                        onClick={() => setEditing(null)}
                      >
                        Hủy
                      </button>
                    </>
                  ) : (
                    <StatusBadge status={o.order_status} />
                  )}
                </td>
                <td>{new Date(o.order_date).toLocaleString()}</td>
                <td>
                  <button
                    style={styles.actionBtn}
                    onClick={() => handleEdit(o)}
                  >
                    <FaEdit />
                  </button>{" "}
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(o.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={styles.pageBtn}
        >
          ⬅️
        </button>
        <span>
          Trang {currentPage}/{totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={styles.pageBtn}
        >
          ➡️
        </button>
      </div>
    </div>
  );
}

// 🎨 Badge hiển thị trạng thái
const StatusBadge = ({ status }) => {
  const map = {
    pending: {
      color: "#FFEB3B",
      icon: <FaHourglassHalf />,
      label: "Chờ xử lý",
    },
    processing: {
      color: "#42A5F5",
      icon: <FaShippingFast />,
      label: "Đang xử lý",
    },
    waiting_payment: {
      color: "#BA68C8",
      icon: <FaCreditCard />,
      label: "Đang chờ thanh toán",
    },
    completed: {
      color: "#66BB6A",
      icon: <FaCheckCircle />,
      label: "Hoàn thành",
    },
    cancelled: { color: "#EF5350", icon: <FaTimesCircle />, label: "Đã hủy" },
  };
  const s = map[status] || map.pending;
  return (
    <span
      style={{
        background: s.color,
        color: "#fff",
        padding: "4px 8px",
        borderRadius: 6,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {s.icon} {s.label}
    </span>
  );
};

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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 8,
  },
  tableHeader: {
    background: "#E8F5E9",
    color: "#2E7D32",
  },
  tableRow: {
    borderBottom: "1px solid #eee",
  },
  message: {
    textAlign: "center",
    color: "#2E7D32",
    fontWeight: 500,
  },
  select: {
    padding: "4px 6px",
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  saveBtn: {
    background: "#2E7D32",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: 4,
    marginLeft: 4,
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#ccc",
    color: "#333",
    border: "none",
    padding: "4px 8px",
    borderRadius: 4,
    marginLeft: 4,
    cursor: "pointer",
  },
  actionBtn: {
    background: "#81C784",
    border: "none",
    padding: "6px 8px",
    borderRadius: 4,
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#E57373",
    border: "none",
    padding: "6px 8px",
    borderRadius: 4,
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  pageBtn: {
    background: "#43A047",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default OrderManager;
