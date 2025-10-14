import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import components
import Header from "../components/layout/AppHeader";
import Footer from "../components/layout/AppFooter";
import ContactForm from "../components/forms/ContactForm";
import QuoteRequest from "../components/forms/QuoteRequest";

// Import UI components
import Button from "../components/ui/Button";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Modal, { ModalHeader, ModalBody } from "../components/ui/Modal";
import { ConfirmModal, AlertModal } from "../components/ui/Modal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const PricingPage = () => {
  // State management
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // 'monthly' | 'yearly'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pricing plans data
  const pricingPlans = [
    {
      id: "starter",
      name: "Starter",
      description: "Phù hợp cho doanh nghiệp nhỏ, startup mới bắt đầu",
      price: {
        monthly: 5000000,
        yearly: 50000000,
      },
      originalPrice: {
        monthly: 7000000,
        yearly: 70000000,
      },
      popular: false,
      features: [
        "Website responsive 5-10 trang",
        "Thiết kế giao diện hiện đại",
        "Tối ưu SEO cơ bản",
        "Tích hợp Google Analytics",
        "Form liên hệ cơ bản",
        "SSL Certificate miễn phí",
        "Hosting 1 năm (5GB)",
        "Hỗ trợ 3 tháng đầu",
        "Domain .com miễn phí",
        "Responsive mobile",
      ],
      limitations: [
        "Không tích hợp thanh toán",
        "Không có CMS admin",
        "Không hỗ trợ đa ngôn ngữ",
      ],
      deliveryTime: "2-3 tuần",
      support: "3 tháng",
      revisions: "3 lần chỉnh sửa",
      color: "primary",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Dành cho doanh nghiệp vừa và nhỏ cần tính năng nâng cao",
      price: {
        monthly: 12000000,
        yearly: 120000000,
      },
      originalPrice: {
        monthly: 15000000,
        yearly: 150000000,
      },
      popular: true,
      features: [
        "Website responsive 10-20 trang",
        "Thiết kế UI/UX chuyên nghiệp",
        "CMS quản trị nội dung",
        "SEO On-page tối ưu",
        "Tích hợp Google Analytics & Search Console",
        "Form liên hệ nâng cao",
        "Live chat tích hợp",
        "SSL Certificate & CDN",
        "Hosting 1 năm (20GB)",
        "Hỗ trợ 6 tháng",
        "Domain .com miễn phí",
        "Tích hợp mạng xã hội",
        "Email marketing setup",
        "Backup tự động hàng ngày",
      ],
      limitations: [
        "E-commerce giới hạn 50 sản phẩm",
        "Không hỗ trợ đa ngôn ngữ",
      ],
      deliveryTime: "4-6 tuần",
      support: "6 tháng",
      revisions: "5 lần chỉnh sửa",
      color: "success",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Giải pháp toàn diện cho doanh nghiệp lớn",
      price: {
        monthly: 25000000,
        yearly: 250000000,
      },
      originalPrice: {
        monthly: 35000000,
        yearly: 350000000,
      },
      popular: false,
      features: [
        "Website không giới hạn trang",
        "Thiết kế UI/UX cao cấp",
        "CMS quản trị mạnh mẽ",
        "E-commerce đầy đủ tính năng",
        "Thanh toán online đa dạng",
        "SEO Technical nâng cao",
        "Tích hợp CRM & ERP",
        "Hệ thống báo cáo analytics",
        "Multi-language support",
        "PWA (Progressive Web App)",
        "API tích hợp bên thứ 3",
        "SSL Certificate & Premium CDN",
        "Hosting cao cấp (100GB)",
        "Hỗ trợ 12 tháng",
        "Domain và subdomain không giới hạn",
        "Email server riêng",
        "Backup realtime",
        "Bảo mật nâng cao",
        "Performance optimization",
        "Custom development",
      ],
      limitations: [],
      deliveryTime: "8-12 tuần",
      support: "12 tháng",
      revisions: "Không giới hạn",
      color: "warning",
    },
  ];

  // Add-ons services
  const addOns = [
    {
      id: "seo-monthly",
      name: "SEO Monthly Package",
      description: "Tối ưu SEO chuyên sâu hàng tháng",
      price: 3000000,
      features: [
        "Keyword research chi tiết",
        "Content SEO optimization",
        "Link building chất lượng",
        "Technical SEO audit",
        "Báo cáo ranking hàng tháng",
      ],
    },
    {
      id: "content-creation",
      name: "Content Creation",
      description: "Tạo nội dung chuyên nghiệp",
      price: 5000000,
      features: [
        "10 bài viết blog/tháng",
        "Thiết kế banner/poster",
        "Video marketing content",
        "Social media content",
        "Email marketing templates",
      ],
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      description: "Phát triển ứng dụng di động",
      price: 50000000,
      features: [
        "iOS & Android native",
        "React Native/Flutter",
        "API integration",
        "Push notifications",
        "App Store deployment",
      ],
    },
    {
      id: "maintenance",
      name: "Website Maintenance",
      description: "Bảo trì website chuyên nghiệp",
      price: 2000000,
      features: [
        "Security monitoring 24/7",
        "Performance optimization",
        "Content updates",
        "Bug fixes & improvements",
        "Monthly reports",
      ],
    },
  ];

  // Comparison features
  const comparisonFeatures = [
    {
      category: "Thiết kế & Phát triển",
      features: [
        {
          name: "Số trang website",
          starter: "5-10 trang",
          professional: "10-20 trang",
          enterprise: "Không giới hạn",
        },
        {
          name: "Thiết kế UI/UX",
          starter: "Cơ bản",
          professional: "Chuyên nghiệp",
          enterprise: "Cao cấp",
        },
        {
          name: "Responsive design",
          starter: "✓",
          professional: "✓",
          enterprise: "✓",
        },
        {
          name: "Custom development",
          starter: "✗",
          professional: "Giới hạn",
          enterprise: "✓",
        },
      ],
    },
    {
      category: "Tính năng",
      features: [
        {
          name: "CMS quản trị",
          starter: "✗",
          professional: "✓",
          enterprise: "✓",
        },
        {
          name: "E-commerce",
          starter: "✗",
          professional: "50 sản phẩm",
          enterprise: "Không giới hạn",
        },
        {
          name: "Thanh toán online",
          starter: "✗",
          professional: "Cơ bản",
          enterprise: "Đầy đủ",
        },
        {
          name: "Đa ngôn ngữ",
          starter: "✗",
          professional: "✗",
          enterprise: "✓",
        },
        {
          name: "PWA support",
          starter: "✗",
          professional: "✗",
          enterprise: "✓",
        },
      ],
    },
    {
      category: "SEO & Marketing",
      features: [
        {
          name: "SEO On-page",
          starter: "Cơ bản",
          professional: "Tối ưu",
          enterprise: "Nâng cao",
        },
        {
          name: "Google Analytics",
          starter: "✓",
          professional: "✓",
          enterprise: "✓",
        },
        {
          name: "Social media integration",
          starter: "✗",
          professional: "✓",
          enterprise: "✓",
        },
        {
          name: "Email marketing",
          starter: "✗",
          professional: "Setup",
          enterprise: "Tự động hóa",
        },
      ],
    },
    {
      category: "Hỗ trợ",
      features: [
        {
          name: "Thời gian hỗ trợ",
          starter: "3 tháng",
          professional: "6 tháng",
          enterprise: "12 tháng",
        },
        {
          name: "Số lần chỉnh sửa",
          starter: "3 lần",
          professional: "5 lần",
          enterprise: "Không giới hạn",
        },
        {
          name: "Hosting miễn phí",
          starter: "5GB/1 năm",
          professional: "20GB/1 năm",
          enterprise: "100GB/1 năm",
        },
      ],
    },
  ];

  // Calculate discounted price
  const getDiscountedPrice = (plan) => {
    const price = plan.price[billingPeriod];
    const originalPrice = plan.originalPrice[billingPeriod];
    const discount = Math.round(
      ((originalPrice - price) / originalPrice) * 100
    );
    return { price, originalPrice, discount };
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle plan selection
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowConfirmModal(true);
  };

  // Handle plan confirmation
  const handleConfirmPlan = () => {
    setShowConfirmModal(false);
    setShowQuoteModal(true);
  };

  // Handle quote submission
  const handleQuoteSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowQuoteModal(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="seogo-pricing-page">
      {/* Header */}
      <Header
        currentPage="pricing"
        onQuoteClick={() => setShowQuoteModal(true)}
      />

      {/* Page Header */}
      <section className="seogo-page-header">
        <Container>
          <div className="seogo-page-header-content">
            <nav className="seogo-breadcrumb">
              <span>Trang chủ</span>
              <i className="fas fa-chevron-right"></i>
              <span>Bảng giá</span>
            </nav>

            <h1 className="seogo-page-title">Bảng Giá Dịch Vụ</h1>
            <p className="seogo-page-description">
              Lựa chọn gói dịch vụ phù hợp với quy mô và ngân sách của doanh
              nghiệp. Tất cả gói đều bao gồm thiết kế responsive và hỗ trợ kỹ
              thuật.
            </p>

            {/* Billing Toggle */}
            <div className="seogo-billing-toggle">
              <span className={billingPeriod === "monthly" ? "active" : ""}>
                Thanh toán 1 lần
              </span>
              <div className="seogo-toggle-switch">
                <input
                  type="checkbox"
                  id="billing-toggle"
                  checked={billingPeriod === "yearly"}
                  onChange={(e) =>
                    setBillingPeriod(e.target.checked ? "yearly" : "monthly")
                  }
                />
                <label htmlFor="billing-toggle"></label>
              </div>
              <span className={billingPeriod === "yearly" ? "active" : ""}>
                Combo 1 năm
                <span className="seogo-save-badge">Tiết kiệm 20%</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Plans */}
      <section className="seogo-pricing-plans-section">
        <Container>
          <Row className="g-4">
            {pricingPlans.map((plan) => {
              const { price, originalPrice, discount } =
                getDiscountedPrice(plan);

              return (
                <Col key={plan.id} lg={4} md={6}>
                  <Card
                    className={`seogo-pricing-card ${
                      plan.popular ? "popular" : ""
                    }`}
                    variant={plan.color}
                    shadow="lg"
                  >
                    {plan.popular && (
                      <div className="seogo-popular-badge">
                        <i className="fas fa-crown"></i>
                        Phổ biến nhất
                      </div>
                    )}

                    <CardHeader className="seogo-pricing-header">
                      <h3 className="seogo-plan-name">{plan.name}</h3>
                      <p className="seogo-plan-description">
                        {plan.description}
                      </p>

                      <div className="seogo-pricing-amount">
                        <div className="seogo-price-main">
                          <span className="seogo-currency">₫</span>
                          <span className="seogo-price">
                            {formatCurrency(price).replace("₫", "").trim()}
                          </span>
                        </div>

                        {discount > 0 && (
                          <div className="seogo-price-original">
                            <span className="seogo-original-price">
                              {formatCurrency(originalPrice)}
                            </span>
                            <span className="seogo-discount-badge">
                              -{discount}%
                            </span>
                          </div>
                        )}

                        <div className="seogo-price-period">
                          {billingPeriod === "monthly"
                            ? "Trọn gói"
                            : "Combo 1 năm"}
                        </div>
                      </div>
                    </CardHeader>

                    <CardBody>
                      <div className="seogo-plan-meta">
                        <div className="seogo-meta-item">
                          <i className="fas fa-clock"></i>
                          <span>Thời gian: {plan.deliveryTime}</span>
                        </div>
                        <div className="seogo-meta-item">
                          <i className="fas fa-headset"></i>
                          <span>Hỗ trợ: {plan.support}</span>
                        </div>
                        <div className="seogo-meta-item">
                          <i className="fas fa-edit"></i>
                          <span>Chỉnh sửa: {plan.revisions}</span>
                        </div>
                      </div>

                      <div className="seogo-features-list">
                        <h6>Tính năng bao gồm:</h6>
                        <ul>
                          {plan.features.map((feature, index) => (
                            <li key={index}>
                              <i className="fas fa-check"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {plan.limitations.length > 0 && (
                        <div className="seogo-limitations-list">
                          <h6>Giới hạn:</h6>
                          <ul>
                            {plan.limitations.map((limitation, index) => (
                              <li key={index}>
                                <i className="fas fa-times"></i>
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="seogo-plan-actions">
                        <Button
                          variant={
                            plan.popular ? plan.color : `outline-${plan.color}`
                          }
                          size="lg"
                          fullWidth
                          onClick={() => handleSelectPlan(plan)}
                          className="seogo-select-plan-btn"
                        >
                          {plan.popular ? "Chọn gói phổ biến" : "Chọn gói này"}
                        </Button>

                        <Button
                          variant="outline-secondary"
                          size="sm"
                          fullWidth
                          onClick={() => setShowContactModal(true)}
                          className="seogo-contact-btn"
                        >
                          Tư vấn chi tiết
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Add-ons Section */}
      <section className="seogo-addons-section">
        <Container>
          <div className="seogo-section-header text-center">
            <span className="seogo-section-badge">Dịch vụ bổ sung</span>
            <h2 className="seogo-section-title">Nâng Cao Hiệu Quả Website</h2>
            <p className="seogo-section-description">
              Các dịch vụ bổ sung giúp tối ưu hóa hiệu quả và tăng cường sức
              mạnh cạnh tranh cho website của bạn.
            </p>
          </div>

          <Row className="g-4">
            {addOns.map((addon) => (
              <Col key={addon.id} lg={6} md={6}>
                <Card className="seogo-addon-card" hover shadow="md">
                  <CardBody>
                    <div className="seogo-addon-header">
                      <h5>{addon.name}</h5>
                      <div className="seogo-addon-price">
                        {formatCurrency(addon.price)}
                        <span>/tháng</span>
                      </div>
                    </div>

                    <p className="seogo-addon-description">
                      {addon.description}
                    </p>

                    <ul className="seogo-addon-features">
                      {addon.features.map((feature, index) => (
                        <li key={index}>
                          <i className="fas fa-check"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="outline-primary"
                      size="sm"
                      fullWidth
                      onClick={() => setShowQuoteModal(true)}
                    >
                      Thêm vào gói
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="seogo-comparison-section">
        <Container>
          <div className="seogo-section-header text-center">
            <span className="seogo-section-badge">So sánh</span>
            <h2 className="seogo-section-title">So Sánh Chi Tiết Các Gói</h2>
            <p className="seogo-section-description">
              Bảng so sánh giúp bạn lựa chọn gói dịch vụ phù hợp nhất
            </p>
          </div>

          <div className="seogo-comparison-table-wrapper">
            <div className="seogo-comparison-table">
              {/* Table Header */}
              <div className="seogo-comparison-header">
                <div className="seogo-feature-column">Tính năng</div>
                <div className="seogo-plan-column">Starter</div>
                <div className="seogo-plan-column popular">
                  Professional
                  <span className="seogo-popular-label">Phổ biến</span>
                </div>
                <div className="seogo-plan-column">Enterprise</div>
              </div>

              {/* Table Body */}
              {comparisonFeatures.map((category, categoryIndex) => (
                <div key={categoryIndex} className="seogo-comparison-category">
                  <div className="seogo-category-header">
                    <h6>{category.category}</h6>
                  </div>

                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="seogo-comparison-row">
                      <div className="seogo-feature-name">{feature.name}</div>
                      <div className="seogo-feature-value">
                        {feature.starter}
                      </div>
                      <div className="seogo-feature-value">
                        {feature.professional}
                      </div>
                      <div className="seogo-feature-value">
                        {feature.enterprise}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Table Footer */}
              <div className="seogo-comparison-footer">
                <div className="seogo-feature-column"></div>
                <div className="seogo-plan-column">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleSelectPlan(pricingPlans[0])}
                  >
                    Chọn Starter
                  </Button>
                </div>
                <div className="seogo-plan-column">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelectPlan(pricingPlans[1])}
                  >
                    Chọn Professional
                  </Button>
                </div>
                <div className="seogo-plan-column">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleSelectPlan(pricingPlans[2])}
                  >
                    Chọn Enterprise
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="seogo-pricing-faq-section">
        <Container>
          <div className="seogo-section-header text-center">
            <span className="seogo-section-badge">FAQ</span>
            <h2 className="seogo-section-title">Câu Hỏi Về Giá</h2>
          </div>

          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="seogo-faq-list">
                {[
                  {
                    question: "Có được đổi gói sau khi đã thanh toán?",
                    answer:
                      "Có, bạn có thể nâng cấp lên gói cao hơn bất cứ lúc nào. Chúng tôi sẽ tính phần chênh lệch giá và điều chỉnh dịch vụ phù hợp.",
                  },
                  {
                    question: "Chi phí có bao gồm hosting và domain?",
                    answer:
                      "Có, tất cả các gói đều bao gồm hosting và domain miễn phí trong năm đầu tiên. Năm thứ 2 trở đi sẽ có phí gia hạn hợp lý.",
                  },
                  {
                    question: "Thanh toán như thế nào?",
                    answer:
                      "Chúng tôi nhận thanh toán qua chuyển khoản ngân hàng, ví điện tử. Thường chia 2 đợt: 50% khi ký hợp đồng, 50% khi bàn giao.",
                  },
                  {
                    question: "Có hỗ trợ sau khi bàn giao không?",
                    answer:
                      "Có, mỗi gói đều có thời gian hỗ trợ miễn phí khác nhau. Sau đó có thể gia hạn dịch vụ bảo trì với chi phí hợp lý.",
                  },
                  {
                    question: "Nếu không hài lòng thì sao?",
                    answer:
                      "Chúng tôi có chính sách hoàn tiền 100% nếu bạn không hài lòng trong vòng 7 ngày đầu tiên sau khi ký hợp đồng.",
                  },
                ].map((faq, index) => (
                  <Card key={index} className="seogo-faq-item" shadow="sm">
                    <CardBody>
                      <div className="seogo-faq-question">
                        <h6>{faq.question}</h6>
                        <i className="fas fa-chevron-down"></i>
                      </div>
                      <div className="seogo-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="seogo-pricing-cta-section">
        <Container>
          <div className="seogo-cta-content">
            <h2>Chưa Chắc Chắn Gói Nào Phù Hợp?</h2>
            <p>
              Liên hệ với chúng tôi để được tư vấn miễn phí. Chúng tôi sẽ giúp
              bạn chọn gói dịch vụ tối ưu nhất.
            </p>
            <div className="seogo-cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowContactModal(true)}
                icon="fas fa-phone"
              >
                Tư vấn miễn phí
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => setShowQuoteModal(true)}
                icon="fas fa-calculator"
              >
                Yêu cầu báo giá
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />

      {/* Confirm Plan Modal */}
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPlan}
        title="Xác nhận chọn gói"
        message={`Bạn có muốn chọn gói ${selectedPlan?.name}? Chúng tôi sẽ liên hệ để tư vấn chi tiết.`}
        confirmText="Chọn gói này"
        cancelText="Xem lại"
        variant="success"
        icon="fas fa-check-circle"
      />

      {/* Quote Modal */}
      <Modal
        show={showQuoteModal}
        onHide={() => setShowQuoteModal(false)}
        size="lg"
        centered
        backdrop="static"
      >
        <ModalHeader
          title="Yêu cầu báo giá"
          subtitle="Nhận báo giá chi tiết cho dự án của bạn"
          icon="fas fa-calculator"
        />
        <ModalBody padding="none">
          <QuoteRequest
            onClose={() => setShowQuoteModal(false)}
            selectedPlan={selectedPlan}
            onSubmit={handleQuoteSubmit}
            loading={isLoading}
          />
        </ModalBody>
      </Modal>

      {/* Contact Modal */}
      <Modal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        size="md"
        centered
      >
        <ModalHeader
          title="Tư vấn miễn phí"
          subtitle="Chúng tôi sẽ liên hệ lại trong 30 phút"
          icon="fas fa-headset"
        />
        <ModalBody>
          <ContactForm
            variant="compact"
            onSuccess={() => {
              setShowContactModal(false);
              setShowSuccessModal(true);
            }}
          />
        </ModalBody>
      </Modal>

      {/* Success Modal */}
      <AlertModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        title="Gửi thành công!"
        message="Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất."
        variant="success"
        buttonText="Đóng"
      />
    </div>
  );
};

export default PricingPage;
