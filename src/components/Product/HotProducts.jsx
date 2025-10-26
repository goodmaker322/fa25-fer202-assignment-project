// HotProducts.jsx
// Hiển thị sản phẩm nổi bật dạng Carousel (5 ngẫu nhiên, 1 slide/view)
// Autoplay 2s, có nút next/prev
// Cập nhật: 26/10/2025

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import Slider lại

// Import CSS cho react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Optional: Import icons for custom arrows if desired
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Optional: Custom Arrow components
// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-arrow next-arrow`}
//       style={{ ...style }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-arrow prev-arrow`}
//       style={{ ...style }}
//       onClick={onClick}
//     />
//   );
// }

function HotProducts() {
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy 5 sản phẩm ngẫu nhiên
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:9999/products?is_active=true")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = [...data];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setRandomProducts(shuffled.slice(0, 5)); // Lấy 5 sản phẩm
      })
      .catch((err) => console.error("Lỗi tải sản phẩm ngẫu nhiên:", err))
      .finally(() => setLoading(false));
  }, []);

  // --- CẬP NHẬT CẤU HÌNH CAROUSEL ---
  const settings = {
    dots: true, // Hiển thị chấm điều hướng
    infinite: true, // Lặp vô hạn
    speed: 500, // Tốc độ chuyển slide (ms)
    slidesToShow: 1, // **Chỉ hiển thị 1 slide**
    slidesToScroll: 1, // Chuyển 1 slide mỗi lần
    autoplay: true, // Tự động chạy
    autoplaySpeed: 2000, // **Tự chuyển sau 2 giây**
    pauseOnHover: true, // Dừng khi rê chuột vào
    arrows: true, // **Hiển thị nút next/prev**
    // Optional: Use custom arrows if you defined them
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };
  // --- KẾT THÚC CẬP NHẬT ---

  if (loading) {
    return <div className="hot-products-container loading">Đang tải...</div>;
  }

  if (randomProducts.length === 0) {
    return null;
  }

  return (
    <div className="hot-products-container carousel-mode">
      {" "}
      {/* Added class */}
      <h2 className="hot-products-title">
        🔥 Gói Dịch Vụ Được Ưa Chuộng Nhất 🔥
      </h2>
      {/* --- SỬ DỤNG SLIDER --- */}
      <Slider {...settings}>
        {randomProducts.map((p) => (
          // Mỗi sản phẩm là một slide
          <div key={p.id} className="hot-product-slide">
            <Link to={`/product/${p.id}`} className="hot-product-link">
              {" "}
              {/* Link bao quanh nội dung */}
              <div className="hot-product-image-c">
                {" "}
                {/* New class */}
                <img
                  src={
                    p.image_url ||
                    "https://via.placeholder.com/600x300?text=Service"
                  } // Ảnh rộng hơn
                  alt={p.name}
                />
              </div>
              <h3 className="hot-product-name-c">{p.name}</h3> {/* New class */}
            </Link>
          </div>
        ))}
      </Slider>
      {/* --- KẾT THÚC SLIDER --- */}
      {/* CSS */}
      <style>{`
        .hot-products-container.carousel-mode { /* Target this specific layout */
          max-width: 900px; /* Có thể điều chỉnh chiều rộng tối đa */
          margin: 0 auto 20px auto;
          padding: 25px 40px; /* Thêm padding ngang cho mũi tên */
          background-color: #5ef16a9d;
          border-radius: 16px;
          border: 1px solid #e0f2e9;
          box-shadow: 0 4px 15px rgba(0, 80, 0, 0.06);
          position: relative; /* Needed for arrow positioning */
        }
        .hot-products-container.loading { text-align: center; color: #888; padding: 30px; }

        .hot-products-title {
          text-align: center; color: #eb1515ff;
          margin-top: 0; margin-bottom: 25px;
          font-size: 1.6rem; font-weight: 600;
        }

        /* --- Styling cho react-slick --- */
        .slick-slider {
            position: relative;
            display: block;
            box-sizing: border-box;
            user-select: none;
            touch-action: pan-y;
            -webkit-tap-highlight-color: transparent;
        }
        .slick-list {
            position: relative;
            display: block;
            overflow: hidden; /* Quan trọng */
            margin: 0;
            padding: 0;
        }
        .slick-track {
            position: relative;
            top: 0;
            left: 0;
            display: flex; /* Quan trọng */
            margin-left: auto;
            margin-right: auto;
        }
        .slick-slide {
            display: block; /* Quan trọng */
            height: 100%; /* Quan trọng */
            min-height: 1px;
             float: left; /* Cần thiết cho hoạt động của slick */
             padding: 0 10px; /* Khoảng cách nhỏ giữa các slide (nếu > 1 slide) */
             box-sizing: border-box;
        }
        .slick-slide img {
            display: block; /* Loại bỏ khoảng trắng */
            width: 100%; /* Đảm bảo ảnh chiếm hết chiều rộng slide */
        }
        .slick-dots {
          bottom: -20px; /* Đẩy chấm xuống dưới */
        }
        .slick-dots li button:before { font-size: 12px; color: #a5d6a7; opacity: 0.7; }
        .slick-dots li.slick-active button:before { color: #4caf50; opacity: 1; }

        /* --- Styling cho mũi tên mặc định --- */
        .slick-prev, .slick-next {
            z-index: 1; /* Nằm trên slide */
            width: 40px; /* Kích thước nút */
            height: 40px;
            background-color: rgba(255, 255, 255, 0.7); /* Nền mờ */
            border-radius: 50%;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
             transition: background-color 0.2s ease;
        }
         .slick-prev:hover, .slick-next:hover {
             background-color: rgba(255, 255, 255, 0.9);
         }

        .slick-prev { left: -15px; } /* Điều chỉnh vị trí mũi tên */
        .slick-next { right: -15px; }

        .slick-prev:before, .slick-next:before {
            font-family: 'slick'; /* Font mặc định của slick */
            font-size: 24px;
            line-height: 1;
            opacity: .75;
            color: #2e7d32; /* Màu xanh lá đậm */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
         .slick-prev:hover:before, .slick-next:hover:before {
            color: #1b5e20; /* Đậm hơn khi hover */
         }


        /* --- Styling cho nội dung Slide --- */
        .hot-product-slide {
             outline: none; /* Bỏ viền xanh khi focus */
             box-sizing: border-box;
        }
        .hot-product-link { /* Link bao quanh */
             display: block;
             text-decoration: none;
             color: inherit;
             border-radius: 12px;
             overflow: hidden;
             background-color: #f8fdf8; /* Nền xanh rất nhạt */
             border: 1px solid #e0f2e9;
             transition: box-shadow 0.2s ease;
        }
         .hot-product-link:hover {
             box-shadow: 0 4px 10px rgba(0, 80, 0, 0.1);
         }

        .hot-product-image-c { /* Class mới cho ảnh carousel */
          width: 100%;
          height: 250px; /* Chiều cao cố định, có thể điều chỉnh */
          overflow: hidden;
          background-color: #e8f5e9; /* Màu nền chờ ảnh load */
        }
        .hot-product-image-c img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hot-product-name-c { /* Class mới cho tên carousel */
          color: #2e7d32;
          font-size: 1.2rem; /* Tăng kích thước chữ */
          font-weight: 600;
          margin: 0;
          padding: 15px 20px; /* Tăng padding */
          text-align: center;
          white-space: nowrap; /* Ngăn xuống dòng */
          overflow: hidden;
          text-overflow: ellipsis; /* Thêm ... nếu tên quá dài */
        }

        /* --- Optional: Custom Arrow Styles --- */
        /*
        .custom-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            cursor: pointer;
            // Add your custom styles (background, size, icon color)
        }
        .next-arrow { right: -25px; }
        .prev-arrow { left: -25px; }
        */

      `}</style>
    </div>
  );
}

export default HotProducts;
