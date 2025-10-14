import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="seogo-hero-banner">
      <Container>
        <Row className="align-items-center min-vh-100">
          {/* Hero Content */}
          <Col lg={6} className="seogo-hero-content">
            <div className="seogo-hero-text">
              <h1 className="seogo-hero-title">
                Thiết Kế Website
                <span className="seogo-hero-highlight"> Chuyên Nghiệp</span>
                <br />
                Tối Ưu SEO
              </h1>

              <p className="seogo-hero-subtitle">
                Chúng tôi tạo ra những website đẹp, nhanh và hiệu quả để giúp
                doanh nghiệp của bạn phát triển mạnh mẽ trên môi trường số.
              </p>

              <ul className="seogo-hero-features">
                <li className="seogo-hero-feature">
                  <i className="fas fa-check seogo-feature-icon"></i>
                  Thiết kế responsive trên mọi thiết bị
                </li>
                <li className="seogo-hero-feature">
                  <i className="fas fa-check seogo-feature-icon"></i>
                  Tối ưu SEO từ khâu thiết kế
                </li>
                <li className="seogo-hero-feature">
                  <i className="fas fa-check seogo-feature-icon"></i>
                  Tốc độ tải trang siêu nhanh
                </li>
                <li className="seogo-hero-feature">
                  <i className="fas fa-check seogo-feature-icon"></i>
                  Bảo hành và hỗ trợ 24/7
                </li>
              </ul>

              <div className="seogo-hero-cta">
                <Button
                  as={Link}
                  to="/contact"
                  variant="primary"
                  size="lg"
                  className="seogo-btn-primary me-3"
                >
                  Nhận Tư Vấn Miễn Phí
                </Button>

                <Button
                  as={Link}
                  to="/portfolio"
                  variant="outline-primary"
                  size="lg"
                  className="seogo-btn-secondary"
                >
                  Xem Portfolio
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="seogo-hero-stats">
                <div className="seogo-stat-item">
                  <span className="seogo-stat-number">100+</span>
                  <span className="seogo-stat-label">Dự án hoàn thành</span>
                </div>
                <div className="seogo-stat-item">
                  <span className="seogo-stat-number">5+</span>
                  <span className="seogo-stat-label">Năm kinh nghiệm</span>
                </div>
                <div className="seogo-stat-item">
                  <span className="seogo-stat-number">98%</span>
                  <span className="seogo-stat-label">Khách hàng hài lòng</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Hero Image/Visual */}
          <Col lg={6} className="seogo-hero-visual">
            <div className="seogo-hero-image-container">
              <div className="seogo-hero-mockup">
                <img
                  src="/images/hero-mockup.png"
                  alt="Website Design Mockup"
                  className="seogo-hero-mockup-img"
                />
              </div>

              {/* Floating Elements */}
              <div className="seogo-floating-element seogo-float-1">
                <div className="seogo-float-card">
                  <i className="fas fa-rocket seogo-float-icon"></i>
                  <span>Tốc độ nhanh</span>
                </div>
              </div>

              <div className="seogo-floating-element seogo-float-2">
                <div className="seogo-float-card">
                  <i className="fas fa-mobile-alt seogo-float-icon"></i>
                  <span>Mobile First</span>
                </div>
              </div>

              <div className="seogo-floating-element seogo-float-3">
                <div className="seogo-float-card">
                  <i className="fas fa-search seogo-float-icon"></i>
                  <span>SEO Friendly</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Background Elements */}
      <div className="seogo-hero-bg-shapes">
        <div className="seogo-bg-shape seogo-shape-1"></div>
        <div className="seogo-bg-shape seogo-shape-2"></div>
        <div className="seogo-bg-shape seogo-shape-3"></div>
      </div>
    </section>
  );
};

export default HeroBanner;
