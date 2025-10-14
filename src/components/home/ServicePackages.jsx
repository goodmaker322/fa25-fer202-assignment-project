import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const ServicePackages = () => {
  const services = [
    {
      id: "landing-page",
      icon: "fas fa-rocket",
      title: "Landing Page",
      subtitle: "Trang đích chuyển đổi cao",
      description:
        "Thiết kế landing page tối ưu cho marketing, chuyển đổi khách hàng tiềm năng thành khách hàng thực.",
      features: [
        "Thiết kế responsive",
        "Tối ưu tốc độ",
        "Call-to-Action hiệu quả",
        "A/B Testing ready",
        "Tích hợp Analytics",
      ],
      priceFrom: "5.000.000",
      duration: "5-7 ngày",
      popular: false,
      color: "primary",
    },
    {
      id: "ecommerce",
      icon: "fas fa-shopping-cart",
      title: "E-commerce Website",
      subtitle: "Cửa hàng trực tuyến hoàn chỉnh",
      description:
        "Xây dựng website bán hàng với đầy đủ tính năng: giỏ hàng, thanh toán, quản lý đơn hàng.",
      features: [
        "Catalog sản phẩm",
        "Giỏ hàng & Checkout",
        "Payment Gateway",
        "Quản lý đơn hàng",
        "Báo cáo doanh thu",
        "SEO-friendly URLs",
      ],
      priceFrom: "15.000.000",
      duration: "15-20 ngày",
      popular: true,
      color: "success",
    },
    {
      id: "corporate",
      icon: "fas fa-building",
      title: "Corporate Website",
      subtitle: "Website doanh nghiệp chuyên nghiệp",
      description:
        "Website giới thiệu công ty, dịch vụ với CMS quản trị nội dung dễ sử dụng và tối ưu SEO.",
      features: [
        "Giới thiệu công ty",
        "Showcase dịch vụ",
        "Tin tức & Blog",
        "CMS quản trị",
        "Đa ngôn ngữ",
        "Tối ưu SEO",
      ],
      priceFrom: "8.000.000",
      duration: "10-14 ngày",
      popular: false,
      color: "info",
    },
    {
      id: "portfolio",
      icon: "fas fa-palette",
      title: "Portfolio Website",
      subtitle: "Trang cá nhân sáng tạo",
      description:
        "Website portfolio cá nhân để showcase các tác phẩm, dự án với thiết kế sáng tạo và ấn tượng.",
      features: [
        "Gallery tác phẩm",
        "About & Resume",
        "Contact Form",
        "Blog cá nhân",
        "Social Integration",
        "Mobile-first Design",
      ],
      priceFrom: "4.000.000",
      duration: "7-10 ngày",
      popular: false,
      color: "warning",
    },
    {
      id: "custom",
      icon: "fas fa-cogs",
      title: "Custom Development",
      subtitle: "Giải pháp tùy chỉnh",
      description:
        "Phát triển website theo yêu cầu riêng với các tính năng đặc biệt và tích hợp hệ thống.",
      features: [
        "Phân tích yêu cầu",
        "Thiết kế UX/UI",
        "Development tùy chỉnh",
        "API Integration",
        "Database Design",
        "Testing & Deploy",
      ],
      priceFrom: "20.000.000",
      duration: "20-30 ngày",
      popular: false,
      color: "dark",
    },
    {
      id: "maintenance",
      icon: "fas fa-tools",
      title: "Website Maintenance",
      subtitle: "Bảo trì & cập nhật",
      description:
        "Dịch vụ bảo trì, cập nhật nội dung, backup, security và performance cho website hiện có.",
      features: [
        "Backup tự động",
        "Security monitoring",
        "Performance optimization",
        "Content updates",
        "Bug fixes",
        "Technical support",
      ],
      priceFrom: "2.000.000",
      duration: "Hàng tháng",
      popular: false,
      color: "secondary",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <section className="seogo-service-packages">
      <Container>
        {/* Section Header */}
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <div className="seogo-section-header">
              <Badge bg="primary" className="seogo-section-badge">
                Dịch Vụ
              </Badge>
              <h2 className="seogo-section-title">
                Gói Dịch Vụ Thiết Kế Website
              </h2>
              <p className="seogo-section-subtitle">
                Chúng tôi cung cấp đa dạng các gói dịch vụ thiết kế website phù
                hợp với mọi nhu cầu từ cá nhân đến doanh nghiệp lớn.
              </p>
            </div>
          </Col>
        </Row>

        {/* Services Grid */}
        <Row className="gy-4">
          {services.map((service, index) => (
            <Col key={service.id} lg={4} md={6}>
              <Card
                className={`seogo-service-card ${
                  service.popular ? "seogo-popular-service" : ""
                }`}
              >
                {service.popular && (
                  <div className="seogo-popular-badge">
                    <Badge bg="success" className="seogo-most-popular">
                      <i className="fas fa-fire me-2"></i>
                      Phổ biến
                    </Badge>
                  </div>
                )}

                <Card.Body className="seogo-service-body">
                  {/* Service Icon */}
                  <div className="seogo-service-icon">
                    <div
                      className={`seogo-icon-wrapper seogo-icon-${service.color}`}
                    >
                      <i className={service.icon}></i>
                    </div>
                  </div>

                  {/* Service Header */}
                  <div className="seogo-service-header">
                    <h4 className="seogo-service-title">{service.title}</h4>
                    <p className="seogo-service-subtitle">{service.subtitle}</p>
                  </div>

                  {/* Service Description */}
                  <p className="seogo-service-description">
                    {service.description}
                  </p>

                  {/* Service Features */}
                  <div className="seogo-service-features">
                    <h6 className="seogo-features-title">Tính năng bao gồm:</h6>
                    <ul className="seogo-features-list">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="seogo-feature-item">
                          <i className="fas fa-check seogo-check-icon"></i>
                          <span className="seogo-feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Details */}
                  <div className="seogo-service-details">
                    <div className="seogo-detail-row">
                      <div className="seogo-detail-item">
                        <i className="fas fa-tag seogo-detail-icon"></i>
                        <div className="seogo-detail-content">
                          <span className="seogo-detail-label">Giá từ:</span>
                          <span className="seogo-detail-value">
                            ₫{service.priceFrom}
                          </span>
                        </div>
                      </div>
                      <div className="seogo-detail-item">
                        <i className="fas fa-clock seogo-detail-icon"></i>
                        <div className="seogo-detail-content">
                          <span className="seogo-detail-label">Thời gian:</span>
                          <span className="seogo-detail-value">
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service CTA */}
                  <div className="seogo-service-cta">
                    <Button
                      as={Link}
                      to="/contact"
                      variant={service.popular ? "success" : "outline-primary"}
                      size="lg"
                      className="seogo-service-btn w-100 mb-2"
                    >
                      <i className="fas fa-paper-plane me-2"></i>
                      {service.popular ? "Chọn gói phổ biến" : "Nhận báo giá"}
                    </Button>

                    <Button
                      as={Link}
                      to="/services"
                      variant="link"
                      size="sm"
                      className="seogo-service-link"
                    >
                      Xem chi tiết <i className="fas fa-arrow-right ms-1"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Bottom CTA */}
        <Row className="mt-5">
          <Col lg={8} className="mx-auto text-center">
            <div className="seogo-services-cta">
              <div className="seogo-cta-content">
                <h4 className="seogo-cta-title">Không tìm thấy gói phù hợp?</h4>
                <p className="seogo-cta-description">
                  Liên hệ với chúng tôi để được tư vấn và thiết kế gói dịch vụ
                  riêng theo nhu cầu cụ thể của bạn.
                </p>
                <div className="seogo-cta-buttons">
                  <Button
                    as={Link}
                    to="/contact"
                    variant="primary"
                    size="lg"
                    className="seogo-cta-btn me-3"
                  >
                    <i className="fas fa-phone me-2"></i>
                    Tư vấn miễn phí
                  </Button>
                  <Button
                    as={Link}
                    to="/services"
                    variant="outline-primary"
                    size="lg"
                    className="seogo-cta-btn"
                  >
                    <i className="fas fa-list me-2"></i>
                    Xem tất cả dịch vụ
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicePackages;
