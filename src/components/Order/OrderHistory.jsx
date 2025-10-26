// OrderHistory.jsx
// Hiển thị lịch sử đơn hàng, nhóm theo thời gian đặt hàng
// Cập nhật: 26/10/2025

import React, { useEffect, useState, useMemo } from "react"; // Added useMemo
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaEye,
  FaTimes,
  FaCalendarAlt,
  FaReceipt,
} from "react-icons/fa"; // Added icons

// --- CONFIGURATION ---
// Time window in minutes to group orders together
const GROUPING_TIME_WINDOW_MINUTES = 2; // Group items ordered within 2 minutes of each other

function OrderHistory({ user }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderGroup, setSelectedOrderGroup] = useState(null); // For popup, now showing a group
  const navigate = useNavigate();

  // Fetch orders and products
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:9999/orders?user_id=${user.id}`).then((res) =>
        res.json()
      ),
      fetch("http://localhost:9999/products").then((res) => res.json()),
    ])
      .then(([fetchedOrders, fetchedProducts]) => {
        // Sort orders newest first REQUIRED for grouping logic
        const sortedOrders = fetchedOrders.sort(
          (a, b) => new Date(b.order_date) - new Date(a.order_date)
        );
        setOrders(sortedOrders);
        setProducts(fetchedProducts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user.id]);

  // Helper to get product info
  const getProduct = (id) => products.find((p) => p.id === id);

  // --- ORDER GROUPING LOGIC ---
  const groupedOrders = useMemo(() => {
    if (orders.length === 0) return [];

    const groups = [];
    let currentGroup = {
      id: `group-${Date.now()}-${Math.random()}`, // Unique key for the group
      items: [],
      startDate: null,
      endDate: null,
      groupTotalPrice: 0,
      // Assuming contact info is the same for items placed close together
      customer_name: orders[0].customer_name,
      customer_phone: orders[0].customer_phone,
      contact_info: orders[0].contact_info, // Use the new field
      payment_method: orders[0].payment_method,
    };

    for (let i = 0; i < orders.length; i++) {
      const currentItem = orders[i];
      const currentItemDate = new Date(currentItem.order_date);

      // Initialize the first group or if starting a new group
      if (currentGroup.items.length === 0) {
        currentGroup.startDate = currentItemDate;
        currentGroup.endDate = currentItemDate; // Initially the same
        currentGroup.items.push(currentItem);
        currentGroup.groupTotalPrice +=
          currentItem.final_item_price || currentItem.total_price; // Use final price if available
        // Update contact info based on the first item of the group
        currentGroup.customer_name = currentItem.customer_name;
        currentGroup.customer_phone = currentItem.customer_phone;
        currentGroup.contact_info = currentItem.contact_info;
        currentGroup.payment_method = currentItem.payment_method;
      } else {
        const lastItemDate = currentGroup.endDate; // Use the end date of the current group
        const timeDiffMinutes = (lastItemDate - currentItemDate) / (1000 * 60);

        // Check if the current item is within the time window of the group's END date
        if (Math.abs(timeDiffMinutes) <= GROUPING_TIME_WINDOW_MINUTES) {
          // Add to current group
          currentGroup.items.push(currentItem);
          // Update endDate only if this item is older (since we sort newest first)
          // Actually, startDate will be the latest, endDate the earliest in the group
          currentGroup.endDate = currentItemDate; // This item is the earliest so far in this group
          currentGroup.groupTotalPrice +=
            currentItem.final_item_price || currentItem.total_price;
        } else {
          // Finalize the current group and start a new one
          groups.push(currentGroup);
          currentGroup = {
            id: `group-${Date.now()}-${Math.random()}`,
            items: [currentItem],
            startDate: currentItemDate, // This item is the first (latest) in the new group
            endDate: currentItemDate, // And also the earliest for now
            groupTotalPrice:
              currentItem.final_item_price || currentItem.total_price,
            customer_name: currentItem.customer_name,
            customer_phone: currentItem.customer_phone,
            contact_info: currentItem.contact_info,
            payment_method: currentItem.payment_method,
          };
        }
      }
    }
    // Push the last group
    groups.push(currentGroup);
    return groups;
  }, [orders]); // Recalculate only when orders change
  // --- END GROUPING LOGIC ---

  // Navigation
  const handleGoHome = () => navigate("/");

  // Popup handling
  const openPopup = (group) => setSelectedOrderGroup(group);
  const closePopup = () => setSelectedOrderGroup(null);

  // Status rendering (simplified - shows status of the first item in the group as representative)
  const renderStatus = (status) => {
    let className = "status-badge ";
    let text = status;
    switch (
      status?.toLowerCase() // Added safety check for status
    ) {
      case "completed":
        className += "status-completed";
        text = "Hoàn thành";
        break;
      case "processing":
        className += "status-processing";
        text = "Đang xử lý";
        break;
      case "cancelled":
        className += "status-cancelled";
        text = "Đã hủy";
        break;
      case "pending payment":
        className += "status-pending-payment";
        text = "Chờ thanh toán";
        break; // Added specific status
      default:
        className += "status-pending";
        text = "Chờ xác nhận";
    }
    return <span className={className}>{text}</span>;
  };

  return (
    <div className="order-history-container">
      {/* Header */}
      <div className="order-header">
        <h2>Lịch sử đơn hàng</h2>
        <button className="btn-gohome" onClick={handleGoHome}>
          <FaHome /> Về trang chủ
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p>Đang tải lịch sử đơn hàng...</p>
      ) : groupedOrders.length === 0 ? (
        <p className="no-orders">Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="order-groups-list">
          {/* Map over GROUPS, not individual orders */}
          {groupedOrders.map((group) => (
            <div key={group.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <FaCalendarAlt />
                  <span>
                    Đặt lúc: {group.startDate.toLocaleString()}
                    {/* Optionally show end date if group spans time: */}
                    {/* {group.startDate.getTime() !== group.endDate.getTime() && ` - ${group.endDate.toLocaleTimeString()}`} */}
                  </span>
                </div>
                {/* Show representative status (e.g., first item's status) */}
                {renderStatus(group.items[0]?.order_status)}
              </div>
              <div className="order-card-body">
                {/* List items within the group */}
                {group.items.map((item) => {
                  const product = getProduct(item.product_id);
                  return (
                    <div key={item.id} className="order-item-row">
                      <img
                        src={
                          product?.image_url || "https://via.placeholder.com/50"
                        }
                        alt={product?.name || "Sản phẩm"}
                      />
                      <div className="order-item-details">
                        <span>{product?.name || "Sản phẩm đã bị xóa"}</span>
                        <span>SL: x {item.quantity}</span>
                      </div>
                      <span className="order-item-price">
                        {(
                          item.final_item_price || item.total_price
                        ).toLocaleString()}
                        đ
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="order-card-footer">
                <span className="order-group-total">
                  Tổng cộng: {group.groupTotalPrice.toLocaleString()}đ
                </span>
                <button className="btn-view" onClick={() => openPopup(group)}>
                  <FaEye /> Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Popup Updated for Group --- */}
      {selectedOrderGroup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-popup" onClick={closePopup}>
              <FaTimes />
            </button>
            <h3>
              Chi tiết đơn hàng (Đặt lúc:{" "}
              {selectedOrderGroup.startDate.toLocaleString()})
            </h3>

            <div className="popup-body">
              {/* Product Info Section */}
              <div className="popup-product-info">
                <h4>Sản phẩm đã đặt</h4>
                {selectedOrderGroup.items.map((item) => {
                  const product = getProduct(item.product_id);
                  return (
                    <div key={item.id} className="popup-item-row">
                      <img
                        src={
                          product?.image_url || "https://via.placeholder.com/50"
                        }
                        alt={product?.name || "Sản phẩm"}
                      />
                      <div className="popup-item-details">
                        <span>{product?.name || "Sản phẩm đã bị xóa"}</span>
                        <span>Số lượng: {item.quantity}</span>
                      </div>
                      <span className="popup-item-price">
                        {(
                          item.final_item_price || item.total_price
                        ).toLocaleString()}
                        đ
                      </span>
                    </div>
                  );
                })}
                <p className="popup-group-total">
                  <strong>Tổng cộng nhóm đơn hàng:</strong>{" "}
                  {selectedOrderGroup.groupTotalPrice.toLocaleString()}đ
                </p>
                <p>
                  <strong>Trạng thái chung:</strong>{" "}
                  {renderStatus(selectedOrderGroup.items[0]?.order_status)}
                </p>
                <p>
                  <strong>Thanh toán:</strong>{" "}
                  {selectedOrderGroup.payment_method === "bank"
                    ? "Chuyển khoản"
                    : "COD (Đã bỏ)"}
                </p>
              </div>

              {/* User/Contact Info Section */}
              <div className="popup-user-info">
                {/* Use info from the group */}
                <h4>Thông tin liên hệ</h4>
                <p>
                  <strong>Khách hàng:</strong>{" "}
                  {selectedOrderGroup.customer_name || user.full_name}
                </p>
                <p>
                  <strong>SĐT:</strong>{" "}
                  {selectedOrderGroup.customer_phone || user.phone}
                </p>
                <p>
                  <strong>Liên hệ khác:</strong>{" "}
                  {selectedOrderGroup.contact_info || "Không có"}
                </p>{" "}
                {/* Use contact_info */}
                <p>
                  <strong>Email (Tài khoản):</strong> {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CSS --- */}
      <style>{`
        .order-history-container { max-width: 900px; /* Narrower for card layout */ margin: 30px auto; padding: 30px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 25px rgba(0, 80, 0, 0.08); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0f2e9; }
        .order-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e8f5e9; padding-bottom: 20px; margin-bottom: 30px; }
        .order-header h2 { color: #1b5e20; margin: 0; font-size: 2rem; }
        .btn-gohome { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background-color: #66bb6a; color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease; }
        .btn-gohome:hover { background-color: #57a95b; }
        .no-orders { font-size: 1.1rem; color: #555; text-align: center; padding: 40px; }

        /* --- Order Groups Layout --- */
        .order-groups-list { display: flex; flex-direction: column; gap: 25px; } /* Space between cards */
        .order-card {
            background-color: #fafffa; border: 1px solid #e0f2e9;
            border-radius: 12px; box-shadow: 0 3px 8px rgba(0, 80, 0, 0.05);
            overflow: hidden; /* Ensure content stays within rounded corners */
        }
        .order-card-header {
            display: flex; justify-content: space-between; align-items: center;
            background-color: #e8f5e9; padding: 12px 15px;
            font-size: 0.9rem; color: #2e7d32; font-weight: 500;
        }
        .order-card-header > div { display: flex; align-items: center; gap: 8px; }

        .order-card-body { padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .order-item-row { display: flex; align-items: center; gap: 15px; padding-bottom: 10px; border-bottom: 1px dashed #e0e0e0; }
        .order-item-row:last-child { border-bottom: none; padding-bottom: 0;}
        .order-item-row img { width: 50px; height: 50px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
        .order-item-details { flex-grow: 1; font-size: 0.95rem; }
        .order-item-details span:first-child { font-weight: 500; display: block; color: #333;}
        .order-item-details span:last-child { font-size: 0.85rem; color: #777;}
        .order-item-price { font-weight: 500; font-size: 0.95rem; white-space: nowrap; color: #1b5e20;}

        .order-card-footer {
            display: flex; justify-content: space-between; align-items: center;
            background-color: #f8fdf8; padding: 10px 15px; border-top: 1px solid #e0f2e9;
        }
        .order-group-total { font-weight: bold; color: #1b5e20; font-size: 1.05rem; }
        .btn-view { /* Style remains same */ display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; font-size: 0.9rem; background-color: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.2s ease; }
        .btn-view:hover { background-color: #c8e6c9; border-color: #a5d6a7; }

        /* --- Status Badges --- */
        .status-badge { padding: 5px 10px; border-radius: 20px; font-weight: 600; font-size: 0.8rem; /* Smaller */ color: white; white-space: nowrap; }
        .status-completed { background-color: #2e7d32; }
        .status-processing { background-color: #ff9800; /* Orange */ }
        .status-cancelled { background-color: #d32f2f; }
        .status-pending { background-color: #757575; }
        .status-pending-payment { background-color: #0288d1; /* Blue */ }

        /* --- Popup Styles (Adjusted for Group) --- */
        .popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .popup-content { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); max-width: 800px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; }
        .popup-content h3 { color: #1b5e20; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #e8f5e9; padding-bottom: 15px; font-size: 1.5rem;}
        .btn-close-popup { position: absolute; top: 15px; right: 15px; background: transparent; border: none; font-size: 1.8rem; color: #999; cursor: pointer; transition: color 0.2s ease; }
        .btn-close-popup:hover { color: #333; }
        .popup-body { display: flex; gap: 30px; flex-wrap: wrap; }
        .popup-product-info, .popup-user-info { flex: 1; min-width: 300px; }
        .popup-body h4 { color: #2e7d32; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        .popup-body p { margin: 8px 0; font-size: 1rem; line-height: 1.6; }
        .popup-item-row { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; border-bottom: 1px dashed #eee; padding-bottom: 15px;}
        .popup-item-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0;}
        .popup-item-row img { width: 50px; height: 50px; border-radius: 6px; object-fit: cover; flex-shrink: 0;}
        .popup-item-details { flex-grow: 1;}
        .popup-item-details span:first-child { display: block; font-weight: 500;}
        .popup-item-details span:last-child { font-size: 0.9rem; color: #666;}
        .popup-item-price { font-weight: 500; white-space: nowrap;}
        .popup-group-total { font-size: 1.2rem; font-weight: bold; color: #1b5e20; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;}

        /* Responsive */
        @media(max-width: 600px) {
            .order-card-header, .order-card-footer { flex-direction: column; align-items: flex-start; gap: 8px;}
            .order-item-row { flex-wrap: wrap;}
            .order-item-price { width: 100%; text-align: right; margin-top: 5px;}
            .popup-body { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}

export default OrderHistory;
