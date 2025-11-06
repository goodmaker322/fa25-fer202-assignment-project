import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

// --- CẬP NHẬT Filter Options ---
// Các gói dịch vụ (filter theo tên chứa keyword)
const categories = [
  { id: "all", name: "Tất cả các gói" }, // Thay đổi tên cho rõ ràng hơn
  { id: "basic", name: "Gói Cơ bản" }, // Keyword: 'gói cơ bản'
  { id: "standard", name: "Gói Tiêu chuẩn" }, // Keyword: 'gói tiêu chuẩn'
  { id: "premium", name: "Gói Cao cấp" }, // Keyword: 'gói cao cấp'
  { id: "comprehensive", name: "Gói Toàn Diện" }, // Keyword: 'gói toàn diện'
];

// Loại dịch vụ (filter theo tên chứa keyword 'backlink' hoặc 'seo')
const serviceTypes = [
  { id: "all", name: "Tất cả loại DV" },
  { id: "backlink", name: "Backlink" }, // Keyword: 'backlink'
  { id: "seo", name: "SEO" }, // Keyword: 'seo'
];

// Khoảng giá
const priceRanges = [
  { id: "all", name: "Tất cả giá", min: 0, max: Infinity },
  { id: "0-1m", name: "Dưới 1 triệu", min: 0, max: 999999 },
  { id: "1m-3m", name: "Từ 1 - 3 triệu", min: 1000000, max: 2999999 },
  { id: "3m-5m", name: "Từ 3 - 5 triệu", min: 3000000, max: 4999999 },
  { id: "5m+", name: "Trên 5 triệu", min: 5000000, max: Infinity },
];
// --- End Filter Options ---

