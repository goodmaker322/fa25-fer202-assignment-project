// Cart.jsx
// Trang Giỏ hàng: Hiển thị, cập nhật, xóa, điều hướng đến Checkout
// Sử dụng localStorage
// Cập nhật: 26/10/2025

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaCreditCard, FaStore } from "react-icons/fa";

// API Endpoint for products
const PRODUCTS_API_URL = "http://localhost:9999/products";

function Cart({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // --- localStorage Helper Functions ---
  const getCartFromStorage = useCallback(() => {
    if (!user || !user.id) return [];
    try {
      return JSON.parse(localStorage.getItem("userCart") || "[]");
    } catch (e) {
      console.error("Error parsing cart from localStorage", e);
      return [];
    }
  }, [user]);

  const saveCartToStorage = (cartData) => {
    localStorage.setItem("userCart", JSON.stringify(cartData));
    setCartItems(cartData);
  };
  // --- End Helper Functions ---

  // 1. Fetch products AND load cart from localStorage
  useEffect(() => {
    if (!user || !user.id) {
      setLoading(false);
      setMsg("Vui lòng đăng nhập để xem giỏ hàng.");
      return;
    }

    const fetchProductsAndLoadCart = async () => {
      setLoading(true);
      setMsg("");
      try {
        const productsRes = await fetch(PRODUCTS_API_URL);
        if (!productsRes.ok) {
          throw new Error("Không thể tải danh sách sản phẩm.");
        }
        const productsData = await productsRes.json();
        setProducts(productsData);

        const storedCart = getCartFromStorage();
        setCartItems(storedCart);
      } catch (error) {
        setMsg(`Lỗi: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndLoadCart();
  }, [user, getCartFromStorage]);

  // 2. Combine cart items with product details
  const populatedCart = useMemo(() => {
    if (products.length === 0) return [];
    return cartItems
      .map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        return { ...item, product: product || null };
      })
      .filter((item) => item.product);
  }, [cartItems, products]);

  // 3. Calculate total price
  const totalPrice = useMemo(() => {
    return populatedCart.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  }, [populatedCart]);

  // 4. Handle quantity change
  const handleQuantityChange = (cart_item_id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(cart_item_id);
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.cart_item_id === cart_item_id
        ? { ...item, quantity: newQuantity }
        : item
    );
    saveCartToStorage(updatedCart);
  };

  // 5. Handle item removal
  const handleRemoveItem = (cart_item_id) => {
    const updatedCart = cartItems.filter(
      (item) => item.cart_item_id !== cart_item_id
    );
    saveCartToStorage(updatedCart);
  };

  // --- Checkout handler - Navigates to /checkout ---
  const handleCheckout = () => {
    if (populatedCart.length === 0) {
      setMsg("Giỏ hàng trống, không thể thanh toán.");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    // Navigate to the single checkout page
    navigate("/checkout", {
      state: {
        cartItems: populatedCart,
        subtotal: totalPrice,
      },
    });
  };
  // --- END Checkout handler ---

  // Render logic
  if (loading) {
    return (
      <div className="cart-container">
        <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (!user || !user.id) {
    return (
      <div className="cart-container">
        <h2>
          <FaShoppingCart /> Giỏ Hàng
        </h2>
        <p className="cart-empty">
          Vui lòng <a href="/login">đăng nhập</a> để xem giỏ hàng của bạn.
        </p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <h2>
          <FaShoppingCart /> Giỏ Hàng Của Bạn
        </h2>
        <button className="btn-shopping" onClick={() => navigate("/")}>
          <FaStore /> Tiếp tục mua sắm
        </button>
      </div>

      {msg && (
        <p className={`message ${msg.includes("Lỗi") ? "error" : "success"}`}>
          {msg}
        </p>
      )}

      {populatedCart.length === 0 ? (
        <p className="cart-empty">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="cart-layout">
          {/* Items List */}
          <div className="cart-items-list">
            {populatedCart.map((item) => (
              <div key={item.cart_item_id} className="cart-item">
                <img
                  src={
                    item.product.image_url || "https://via.placeholder.com/80"
                  }
                  alt={item.product.name}
                />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p className="item-price">
                    {item.product.price.toLocaleString()}đ
                  </p>
                </div>
                <div className="item-quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.cart_item_id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.cart_item_id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="item-total-price">
                  {(item.product.price * item.quantity).toLocaleString()}đ
                </div>
                <div className="item-remove">
                  <button onClick={() => handleRemoveItem(item.cart_item_id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h3>Tóm tắt đơn hàng</h3>
            <div className="summary-row">
              <span>Tạm tính</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span>Sẽ tính ở bước sau</span>
            </div>
            <div className="summary-total">
              <strong>Tổng cộng</strong>
              <strong>{totalPrice.toLocaleString()}đ</strong>
            </div>
            <button
              className="btn-checkout"
              onClick={handleCheckout} // Calls navigate function
              disabled={populatedCart.length === 0}
            >
              <FaCreditCard /> Tiến hành thanh toán
            </button>
          </div>
        </div>
      )}

      {/* CSS */}
      <style>{`
        /* ... (CSS from previous Cart.jsx) ... */
        .cart-container { max-width: 1200px; margin: 30px auto; padding: 30px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 25px rgba(0, 80, 0, 0.08); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0f2e9; min-height: 400px; }
        .cart-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; border-bottom: 1px solid #e8f5e9; padding-bottom: 20px; margin-bottom: 30px; }
        .cart-header h2 { color: #1b5e20; margin: 0; font-size: 2rem; display: flex; align-items: center; gap: 12px; }
        .btn-shopping { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background-color: #fafffa; color: #2e7d32; border: 1px solid #c8e6c9; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
        .btn-shopping:hover { background-color: #e8f5e9; border-color: #a5d6a7; }
        .cart-empty { font-size: 1.1rem; color: #555; text-align: center; padding: 50px 0; }
        .cart-layout { display: flex; gap: 30px; flex-wrap: wrap; }
        .cart-items-list { flex: 3; min-width: 400px; display: flex; flex-direction: column; gap: 20px; }
        .cart-item { display: flex; align-items: center; gap: 15px; padding: 15px; border: 1px solid #e8f5e9; border-radius: 12px; background: #fafffa; flex-wrap: wrap; }
        .cart-item img { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; border: 1px solid #e0f2e9; flex-shrink: 0; }
        .item-details { flex: 2; min-width: 150px; }
        .item-details h3 { margin: 0 0 5px 0; font-size: 1.1rem; color: #333; word-break: break-word; }
        .item-price { margin: 0; font-size: 0.95rem; color: #555; }
        .item-quantity { display: flex; align-items: center; gap: 8px; margin: 5px 0; }
        .item-quantity button { width: 30px; height: 30px; border-radius: 50%; border: 1px solid #c8e6c9; background-color: white; color: #2e7d32; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
        .item-quantity button:hover { background-color: #e8f5e9; }
        .item-quantity span { font-weight: 600; min-width: 25px; text-align: center; }
        .item-total-price { flex: 1; min-width: 100px; text-align: right; font-weight: bold; color: #1b5e20; font-size: 1.1rem; margin: 5px 0; }
        .item-remove { margin-left: auto; padding-left: 10px; }
        .item-remove button { background: transparent; border: none; color: #d32f2f; font-size: 1.2rem; cursor: pointer; transition: color 0.2s; padding: 5px; }
        .item-remove button:hover { color: #c62828; }
        .cart-summary { flex: 1; min-width: 300px; background-color: #fafffa; border: 1px solid #e0f2e9; border-radius: 12px; padding: 25px; height: fit-content; }
        .cart-summary h3 { color: #1b5e20; margin-top: 0; border-bottom: 1px solid #e0f2e9; padding-bottom: 10px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 1rem; color: #555; }
        .summary-total { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 15px; border-top: 1px solid #c8e6c9; font-size: 1.25rem; color: #1b5e20; }
        .btn-checkout { width: 100%; padding: 15px; margin-top: 20px; background-color: #2e7d32; color: white; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background-color 0.3s; }
        .btn-checkout:hover:not(:disabled) { background-color: #1b5e20; }
        .btn-checkout:disabled { background-color: #a5d6a7; cursor: not-allowed; opacity: 0.7; }
        .message { margin-bottom: 20px; padding: 15px; border-radius: 10px; font-weight: 500; font-size: 1rem; }
        .message.success { color: #1b5e20; background-color: #e8f5e9; border: 1px solid #c8e6c9; }
        .message.error { color: #c62828; background-color: #ffebee; border: 1px solid #ffcdd2; }
        @media (max-width: 768px) { .cart-item { flex-direction: column; align-items: flex-start; } .item-quantity { margin: 10px 0; } .item-total-price, .item-remove { width: 100%; text-align: left; margin-top: 5px; } .item-remove { text-align: right; } }
      `}</style>
    </div>
  );
}

export default Cart;
