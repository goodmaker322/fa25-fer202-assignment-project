import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "basic",
      name: "Gói Cơ Bản",
      subtitle: "Phù hợp cho doanh nghiệp nhỏ",
      monthlyPrice: 5000000,
      yearlyPrice: 50000000,
      originalPrice: 7000000,
      popular: false,
      color: "primary",
      features: [
        { text: "Thiết kế responsive", included: true },
        { text: "Tối ưu SEO cơ bản", included: true },
        { text: "Tích hợp Google Analytics", included: true },
        { text: "Form liên hệ", included: true },
        { text: "Hosting miễn phí 1 năm", included: true },
        { text: "Hỗ trợ 3 tháng", included: true },
        { text: "Số trang: 5-7 trang", included: true },
        { text: "E-commerce tính năng", included: false },
        { text: "Tùy chỉnh nâng cao", included: false },
        { text: "Hỗ trợ 24/7", included: false },
      ],
      deliveryTime: "7-10 ngày",
      revisions: "2 lần sửa",
    },
    {
      id: "professional",
      name: "Gói Chuyên Nghiệp",
      subtitle: "Lựa chọn phổ biến nhất",
      monthlyPrice: 12000000,
      yearlyPrice: 120000000,
      originalPrice: 15000000,
      popular: true,
      color: "success",
      features: [
        { text: "Thiết kế responsive", included: true },
        { text: "Tối ưu SEO nâng cao", included: true },
        { text: "Tích hợp Google Analytics", included: true },
        { text: "Form liên hệ đa dạng", included: true },
        { text: "Hosting miễn phí 1 năm", included: true },
        { text: "Hỗ trợ 6 tháng", included: true },
        { text: "Số trang: 10-15 trang", included: true },
        { text: "CMS quản trị nội dung", included: true },
        { text: "Tùy chỉnh thiết kế", included: true },
        { text: "Hỗ trợ 24/7", included: false },
      ],
      deliveryTime: "10-14 ngày",
      revisions: "5 lần sửa",
    },
    {
      id: "enterprise",
      name: "Gói Doanh Nghiệp",
      subtitle: "Giải pháp toàn diện",
      monthlyPrice: 25000000,
      yearlyPrice: 250000000,
      originalPrice: 30000000,
      popular: false,
      color: "warning",
      features: [
        { text: "Thiết kế responsive", included: true },
        { text: "Tối ưu SEO chuyên sâu", included: true },
        { text: "Tích hợp Analytics nâng cao", included: true },
        { text: "E-commerce đầy đủ", included: true },
        { text: "Hosting VPS miễn phí", included: true },
        { text: "Hỗ trợ 12 tháng", included: true },
        { text: "Số trang: Không giới hạn", included: true },
        { text: "CMS quản trị nâng cao", included: true },
        { text: "Tùy chỉnh hoàn toàn", included: true },
        { text: "Hỗ trợ 24/7", included: true },
      ],
      deliveryTime: "15-21 ngày",
      revisions: "Không giới hạn",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const calculateSavings = (monthly, yearly) => {
    const yearlySavings = monthly * 12 - yearly;
    const savingsPercent = Math.round((yearlySavings / (monthly * 12)) * 100);
    return { amount: yearlySavings, percent: savingsPercent };
  };

  return (
    <section className="seogo-pricing-plans">
      <Container>
        {/* Section Header */}
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <div className="seogo-section-header">
              <Badge bg="info" className="seogo-section-badge">
                Bảng Giá
              </Badge>
              <h2 className="seogo-section-title">
                Gói Dịch Vụ Thiết Kế Website
              </h2>
              <p className="seogo-section-subtitle">
                Chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của doanh
                nghiệp bạn. Tất cả gói đều bao gồm thiết kế responsive và tối ưu
                SEO.
              </p>
            </div>
          </Col>
        </Row>

        {/* Billing Toggle */}
        <Row className="mb-5">
          <Col>
            <div className="seogo-billing-toggle">
              <span
                className={`seogo-billing-label ${
                  billingCycle === "monthly" ? "seogo-active" : ""
                }`}
              >
                Thanh toán 1 lần
              </span>
              <div className="seogo-toggle-switch">
                <input
                  type="checkbox"
                  id="billing-toggle"
                  className="seogo-toggle-input"
                  checked={billingCycle === "yearly"}
                  onChange={(e) =>
                    setBillingCycle(e.target.checked ? "yearly" : "monthly")
                  }
                />
                <label htmlFor="billing-toggle" className="seogo-toggle-label">
                  <span className="seogo-toggle-slider"></span>
                </label>
              </div>
              <span
                className={`seogo-billing-label ${
                  billingCycle === "yearly" ? "seogo-active" : ""
                }`}
              >
                Gói năm
                <Badge bg="success" className="seogo-save-badge ms-2">
                  Tiết kiệm 20%
                </Badge>
              </span>
            </div>
          </Col>
        </Row>

        {/* Pricing Cards */}
        <Row className="gy-4 justify-content-center">
          {plans.map((plan, index) => {
            const currentPrice =
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const savings = calculateSavings(
              plan.monthlyPrice,
              plan.yearlyPrice
            );

            return (
              <Col key={plan.id} lg={4} md={6}>
                <Card
                  className={`seogo-pricing-card ${
                    plan.popular ? "seogo-popular-plan" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="seogo-popular-badge">
                      <Badge bg="success" className="seogo-most-popular">
                        <i className="fas fa-crown me-2"></i>
                        Phổ biến nhất
                      </Badge>
                    </div>
                  )}

                  <Card.Body className="seogo-pricing-body">
                    <div className="seogo-plan-header">
                      <h4 className="seogo-plan-name">{plan.name}</h4>
                      <p className="seogo-plan-subtitle">{plan.subtitle}</p>
                    </div>

                    <div className="seogo-price-section">
                      <div className="seogo-price-main">
                        <span className="seogo-currency">₫</span>
                        <span className="seogo-price-amount">
                          {formatPrice(currentPrice)}
                        </span>
                      </div>

                      {billingCycle === "yearly" && savings.percent > 0 && (
                        <div className="seogo-savings-info">
                          <span className="seogo-original-price">
                            ₫{formatPrice(plan.monthlyPrice * 12)}
                          </span>
                          <Badge bg="success" className="seogo-savings-badge">
                            Tiết kiệm ₫{formatPrice(savings.amount)}
                          </Badge>
                        </div>
                      )}

                      <div className="seogo-price-period">
                        {billingCycle === "monthly" ? "Một lần" : "Gói năm"}
                      </div>
                    </div>

                    <div className="seogo-plan-features">
                      <ListGroup variant="flush">
                        {plan.features.map((feature, idx) => (
                          <ListGroup.Item
                            key={idx}
                            className={`seogo-feature-item ${
                              !feature.included ? "seogo-feature-disabled" : ""
                            }`}
                          >
                            <i
                              className={`fas ${
                                feature.included
                                  ? "fa-check seogo-check-icon"
                                  : "fa-times seogo-times-icon"
                              }`}
                            ></i>
                            <span className="seogo-feature-text">
                              {feature.text}
                            </span>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>

                    <div className="seogo-plan-details">
                      <div className="seogo-detail-item">
                        <i className="fas fa-clock seogo-detail-icon"></i>
                        <span>Thời gian: {plan.deliveryTime}</span>
                      </div>
                      <div className="seogo-detail-item">
                        <i className="fas fa-edit seogo-detail-icon"></i>
                        <span>Sửa đổi: {plan.revisions}</span>
                      </div>
                    </div>

                    <div className="seogo-plan-cta">
                      <Button
                        as={Link}
                        to="/contact"
                        variant={plan.popular ? "success" : "outline-primary"}
                        size="lg"
                        className="seogo-plan-btn w-100"
                      >
                        {plan.popular ? "Chọn gói phổ biến" : "Chọn gói này"}
                      </Button>

                      <div className="seogo-cta-note">
                        <small className="text-muted">
                          <i className="fas fa-phone me-1"></i>
                          Hoặc gọi: <strong>(+84) 123 456 789</strong>
                        </small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Custom Quote CTA */}
        <Row className="mt-5">
          <Col lg={8} className="mx-auto text-center">
            <div className="seogo-custom-quote">
              <Card className="seogo-quote-card">
                <Card.Body className="seogo-quote-content">
                  <div className="seogo-quote-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h4 className="seogo-quote-title">
                    Cần giải pháp tùy chỉnh?
                  </h4>
                  <p className="seogo-quote-description">
                    Liên hệ với chúng tôi để được tư vấn và báo giá chi tiết cho
                    dự án website theo yêu cầu riêng của bạn.
                  </p>
                  <Button
                    as={Link}
                    to="/contact"
                    variant="primary"
                    size="lg"
                    className="seogo-quote-btn"
                  >
                    <i className="fas fa-calculator me-2"></i>
                    Nhận báo giá tùy chỉnh
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PricingPlans;
