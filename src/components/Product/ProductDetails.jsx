// ProductDetails.jsx
// Giao diện tương lai - hiển thị chi tiết sản phẩm cao cấp (hiệu ứng 3D nâng cao)
// Cập nhật: 26/10/2025

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

function ProductDetails({ user, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchErrorMsg, setFetchErrorMsg] = useState("");
  const [cartMsg, setCartMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    setFetchErrorMsg("");
    setCartMsg("");
    fetch(`http://localhost:9999/products/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          let errorText = "Không tìm thấy sản phẩm hoặc có lỗi xảy ra.";
          try {
            const errBody = await res.json();
            errorText = errBody.message || errorText;
          } catch (e) {}
          throw new Error(errorText);
        }
        return res.json();
      })
      .then(setProduct)
      .catch((err) => {
        console.error("Lỗi tải chi tiết sản phẩm:", err);
        setFetchErrorMsg(`❌ ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCartClick = () => {
    setCartMsg("");
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (product && onAddToCart) {
      const success = onAddToCart(product);
      setCartMsg(
        success
          ? `✅ Đã thêm ${product.name} vào giỏ hàng!`
          : "❌ Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại."
      );
      setTimeout(() => setCartMsg(""), 3000);
    } else {
      setCartMsg("⚠️ Không thể thêm sản phẩm vào lúc này.");
      setTimeout(() => setCartMsg(""), 3000);
    }
  };

  if (loading)
    return (
      <div className="product-loader">
        <div className="spinner" />
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );

  if (fetchErrorMsg || !product)
    return (
      <div className="error-view">
        <h2>{fetchErrorMsg || "Sản phẩm không tồn tại"}</h2>
        <button onClick={() => navigate("/")} className="btn-back-home">
          <FaArrowLeft /> Quay lại trang chủ
        </button>
      </div>
    );

  return (
    <div className="product-details-futuristic">
      <button className="btn-back" onClick={() => navigate("/")}>
        <FaArrowLeft /> Tiếp tục mua sắm
      </button>

      {cartMsg && (
        <div
          className={`cart-message ${
            cartMsg.includes("Lỗi") || cartMsg.includes("⚠️")
              ? "error"
              : "success"
          }`}
        >
          {cartMsg}
        </div>
      )}

      <div className="details-grid">
        {/* ✅ Khu vực ảnh có hiệu ứng 3D */}
        <div
          className="image-zone"
          onMouseMove={(e) => {
            const img = e.currentTarget.querySelector("img");
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x - rect.width / 2) / rect.width) * 20;
            const rotateX = ((rect.height / 2 - y) / rect.height) * 20;
            img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector("img");
            img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
          }}
        >
          <div className="glow-light" />
          <img
            src={product.image_url || "https://via.placeholder.com/500"}
            alt={product.name}
          />
        </div>

        {/* ✅ Khu vực thông tin */}
        <div className="info-zone">
          <h1 className="name">{product.name}</h1>
          <p className="desc">{product.description}</p>

          <div className="price-box">
            <span className="price">
              {product.price.toLocaleString()}{" "}
              <span className="currency">₫</span>
            </span>
          </div>

          <div className="feature-list">
            <h3>✨ Nổi bật</h3>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  product.details?.replace(/\n/g, "<br />") ||
                  "Chưa có thông tin chi tiết.",
              }}
            />
          </div>

          <button className="btn-buy" onClick={handleAddToCartClick}>
            <FaShoppingCart /> Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* ✅ Hiệu ứng & giao diện */}
      <style>{`
        .product-details-futuristic {
          position: relative;
          margin: 60px auto;
          padding: 50px;
          max-width: 1150px;
          border-radius: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #f4f9f4 40%, #e6f7ff 100%);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow: 0 0 30px rgba(0,0,0,0.15);
          overflow: hidden;
        }

        .btn-back {
          position: absolute;
          top: 25px;
          left: 25px;
          background: transparent;
          color: #333;
          border: 1px solid #c8e6c9;
          padding: 10px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-back:hover { background: #e8f5e9; color: #1b5e20; }

        .details-grid {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          margin-top: 40px;
        }

        /* ✅ 3D Image Zone */
        .image-zone {
          flex: 1 1 45%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          perspective: 1000px;
          cursor: pointer;
        }

        .image-zone img {
          width: 100%;
          max-width: 500px;
          border-radius: 18px;
          object-fit: cover;
          transition: transform 0.15s ease-out, box-shadow 0.3s ease;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          transform-style: preserve-3d;
        }

        .image-zone:hover img {
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
        }

        .glow-light {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), transparent 60%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .image-zone:hover .glow-light {
          opacity: 1;
        }

        .info-zone {
          flex: 1 1 50%;
          display: flex;
          flex-direction: column;
          color: #222;
        }

        .name {
          font-size: 2.4rem;
          font-weight: 700;
          background: linear-gradient(90deg, #2e7d32, #1b5e20);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .desc {
          color: #555;
          font-size: 1.1rem;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .price-box {
          margin: 20px 0;
          background: #e8f5e9;
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
        }

        .price {
          font-size: 2.2rem;
          font-weight: 700;
          color: #2e7d32;
        }
        .currency { font-size: 1.2rem; opacity: 0.8; }

        .feature-list {
          margin-top: 25px;
          padding: 20px;
          border-radius: 14px;
          background: #f9f9f9;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
        }

        .feature-list h3 {
          color: #388E3C;
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .btn-buy {
          margin-top: 30px;
          background: linear-gradient(90deg, #43A047, #2E7D32);
          color: white;
          border: none;
          padding: 16px;
          font-size: 1.2rem;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 6px 15px rgba(67,160,71,0.3);
        }
        .btn-buy:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(67,160,71,0.4); }

        .cart-message {
          margin: 20px 0;
          text-align: center;
          font-weight: 600;
          padding: 15px;
          border-radius: 10px;
          animation: fadeIn 0.5s ease;
        }
        .cart-message.success { background: #e8f5e9; color: #1b5e20; }
        .cart-message.error { background: #ffebee; color: #c62828; }

        .product-loader, .error-view {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          color: #444;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 5px solid #e0e0e0;
          border-top: 5px solid #43A047;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .product-details-futuristic { padding: 30px; }
          .details-grid { flex-direction: column; align-items: center; }
          .image-zone img { max-width: 100%; }
          .name { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
}

export default ProductDetails;
