// Checkout.jsx
// Single-Step Checkout Page for Online Service: Contact Info, QR Payment, Summary, Place Order
// Cập nhật: Bỏ địa chỉ/phí ship, chỉ giữ QR bank
// Ngày cập nhật: 26/10/2025

import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaLink,
  FaCreditCard,
  FaPaperPlane,
  FaArrowLeft,
  FaShoppingCart,
  FaQrcode,
} from "react-icons/fa"; // Changed FaMapMarkerAlt to FaLink

const ORDERS_API_URL = "http://localhost:9999/orders";

// --- Cấu hình tài khoản nhận tiền ---
const BANK_ID = "BIDV";
const ACCOUNT_NO = "4270780737";
const ACCOUNT_NAME = "TRAN QUANG DAM"; // <<-- THAY TÊN CHỦ TÀI KHOẢN THẬT

function Checkout({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems = [], subtotal = 0 } = location.state || {};

  // --- BỎ địa chỉ, chỉ còn contact_info ---
  const [formData, setFormData] = useState({
    name: user?.full_name || "",
    phone: user?.phone || "",
    contact_info: "", // Thêm trường contact_info
    paymentMethod: "bank", // Chỉ có bank
  });
  // --- BỎ shippingCost state ---
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  // --- BỎ useEffect tính phí ship ---

  // Tổng tiền cuối cùng = Tạm tính
  const finalTotal = useMemo(() => subtotal, [subtotal]);

  // Tạo nội dung chuyển khoản (giữ nguyên)
  const orderDescription = useMemo(() => {
    const userIdShort = user?.id?.substring(0, 4) || "GUEST";
    const timestampShort = Date.now().toString().slice(-6);
    return `Thanh toan DH ${userIdShort}-${timestampShort}`;
  }, [user]);

  // Tạo link QR VietQR (giữ nguyên)
  const qrCodeUrl = useMemo(() => {
    if (finalTotal <= 0) return "";
    const params = new URLSearchParams({
      accountName: ACCOUNT_NAME,
      amount: finalTotal.toString(),
      addInfo: orderDescription,
    });
    return `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact.png?${params.toString()}`;
  }, [finalTotal, orderDescription]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // --- CẬP NHẬT Validate form ---
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên.";
    if (!formData.phone.trim())
      newErrors.phone = "Vui lòng nhập số điện thoại.";
    else if (!/(0[3|5|7|8|9])+([0-9]{8})\b/g.test(formData.phone))
      newErrors.phone = "Số điện thoại không hợp lệ.";
    // Validate contact_info (bắt buộc)
    if (!formData.contact_info.trim())
      newErrors.contact_info =
        "Vui lòng nhập thông tin liên hệ (Email/Facebook/Zalo).";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // --- KẾT THÚC CẬP NHẬT ---

  // Hàm Đặt Hàng
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!validateForm()) return;

    setLoading(true);
    setMsg("Đang xử lý đơn hàng...");

    try {
      const orderPromises = cartItems.map((item) => {
        const newOrder = {
          user_id: user.id,
          product_id: item.product.id,
          quantity: item.quantity,
          total_price: item.product.price * item.quantity,
          order_date: new Date().toISOString(),
          order_status: "Pending Payment", // Luôn là chờ thanh toán
          customer_name: formData.name,
          customer_phone: formData.phone,
          // --- THAY ĐỔI: Thêm contact_info, bỏ địa chỉ/phí ship ---
          contact_info: formData.contact_info,
          payment_method: "bank", // Luôn là bank
          payment_description: orderDescription,
          final_item_price: item.product.price * item.quantity, // = total_price vì không có ship
          // --- KẾT THÚC THAY ĐỔI ---
        };
        return fetch(ORDERS_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        });
      });

      const responses = await Promise.all(orderPromises);
      responses.forEach((res) => {
        if (!res.ok) throw new Error("Lỗi khi tạo đơn hàng trên server.");
      });

      localStorage.setItem("userCart", "[]"); // Xóa giỏ hàng

      setMsg("Đặt hàng thành công! Đang chuyển đến Lịch sử đơn hàng...");

      setTimeout(() => {
        navigate("/orders");
      }, 2500);
    } catch (error) {
      console.error("Order placement error:", error);
      setMsg(`Lỗi đặt hàng: ${error.message}`);
      setLoading(false);
    }
  };

  // Redirect back to cart if state is lost (giữ nguyên)
  useEffect(() => {
    if (
      !loading &&
      Array.isArray(cartItems) &&
      cartItems.length === 0 &&
      location.pathname === "/checkout"
    ) {
      setMsg("Không tìm thấy thông tin giỏ hàng. Đang quay lại...");
      setTimeout(() => navigate("/cart", { replace: true }), 1500);
    }
  }, [cartItems, loading, navigate, location.pathname]);

  return (
    <div className="checkout-container">
      {/* Header */}
      <div className="checkout-header">
        <button onClick={() => navigate("/cart")} className="btn-back-to-cart">
          <FaArrowLeft /> Quay lại giỏ hàng
        </button>
        <h2>
          <FaCreditCard /> Thanh Toán Đơn Hàng
        </h2>
      </div>

      {msg && (
        <p className={`message ${msg.includes("Lỗi") ? "error" : "success"}`}>
          {msg}
        </p>
      )}

      {cartItems.length > 0 && (
        <form onSubmit={handlePlaceOrder} className="checkout-layout">
          {/* Customer Information Column */}
          <div className="customer-info">
            <h3>Thông tin liên hệ</h3> {/* Đổi tiêu đề */}
            <div className="form-group">
              <label htmlFor="name">
                <FaUser /> Họ tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Họ tên của bạn"
                className={`form-input-text ${
                  errors.name ? "input-error" : ""
                }`}
                disabled={loading}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone /> Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Số điện thoại của bạn"
                className={`form-input-text ${
                  errors.phone ? "input-error" : ""
                }`}
                disabled={loading}
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
            {/* --- THAY THẾ ĐỊA CHỈ BẰNG CONTACT INFO --- */}
            <div className="form-group">
              <label htmlFor="contact_info">
                <FaLink /> Thông tin liên hệ (Email/FB/Zalo)
              </label>
              <input
                type="text"
                id="contact_info"
                name="contact_info"
                value={formData.contact_info}
                onChange={handleChange}
                placeholder="Nhập Email, link Facebook hoặc Zalo"
                className={`form-input-text ${
                  errors.contact_info ? "input-error" : ""
                }`}
                disabled={loading}
              />
              {errors.contact_info && (
                <p className="error-text">{errors.contact_info}</p>
              )}
            </div>
            {/* --- KẾT THÚC THAY THẾ --- */}
            {/* --- Chỉ còn phần QR Code --- */}
            <h3>Hình thức thanh toán</h3>
            <div className="payment-method-display">
              <FaCreditCard /> Chuyển khoản ngân hàng (VietQR)
            </div>
            {finalTotal > 0 && (
              <div className="qr-code-section">
                <h4>Quét mã VietQR để thanh toán</h4>
                <p>
                  Ngân hàng: <strong>{BANK_ID}</strong>
                </p>
                <p>
                  Số tài khoản: <strong>{ACCOUNT_NO}</strong>
                </p>
                <p>
                  Chủ tài khoản: <strong>{ACCOUNT_NAME}</strong>
                </p>
                <p>
                  Số tiền: <strong>{finalTotal.toLocaleString()}đ</strong>
                </p>
                <p>
                  Nội dung: <strong>{orderDescription}</strong>
                </p>
                <div className="qr-image-wrapper">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="VietQR Code" />
                  ) : (
                    <p>Đang tạo mã QR...</p>
                  )}
                </div>
                <p className="qr-note">
                  Lưu ý: Sau khi quét mã và chuyển khoản thành công, vui lòng
                  nhấn nút "Hoàn tất đặt hàng" bên dưới.
                </p>
              </div>
            )}
            {/* --- KẾT THÚC PHẦN QR --- */}
          </div>

          {/* Order Summary Column */}
          <div className="order-summary-checkout">
            <h3>
              <FaShoppingCart /> Tóm tắt đơn hàng
            </h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.cart_item_id} className="summary-item">
                  <img
                    src={
                      item.product?.image_url ||
                      "https://via.placeholder.com/50"
                    }
                    alt={item.product?.name || "Sản phẩm"}
                  />
                  <div className="summary-item-details">
                    <span>
                      {item.product?.name || "Sản phẩm không tồn tại"} (x
                      {item.quantity})
                    </span>
                    <span>
                      {(
                        (item.product?.price || 0) * item.quantity
                      ).toLocaleString()}
                      đ
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-row">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </div>
            {/* --- BỎ PHÍ SHIP --- */}
            <div className="summary-total">
              <strong>Tổng cộng</strong>
              <strong>{finalTotal.toLocaleString()}đ</strong>
            </div>
            <button
              type="submit"
              className="btn-place-order"
              disabled={loading || cartItems.length === 0}
            >
              <FaPaperPlane /> {loading ? "Đang xử lý..." : "Hoàn tất đặt hàng"}
            </button>
          </div>
        </form>
      )}

      {/* CSS */}
      <style>{`
        /* --- Base & Header --- */
        .checkout-container { max-width: 1000px; margin: 30px auto; padding: 30px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 25px rgba(0, 80, 0, 0.08); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0f2e9; }
        .checkout-header { display: flex; align-items: center; gap: 20px; border-bottom: 1px solid #e8f5e9; padding-bottom: 20px; margin-bottom: 30px; flex-wrap: wrap;}
        .checkout-header h2 { color: #1b5e20; margin: 0; font-size: 1.8rem; display: flex; align-items: center; gap: 12px; flex-grow: 1;}
        .btn-back-to-cart { background: none; border: 1px solid #c8e6c9; color: #2e7d32; padding: 8px 15px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font-weight: 500; transition: background-color 0.2s; white-space: nowrap;}
        .btn-back-to-cart:hover { background-color: #e8f5e9; }

        /* --- Layout --- */
        .checkout-layout { display: flex; gap: 40px; flex-wrap: wrap; }
        .customer-info { flex: 2; min-width: 350px; }
        .order-summary-checkout { flex: 1; min-width: 300px; background-color: #fafffa; border: 1px solid #e0f2e9; border-radius: 12px; padding: 25px; height: fit-content; }
        h3 { color: #2e7d32; margin-top: 0; margin-bottom: 20px; font-size: 1.4rem; padding-bottom: 10px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px; }

        /* --- Form Elements --- */
        .form-group { margin-bottom: 20px; }
        .form-group label { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-weight: 600; color: #2e7d32; font-size: 0.95rem; }
        .form-input-text, .form-group textarea { width: 100%; padding: 12px 15px; border: 1px solid #c8e6c9; border-radius: 8px; box-sizing: border-box; background-color: #fafffa; color: #333; transition: border-color 0.3s ease, box-shadow 0.3s ease; font-size: 1rem; font-family: inherit; }
        .form-group textarea { resize: vertical; min-height: 80px; } /* Giữ lại nếu cần ghi chú */
        .form-input-text:focus, .form-group textarea:focus { outline: none; border-color: #66bb6a; box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.25); }
        .input-error { border-color: #ef9a9a !important; background-color: #fffafa !important; }
        .error-text { color: #d32f2f; font-size: 0.85rem; margin-top: 6px; }

        /* --- Payment Display --- */
         .payment-method-display {
           display: flex; align-items: center; gap: 10px; padding: 15px;
           border: 1px solid #66bb6a; border-radius: 8px; background-color: #e8f5e9;
           font-weight: 600; color: #1b5e20; margin-bottom: 25px;
         }

        /* --- QR Code Section --- */
        .qr-code-section {
            margin-top: 20px; padding: 20px; background-color: #fafffa;
            border: 1px dashed #a5d6a7; border-radius: 8px;
        }
        .qr-code-section h4 { margin-top: 0; color: #1b5e20; font-size: 1.1rem; }
        .qr-code-section p { margin: 5px 0; font-size: 0.95rem; line-height: 1.5; color: #333; }
        .qr-code-section strong { color: #000; }
        .qr-image-wrapper { text-align: center; margin: 15px 0; }
        .qr-image-wrapper img { max-width: 200px; height: auto; border: 1px solid #eee; padding: 5px; background: white; }
        .qr-note { font-size: 0.9rem; font-style: italic; color: #555; margin-top: 15px; }


        /* --- Order Summary --- */
        .summary-items { max-height: 300px; /* Tăng chiều cao nếu cần */ overflow-y: auto; margin-bottom: 20px; padding-right: 10px;}
        .summary-item { display: flex; gap: 10px; margin-bottom: 15px; align-items: center;}
        .summary-item img { width: 50px; height: 50px; border-radius: 6px; object-fit: cover; flex-shrink: 0;}
        .summary-item-details { flex-grow: 1; display: flex; justify-content: space-between; font-size: 0.9rem; flex-wrap: wrap; gap: 5px;}
        .summary-item-details span:first-child { color: #555; word-break: break-word; }
        .summary-item-details span:last-child { font-weight: 500; white-space: nowrap; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 1rem; color: #555; }
        .summary-total { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 15px; border-top: 1px solid #c8e6c9; font-size: 1.25rem; color: #1b5e20; }
        .btn-place-order { width: 100%; padding: 15px; margin-top: 25px; background-color: #2e7d32; color: white; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background-color 0.3s; }
        .btn-place-order:hover:not(:disabled) { background-color: #1b5e20; }
        .btn-place-order:disabled { background-color: #a5d6a7; cursor: not-allowed; }

        /* --- Messages --- */
        .message { margin-bottom: 20px; padding: 15px; border-radius: 10px; font-weight: 500; font-size: 1rem; }
        .message.success { color: #1b5e20; background-color: #e8f5e9; border: 1px solid #c8e6c9; }
        .message.error { color: #c62828; background-color: #ffebee; border: 1px solid #ffcdd2; }

        /* --- Responsive --- */
         @media (max-width: 768px) {
           .checkout-layout { flex-direction: column-reverse; }
           .customer-info, .order-summary-checkout { min-width: unset; }
           .checkout-header {gap: 10px;}
           .checkout-header h2 { font-size: 1.5rem;}
           .btn-back-to-cart {padding: 6px 10px; font-size: 0.9rem;}
         }
      `}</style>
    </div>
  );
}

export default Checkout;
