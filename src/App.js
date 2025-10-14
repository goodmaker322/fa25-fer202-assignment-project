import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// Import Styles
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/pages.css";

// Import Pages
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import PortfolioPage from "./pages/PortfolioPage";
import PricingPage from "./pages/PricingPage";
import ServicesPage from "./pages/ServicesPage";

// Import Components
import ScrollToTop from "./components/common/ScrollToTop";
import LoadingProvider from "./components/providers/LoadingProvider";
import NotificationProvider from "./components/providers/NotificationProvider";

// 404 Not Found Component
const NotFound = () => (
  <div className="seogo-not-found-page">
    <div className="container">
      <div className="seogo-not-found-content text-center">
        <div className="seogo-404-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h1>404</h1>
        <h2>Trang không tìm thấy</h2>
        <p>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="seogo-404-actions">
          <a href="/" className="btn btn-primary btn-lg">
            <i className="fas fa-home"></i>
            Về trang chủ
          </a>
          <a href="/services" className="btn btn-outline-primary btn-lg">
            <i className="fas fa-cogs"></i>
            Xem dịch vụ
          </a>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        {/* Global Providers */}
        <LoadingProvider>
          <NotificationProvider>
            {/* Scroll to top on route change */}
            <ScrollToTop />

            {/* Main Routes */}
            <Routes>
              {/* Homepage */}
              <Route path="/" element={<HomePage />} />

              {/* Services Page */}
              <Route path="/services" element={<ServicesPage />} />

              {/* Portfolio Page */}
              <Route path="/portfolio" element={<PortfolioPage />} />

              {/* Pricing Page */}
              <Route path="/pricing" element={<PricingPage />} />

              {/* Contact Page */}
              <Route path="/contact" element={<ContactPage />} />

              {/* About Page - redirect to home for now */}
              <Route path="/about" element={<HomePage />} />

              {/* Blog Page - redirect to home for now */}
              <Route path="/blog" element={<HomePage />} />

              {/* Individual Service Routes */}
              <Route
                path="/services/website-design"
                element={<ServicesPage />}
              />
              <Route path="/services/ecommerce" element={<ServicesPage />} />
              <Route path="/services/mobile-app" element={<ServicesPage />} />
              <Route
                path="/services/digital-marketing"
                element={<ServicesPage />}
              />
              <Route path="/services/branding" element={<ServicesPage />} />
              <Route path="/services/maintenance" element={<ServicesPage />} />

              {/* Portfolio Project Routes */}
              <Route path="/portfolio/:projectId" element={<PortfolioPage />} />

              {/* Pricing Plan Routes */}
              <Route path="/pricing/starter" element={<PricingPage />} />
              <Route path="/pricing/professional" element={<PricingPage />} />
              <Route path="/pricing/enterprise" element={<PricingPage />} />

              {/* Contact Form Success */}
              <Route path="/contact/success" element={<ContactPage />} />

              {/* Quote Request Success */}
              <Route path="/quote/success" element={<ContactPage />} />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Global Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              className="seogo-toast-container"
            />
          </NotificationProvider>
        </LoadingProvider>
      </div>
    </Router>
  );
}

export default App;
