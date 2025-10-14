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
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ServicesPage = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Service categories
  const categories = [
    { id: "all", name: "Tất cả dịch vụ", icon: "fas fa-th-large" },
    { id: "website", name: "Thiết kế Website", icon: "fas fa-desktop" },
    { id: "ecommerce", name: "E-commerce", icon: "fas fa-shopping-cart" },
    { id: "mobile", name: "Ứng dụng Mobile", icon: "fas fa-mobile-alt" },
    { id: "marketing", name: "Digital Marketing", icon: "fas fa-bullhorn" },
    { id: "branding", name: "Branding", icon: "fas fa-palette" },
    { id: "maintenance", name: "Bảo trì & Hỗ trợ", icon: "fas fa-tools" },
  ];

  // Services data
  const services = [
    {
      id: 1,
      title: "Thiết kế Website Doanh nghiệp",
      category: "website",
      shortDescription:
        "Website chuyên nghiệp cho doanh nghiệp, tối ưu SEO và responsive",
      fullDescription:
        "Thiết kế website doanh nghiệp chuyên nghiệp với giao diện hiện đại, tối ưu SEO và responsive trên mọi thiết bị. Tích hợp đầy đủ tính năng cần thiết cho hoạt động kinh doanh.",
      features: [
        "Thiết kế giao diện chuyên nghiệp",
        "Responsive trên mọi thiết bị",
        "Tối ưu SEO On-page",
        "Tích hợp Google Analytics",
        "Form liên hệ và đăng ký",
        "Quản trị nội dung dễ dàng",
        "Tốc độ tải trang nhanh",
        "Bảo mật SSL miễn phí",
      ],
      process: [
        "Tư vấn và phân tích yêu cầu",
        "Thiết kế mockup và wireframe",
        "Phát triển website",
        "Kiểm thử và tối ưu",
        "Bàn giao và hướng dẫn sử dụng",
      ],
      pricing: {
        from: 5000000,
        to: 20000000,
      },
      duration: "2-6 tuần",
      icon: "fas fa-desktop",
      color: "primary",
      image: "/assets/services/web-design.jpg",
      popular: true,
    },
    {
      id: 2,
      title: "Website Thương mại điện tử",
      category: "ecommerce",
      shortDescription:
        "Xây dựng cửa hàng online với đầy đủ tính năng bán hàng",
      fullDescription:
        "Phát triển website thương mại điện tử hoàn chỉnh với hệ thống quản lý sản phẩm, đơn hàng, thanh toán online và các tính năng marketing tích hợp.",
      features: [
        "Quản lý sản phẩm không giới hạn",
        "Giỏ hàng và thanh toán online",
        "Quản lý đơn hàng tự động",
        "Tích hợp vận chuyển",
        "Hệ thống khuyến mãi",
        "Báo cáo doanh thu chi tiết",
        "SEO cho sản phẩm",
        "Tích hợp mạng xã hội",
      ],
      process: [
        "Phân tích mô hình kinh doanh",
        "Thiết kế UX/UI cho ecommerce",
        "Phát triển backend và frontend",
        "Tích hợp payment gateway",
        "Kiểm thử và tối ưu performance",
        "Training và go-live",
      ],
      pricing: {
        from: 15000000,
        to: 50000000,
      },
      duration: "6-12 tuần",
      icon: "fas fa-shopping-cart",
      color: "success",
      image: "/assets/services/ecommerce.jpg",
      popular: false,
    },
    {
      id: 3,
      title: "Ứng dụng Mobile iOS & Android",
      category: "mobile",
      shortDescription: "Phát triển ứng dụng mobile native và cross-platform",
      fullDescription:
        "Phát triển ứng dụng mobile chuyên nghiệp cho iOS và Android với công nghệ native hoặc cross-platform, tối ưu performance và user experience.",
      features: [
        "Phát triển iOS và Android",
        "React Native/Flutter",
        "Push Notifications",
        "Offline functionality",
        "API integration",
        "Authentication & Security",
        "App Store deployment",
        "Analytics tích hợp",
      ],
      process: [
        "Phân tích requirements",
        "UI/UX design cho mobile",
        "Phát triển MVP",
        "Testing trên real devices",
        "Beta testing",
        "App Store submission",
      ],
      pricing: {
        from: 50000000,
        to: 150000000,
      },
      duration: "12-24 tuần",
      icon: "fas fa-mobile-alt",
      color: "info",
      image: "/assets/services/mobile-app.jpg",
      popular: false,
    },
    {
      id: 4,
      title: "SEO & Digital Marketing",
      category: "marketing",
      shortDescription: "Tối ưu SEO và chiến lược marketing online toàn diện",
      fullDescription:
        "Dịch vụ SEO và digital marketing toàn diện giúp tăng thứ hạng Google, tăng traffic và conversion rate cho website của bạn.",
      features: [
        "SEO On-page và Off-page",
        "Keyword research chuyên sâu",
        "Content marketing strategy",
        "Link building chất lượng",
        "Google Ads management",
        "Social media marketing",
        "Email marketing campaigns",
        "Analytics và reporting",
      ],
      process: [
        "Audit website hiện tại",
        "Keyword research và competitor analysis",
        "Xây dựng chiến lược SEO",
        "Thực hiện tối ưu On-page",
        "Content creation và link building",
        "Monitor và optimize",
      ],
      pricing: {
        from: 5000000,
        to: 20000000,
      },
      duration: "3-12 tháng",
      icon: "fas fa-chart-line",
      color: "warning",
      image: "/assets/services/digital-marketing.jpg",
      popular: true,
    },
    {
      id: 5,
      title: "Thiết kế Branding & Logo",
      category: "branding",
      shortDescription:
        "Xây dựng thương hiệu và bộ nhận diện thị giác chuyên nghiệp",
      fullDescription:
        "Thiết kế logo và xây dựng hệ thống nhận diện thương hiệu hoàn chỉnh, tạo ấn tượng mạnh mẽ và nhất quán trên mọi kênh truyền thông.",
      features: [
        "Thiết kế logo chuyên nghiệp",
        "Bộ nhận diện thương hiệu",
        "Business card & letterhead",
        "Brochure và catalog",
        "Social media templates",
        "Packaging design",
        "Brand guidelines",
        "Vector files đầy đủ",
      ],
      process: [
        "Research thương hiệu và competitor",
        "Concept development",
        "Logo design và refinement",
        "Brand identity system",
        "Application design",
        "Brand guidelines document",
      ],
      pricing: {
        from: 10000000,
        to: 30000000,
      },
      duration: "4-8 tuần",
      icon: "fas fa-palette",
      color: "danger",
      image: "/assets/services/branding.jpg",
      popular: false,
    },
    {
      id: 6,
      title: "Bảo trì Website & Hosting",
      category: "maintenance",
      shortDescription:
        "Dịch vụ bảo trì, cập nhật và hosting website chuyên nghiệp",
      fullDescription:
        "Dịch vụ bảo trì website toàn diện bao gồm hosting, backup, security, updates và technical support 24/7.",
      features: [
        "Hosting SSD tốc độ cao",
        "SSL Certificate miễn phí",
        "Backup tự động hàng ngày",
        "Security monitoring 24/7",
        "Performance optimization",
        "Content updates",
        "Technical support",
        "Uptime 99.9% guarantee",
      ],
      process: [
        "Website health check",
        "Migration và setup",
        "Security hardening",
        "Performance optimization",
        "Monitoring setup",
        "Regular maintenance",
      ],
      pricing: {
        from: 1000000,
        to: 5000000,
      },
      duration: "Hàng tháng",
      icon: "fas fa-tools",
      color: "secondary",
      image: "/assets/services/maintenance.jpg",
      popular: false,
    },
  ];

  // Filter services by category
  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  // Handle service selection
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="seogo-services-page">
      {/* Header */}
      <Header
        currentPage="services"
        onQuoteClick={() => setShowQuoteModal(true)}
      />

      {/* Page Header */}
      <section className="seogo-page-header">
        <Container>
          <div className="seogo-page-header-content">
            <nav className="seogo-breadcrumb">
              <span>Trang chủ</span>
              <i className="fas fa-chevron-right"></i>
              <span>Dịch vụ</span>
            </nav>

            <h1 className="seogo-page-title">Dịch Vụ Của Chúng Tôi</h1>
            <p className="seogo-page-description">
              Cung cấp giải pháp công nghệ toàn diện từ thiết kế website, ứng
              dụng mobile đến digital marketing và branding chuyên nghiệp.
            </p>

            <div className="seogo-services-stats">
              <div className="seogo-stat-item">
                <span className="seogo-stat-number">50+</span>
                <span className="seogo-stat-label">Dự án hoàn thành</span>
              </div>
              <div className="seogo-stat-item">
                <span className="seogo-stat-number">40+</span>
                <span className="seogo-stat-label">Khách hàng tin tưởng</span>
              </div>
              <div className="seogo-stat-item">
                <span className="seogo-stat-number">6</span>
                <span className="seogo-stat-label">Dịch vụ chuyên nghiệp</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Categories */}
      <section className="seogo-service-categories-section">
        <Container>
          <div className="seogo-categories-wrapper">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`seogo-category-btn ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="seogo-services-grid-section">
        <Container>
          <Row className="g-4">
            {filteredServices.map((service, index) => (
              <Col key={service.id} lg={6} md={6} sm={12}>
                <Card
                  className={`seogo-service-card ${
                    service.popular ? "popular" : ""
                  }`}
                  hover
                  shadow="lg"
                >
                  {service.popular && (
                    <div className="seogo-popular-badge">
                      <i className="fas fa-star"></i>
                      Phổ biến
                    </div>
                  )}

                  <div className="seogo-service-image">
                    <img src={service.image} alt={service.title} />
                    <div className="seogo-service-overlay">
                      <div className="seogo-service-icon">
                        <i className={service.icon}></i>
                      </div>
                    </div>
                  </div>

                  <CardBody>
                    <div className="seogo-service-header">
                      <h4 className="seogo-service-title">{service.title}</h4>
                      <div className="seogo-service-price">
                        <span>Từ {formatCurrency(service.pricing.from)}</span>
                      </div>
                    </div>

                    <p className="seogo-service-description">
                      {service.shortDescription}
                    </p>

                    <div className="seogo-service-meta">
                      <div className="seogo-meta-item">
                        <i className="fas fa-clock"></i>
                        <span>{service.duration}</span>
                      </div>
                      <div className="seogo-meta-item">
                        <i className="fas fa-list"></i>
                        <span>{service.features.length} tính năng</span>
                      </div>
                    </div>

                    <div className="seogo-service-features-preview">
                      <ul>
                        {service.features
                          .slice(0, 3)
                          .map((feature, featureIndex) => (
                            <li key={featureIndex}>
                              <i className="fas fa-check"></i>
                              {feature}
                            </li>
                          ))}
                        {service.features.length > 3 && (
                          <li className="seogo-features-more">
                            <i className="fas fa-plus"></i>
                            Và {service.features.length - 3} tính năng khác...
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="seogo-service-actions">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleServiceClick(service)}
                      >
                        Chi tiết dịch vụ
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedService(service);
                          setShowQuoteModal(true);
                        }}
                      >
                        Yêu cầu báo giá
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          {filteredServices.length === 0 && (
            <div className="seogo-empty-state">
              <div className="seogo-empty-icon">
                <i className="fas fa-search"></i>
              </div>
              <h4>Không tìm thấy dịch vụ</h4>
              <p>Không có dịch vụ nào trong danh mục này.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="seogo-why-choose-section">
        <Container>
          <div className="seogo-section-header text-center">
            <span className="seogo-section-badge">Tại sao chọn SEOGO</span>
            <h2 className="seogo-section-title">Ưu Điểm Cạnh Tranh</h2>
            <p className="seogo-section-description">
              Chúng tôi cam kết mang đến chất lượng dịch vụ tốt nhất với đội ngũ
              chuyên nghiệp và quy trình làm việc chuẩn quốc tế.
            </p>
          </div>

          <Row className="g-4">
            {[
              {
                icon: "fas fa-users",
                title: "Đội ngũ chuyên nghiệp",
                description:
                  "Hơn 3 năm kinh nghiệm trong lĩnh vực công nghệ và marketing",
              },
              {
                icon: "fas fa-rocket",
                title: "Công nghệ hiện đại",
                description:
                  "Sử dụng công nghệ mới nhất, frameworks và tools tiên tiến",
              },
              {
                icon: "fas fa-headset",
                title: "Hỗ trợ 24/7",
                description:
                  "Đội ngũ support luôn sẵn sàng hỗ trợ khách hàng mọi lúc",
              },
              {
                icon: "fas fa-shield-alt",
                title: "Bảo mật cao",
                description:
                  "Áp dụng các tiêu chuẩn bảo mật cao nhất cho mọi dự án",
              },
              {
                icon: "fas fa-chart-line",
                title: "Tối ưu hiệu suất",
                description:
                  "Cam kết website/app đạt tốc độ và hiệu suất tối ưu",
              },
              {
                icon: "fas fa-handshake",
                title: "Cam kết chất lượng",
                description: "Bảo hành và hỗ trợ dài hạn cho tất cả sản phẩm",
              },
            ].map((advantage, index) => (
              <Col key={index} lg={4} md={6}>
                <Card className="seogo-advantage-card" hover>
                  <CardBody className="text-center">
                    <div className="seogo-advantage-icon">
                      <i className={advantage.icon}></i>
                    </div>
                    <h5>{advantage.title}</h5>
                    <p>{advantage.description}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Process Section */}
      <section className="seogo-process-section">
        <Container>
          <div className="seogo-section-header text-center">
            <span className="seogo-section-badge">Quy trình làm việc</span>
            <h2 className="seogo-section-title">Quy Trình 6 Bước</h2>
            <p className="seogo-section-description">
              Quy trình làm việc chuyên nghiệp đảm bảo chất lượng và tiến độ dự
              án
            </p>
          </div>

          <div className="seogo-process-steps">
            {[
              {
                step: 1,
                title: "Tư vấn & Phân tích",
                description: "Tư vấn miễn phí và phân tích yêu cầu chi tiết",
                icon: "fas fa-comments",
              },
              {
                step: 2,
                title: "Đề xuất giải pháp",
                description: "Đưa ra giải pháp tối ưu và báo giá chi tiết",
                icon: "fas fa-lightbulb",
              },
              {
                step: 3,
                title: "Ký hợp đồng",
                description: "Ký kết hợp đồng và thanh toán đợt 1",
                icon: "fas fa-file-contract",
              },
              {
                step: 4,
                title: "Thiết kế & Phát triển",
                description: "Bắt đầu thiết kế và phát triển theo timeline",
                icon: "fas fa-code",
              },
              {
                step: 5,
                title: "Kiểm thử & Tối ưu",
                description: "Kiểm thử kỹ lưỡng và tối ưu hiệu suất",
                icon: "fas fa-bug",
              },
              {
                step: 6,
                title: "Bàn giao & Hỗ trợ",
                description: "Bàn giao sản phẩm và hỗ trợ vận hành",
                icon: "fas fa-handshake",
              },
            ].map((process, index) => (
              <div key={index} className="seogo-process-step">
                <div className="seogo-step-number">{process.step}</div>
                <div className="seogo-step-icon">
                  <i className={process.icon}></i>
                </div>
                <div className="seogo-step-content">
                  <h5>{process.title}</h5>
                  <p>{process.description}</p>
                </div>
                {index < 5 && <div className="seogo-step-connector"></div>}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="seogo-services-cta-section">
        <Container>
          <div className="seogo-cta-content">
            <h2>Bắt Đầu Dự Án Của Bạn</h2>
            <p>
              Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và nhận
              báo giá tốt nhất cho dự án của bạn.
            </p>
            <div className="seogo-cta-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowQuoteModal(true)}
                icon="fas fa-calculator"
              >
                Yêu cầu báo giá
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => setShowContactModal(true)}
                icon="fas fa-phone"
              >
                Tư vấn miễn phí: 0123 456 789
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />

      {/* Service Detail Modal */}
      {selectedService && (
        <Modal
          show={showServiceModal}
          onHide={() => setShowServiceModal(false)}
          size="lg"
          centered
          className="seogo-service-modal"
        >
          <ModalHeader
            title={selectedService.title}
            subtitle={`Từ ${formatCurrency(
              selectedService.pricing.from
            )} - ${formatCurrency(selectedService.pricing.to)}`}
            icon={selectedService.icon}
          />
          <ModalBody>
            <div className="seogo-service-detail">
              <div className="seogo-service-overview">
                <h5>Mô tả dịch vụ</h5>
                <p>{selectedService.fullDescription}</p>
              </div>

              <div className="seogo-service-info">
                <div className="seogo-info-item">
                  <strong>Thời gian thực hiện:</strong>
                  <span>{selectedService.duration}</span>
                </div>
                <div className="seogo-info-item">
                  <strong>Mức giá:</strong>
                  <span>
                    {formatCurrency(selectedService.pricing.from)} -{" "}
                    {formatCurrency(selectedService.pricing.to)}
                  </span>
                </div>
              </div>

              <div className="seogo-service-features-full">
                <h6>Tính năng bao gồm:</h6>
                <ul>
                  {selectedService.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="seogo-service-process">
                <h6>Quy trình thực hiện:</h6>
                <ol>
                  {selectedService.process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="seogo-service-actions">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    setShowServiceModal(false);
                    setShowQuoteModal(true);
                  }}
                >
                  Yêu cầu báo giá dịch vụ này
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}

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
            selectedService={selectedService}
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
            onSuccess={() => setShowContactModal(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ServicesPage;
