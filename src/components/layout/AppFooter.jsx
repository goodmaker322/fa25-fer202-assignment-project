import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="seogo-footer">
      {/* Main Footer Content */}
      <div className="seogo-footer-main">
        <Container>
          <Row className="gy-4">
            {/* Company Info */}
            <Col lg={4} md={6}>
              <div className="seogo-footer-section">
                <div className="seogo-footer-brand">
                  <img
                    src="/logo.png"
                    alt="SeoGo Website Design"
                    className="seogo-footer-logo"
                    width="40"
                    height="40"
                  />
                  <span className="seogo-footer-brand-text">SeoGo</span>
                </div>
                <p className="seogo-footer-description">
                  Chuyên cung cấp dịch vụ thiết kế website chuyên nghiệp, tối ưu
                  SEO và trải nghiệm người dùng tốt nhất.
                </p>
                <div className="seogo-footer-social">
                  <a
                    href="#"
                    className="seogo-social-link"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="seogo-social-link"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="seogo-social-link"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="#"
                    className="seogo-social-link"
                    aria-label="Twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6}>
              <div className="seogo-footer-section">
                <h5 className="seogo-footer-title">Dịch vụ</h5>
                <ul className="seogo-footer-links">
                  <li>
                    <Link to="/services" className="seogo-footer-link">
                      Thiết kế Website
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="seogo-footer-link">
                      E-commerce
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="seogo-footer-link">
                      Landing Page
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="seogo-footer-link">
                      Tối ưu SEO
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Company Links */}
            <Col lg={2} md={6}>
              <div className="seogo-footer-section">
                <h5 className="seogo-footer-title">Công ty</h5>
                <ul className="seogo-footer-links">
                  <li>
                    <Link to="/portfolio" className="seogo-footer-link">
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="seogo-footer-link">
                      Bảng giá
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="seogo-footer-link">
                      Liên hệ
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="seogo-footer-link">
                      Về chúng tôi
                    </a>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Contact Info */}
            <Col lg={4} md={6}>
              <div className="seogo-footer-section">
                <h5 className="seogo-footer-title">Liên hệ</h5>
                <div className="seogo-contact-info">
                  <div className="seogo-contact-item">
                    <i className="fas fa-map-marker-alt seogo-contact-icon"></i>
                    <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
                  </div>
                  <div className="seogo-contact-item">
                    <i className="fas fa-phone seogo-contact-icon"></i>
                    <a href="tel:+84123456789" className="seogo-contact-link">
                      (+84) 123 456 789
                    </a>
                  </div>
                  <div className="seogo-contact-item">
                    <i className="fas fa-envelope seogo-contact-icon"></i>
                    <a
                      href="mailto:hello@seogo.com"
                      className="seogo-contact-link"
                    >
                      hello@seogo.com
                    </a>
                  </div>
                </div>

                {/* Quick CTA */}
                <div className="seogo-footer-cta">
                  <Button
                    variant="primary"
                    as={Link}
                    to="/contact"
                    className="seogo-footer-btn"
                    size="sm"
                  >
                    Nhận tư vấn miễn phí
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="seogo-footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="seogo-copyright">
                <p className="mb-0">
                  © {currentYear} SeoGo. All rights reserved.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="seogo-footer-legal">
                <a href="#" className="seogo-legal-link">
                  Chính sách bảo mật
                </a>
                <span className="seogo-divider">|</span>
                <a href="#" className="seogo-legal-link">
                  Điều khoản sử dụng
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default AppFooter;