function ProductList({ user, onAddToCart }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedServiceType, setSelectedServiceType] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetching Data
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:9999/products?is_active=true")
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to fetch")))
      .then((data) => {
        setAllProducts(data || []);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
        setAllProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let tempFiltered = [...allProducts];

    // 1. Filter by Category (using keywords from category NAME in product NAME)
    if (selectedCategory !== "all") {
      const categoryObj = categories.find((cat) => cat.id === selectedCategory);
      if (categoryObj) {
        const categoryKeyword = categoryObj.name.toLowerCase();
        tempFiltered = tempFiltered.filter((p) =>
          p.name.toLowerCase().includes(categoryKeyword)
        );
      }
    }

    // 2. Filter by Service Type (using keyword "backlink" or "seo" in product NAME)
    if (selectedServiceType !== "all") {
      const typeKeyword = selectedServiceType.toLowerCase();
      tempFiltered = tempFiltered.filter((p) =>
        p.name.toLowerCase().includes(typeKeyword)
      );
    }

    // 3. Filter by Price Range (remains the same)
    if (selectedPriceRange !== "all") {
      const range = priceRanges.find((r) => r.id === selectedPriceRange);
      if (range) {
        // Chuyển đổi giá sản phẩm sang số trước khi so sánh, phòng trường hợp data có giá dạng string
        tempFiltered = tempFiltered.filter((p) => {
          const priceNum = Number(p.price);
          return (
            !isNaN(priceNum) && priceNum >= range.min && priceNum <= range.max
          );
        });
      }
    }

    // 4. Filter by Search Term (remains the same)
    if (searchTerm.trim() !== "") {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempFiltered = tempFiltered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearchTerm) ||
          (p.description &&
            p.description.toLowerCase().includes(lowerSearchTerm))
      );
    }

    setFilteredProducts(tempFiltered);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    selectedServiceType,
    selectedPriceRange,
    allProducts,
  ]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const listElement = document.querySelector(".product-list-container");
    if (listElement) {
      listElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">
        🌿 Danh sách gói dịch vụ Backlink Entity
      </h2>

      <div className="list-layout">
        {/* --- Left Menu --- */}
        <aside className="left-menu integrated">
          {/* Categories */}
          <div className="filter-group">
            <h3>Gói Dịch Vụ</h3>
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={selectedCategory === category.id ? "active" : ""}
                  onClick={() => setSelectedCategory(category.id)}>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Service Type */}
          <div className="filter-group">
            <h3>Loại Dịch Vụ</h3>
            <ul>
              {serviceTypes.map((type) => (
                <li
                  key={type.id}
                  className={selectedServiceType === type.id ? "active" : ""}
                  onClick={() => setSelectedServiceType(type.id)}>
                  {type.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h3>Khoảng Giá</h3>
            <ul>
              {priceRanges.map((range) => (
                <li
                  key={range.id}
                  className={selectedPriceRange === range.id ? "active" : ""}
                  onClick={() => setSelectedPriceRange(range.id)}>
                  {range.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Right Content (Search, Grid, Pagination - No structural changes needed) */}
        <div className="right-product-content">
          <div className="search-bar-container integrated">
            <FaSearch className="search-icon" />
            <input
              type="search"
              placeholder="Tìm theo tên, mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {loading ? (
            <p className="loading-text">Đang tải dịch vụ...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="no-products-found">Không tìm thấy dịch vụ phù hợp.</p>
          ) : (
            <>
              <div className="product-grid fixed-columns">
                {currentProducts.map((p) => (
                  <div key={p.id} className="product-card">
                    <div className="product-card-inner">
                      <div className="product-card-image">
                        <img
                          src={
                            p.image_url ||
                            "https://via.placeholder.com/300x180?text=Service"
                          }
                          alt={p.name}
                        />
                      </div>
                      <h3 className="product-card-name">{p.name}</h3>
                      <p className="product-card-price">
                        💰 {Number(p.price).toLocaleString()}đ
                      </p>
                      <div className="product-actions">
                        <Link
                          to={`/product/${p.id}`}
                          className="btn-product btn-view-details">
                          🔍 Xem chi tiết
                        </Link>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="btn-product btn-add-cart">
                          <FaShoppingCart /> Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination-controls">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`page-btn ${
                          currentPage === page ? "active" : ""
                        }`}
                        disabled={currentPage === page}>
                        {page}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        /* Keep all previous styles */
        .product-list-container { padding: 20px 0; }
        .product-list-title { text-align: center; color: #2e7d32; margin-bottom: 30px; border-bottom: 2px solid #a5d6a7; padding-bottom: 10px; font-size: 1.6rem; font-weight: 600; }
        .list-layout { display: flex; gap: 25px; align-items: flex-start; }
        .right-product-content { flex-grow: 1; display: flex; flex-direction: column; gap: 25px; min-width: 0; }
        .search-bar-container.integrated { display: flex; align-items: center; background-color: white; border: 1px solid #c8e6c9; border-radius: 8px; padding: 10px 15px; box-shadow: 0 1px 3px rgba(0,80,0,0.05); }
        .search-icon { color: #66bb6a; margin-right: 10px; font-size: 1.1rem; flex-shrink: 0; }
        .search-input { border: none; outline: none; flex-grow: 1; font-size: 1rem; background-color: transparent; width: 100%; }
        .search-input::placeholder { color: #aaa; }
        .loading-text, .no-products-found { text-align: center; padding: 60px 20px; font-size: 1.1rem; color: #555; }

        /* Left Menu */
        .left-menu.integrated { background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e0f2e9; box-shadow: 0 2px 5px rgba(0,80,0,0.05); width: 230px; flex-shrink: 0; height: fit-content; display: flex; flex-direction: column; gap: 15px; }
        .filter-group h3 { margin-top: 0; margin-bottom: 10px; color: #1b5e20; font-size: 1.1rem; border-bottom: 1px solid #e0f2e9; padding-bottom: 8px; }
        .filter-group ul { list-style: none; padding: 0; margin: 0; }
        .filter-group li { padding: 8px 10px; margin-bottom: 4px; cursor: pointer; border-radius: 5px; color: #333; font-weight: 500; font-size: 0.9rem; transition: background-color 0.2s ease, color 0.2s ease; word-break: break-word; }
        .filter-group li:hover { background-color: #e8f5e9; color: #1b5e20; }
        .filter-group li.active { background-color: #4caf50; color: white; font-weight: 600; }

        /* Grid & Card */
        .product-grid.fixed-columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
        .product-card { background-color: white; border: 1px solid #c8e6c9; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.07); transition: transform 0.2s ease, box-shadow 0.2s ease; display: flex; overflow: hidden; }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 6px 12px rgba(0,80,0,0.1); }
        .product-card-inner { display: flex; flex-direction: column; width: 100%; padding: 0; }
        .product-card-image { width: 100%; height: 180px; background-color: #e8f5e9; }
        .product-card-image img { width: 100%; height: 100%; object-fit: cover; display: block;}
        .product-card-name { color: #2e7d32; margin: 12px 15px 8px 15px; flex-grow: 1; font-size: 1.1rem; line-height: 1.4; min-height: calc(1.4em * 2); font-weight: 600; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; }
        .product-card-price { font-weight: bold; color: #1b5e20; margin: 8px 15px; font-size: 1.15rem; text-align: center; }
        .product-actions { display: flex; gap: 10px; margin: 0 15px 15px 15px; padding-top: 10px; border-top: 1px solid #f0f0f0; justify-content: space-between; }
        .product-actions .btn-product { flex: 1; text-align: center; justify-content: center;}

        /* Pagination */
        .pagination-controls { display: flex; justify-content: center; align-items: center; margin-top: 35px; gap: 10px; flex-wrap: wrap; }
        .page-btn { background-color: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; border-radius: 6px; padding: 8px 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; min-width: 40px; line-height: 1; }
        .page-btn:hover:not(:disabled) { background-color: #c8e6c9; }
        .page-btn.active { background-color: #4caf50; color: white; border-color: #4caf50; cursor: default; }
        .page-btn:disabled { cursor: default; opacity: 0.8; }

        /* Buttons */
        .btn-product { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease; border: none; }
        .btn-view-details { background-color: #f0f4f8; color: #334e68; border: 1px solid #d9e2ec; }
        .btn-view-details:hover { background-color: #d9e2ec; }
        .btn-add-cart { background-color: #4caf50; color: white; border: 1px solid #4caf50; }
        .btn-add-cart:hover { background-color: #388e3c; border-color: #388e3c; }

        /* Responsive */
        @media (max-width: 992px) { .product-grid.fixed-columns { grid-template-columns: repeat(2, 1fr); } .left-menu.integrated { width: 180px; } }
        @media (max-width: 768px) { .list-layout { flex-direction: column; } .left-menu.integrated { width: 100%; margin-bottom: 20px; } .left-menu.integrated ul { display: flex; flex-wrap: wrap; gap: 8px; } .left-menu.integrated li { margin-bottom: 0; flex-grow: 1; text-align: center;} .product-grid.fixed-columns { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .product-grid.fixed-columns { grid-template-columns: repeat(1, 1fr); } .product-actions { flex-direction: row; } }
      `}</style>
    </div>
  );
}

export default ProductList;
