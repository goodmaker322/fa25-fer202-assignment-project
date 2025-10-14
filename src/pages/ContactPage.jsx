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

const ContactPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState("contact");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Contact info data
  const contactInfo = {
    phone: "0123 456 789",
    email: "hello@seogo.vn",
    address: "123 Đường Nguyễn Văn Cừ, Quận 1, TP.HCM",
    workingHours: "Thứ 2 - Thứ 6: 8:00 - 18:00\nThứ 7: 8:00 - 12:00",
    social: [
      {
        name: "Facebook",
        icon: "fab fa-facebook-f",
        url: "https://facebook.com/seogo",
      },
      {
        name: "Instagram",
        icon: "fab fa-instagram",
        url: "https://instagram.com/seogo",
      },
      {
        name: "LinkedIn",
        icon: "fab fa-linkedin-in",
        url: "https://linkedin.com/company/seogo",
      },
      {
        name: "YouTube",
        icon: "fab fa-youtube",
        url: "https://youtube.com/@seogo",
      },
      {
        name: "Zalo",
        icon: "fas fa-comment-dots",
        url: "https://zalo.me/seogo",
      },
    ],
  };

  // Office locations
  const offices = [
    {
      id: "hcm",
      name: "Văn Phòng TP.HCM",
      address: "123 Đường Nguyễn Văn Cừ, Quận 1, TP.HCM",
      phone: "0123 456 789",
      email: "hcm@seogo.vn",
      isMain: true,
      coordinates: { lat: 10.7769, lng: 106.7009 },
    },
    {
      id: "hn",
      name: "Văn Phòng Hà Nội",
      address: "456 Đường Láng, Đống Đa, Hà Nội",
      phone: "0987 654 321",
      email: "hanoi@seogo.vn",
      isMain: false,
      coordinates: { lat: 21.0285, lng: 105.8542 },
    },
    {
      id: "dn",
      name: "Văn Phòng Đà Nẵng",
      address: "789 Đường 2/9, Hải Châu, Đà Nẵng",
      phone: "0369 258 147",
      email: "danang@seogo.vn",
      isMain: false,
      coordinates: { lat: 16.0471, lng: 108.2068 },
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "Thời gian hoàn thành website là bao lâu?",
      answer:
        "Thời gian hoàn thành website phụ thuộc vào độ phức tạp của dự án. Website cơ bản: 1-2 tuần, website phức tạp: 4-8 tuần. Chúng tôi sẽ thông báo timeline cụ thể sau khi trao đổi yêu cầu.",
    },
    {
      question: "Chi phí thiết kế website là bao nhiêu?",
      answer:
        "Chi phí thiết kế website được tính dựa trên tính năng và độ phức tạp. Giá từ 5 triệu cho website cơ bản đến 50 triệu cho website phức tạp. Liên hệ để nhận báo giá chi tiết.",
    },
    {
      question: "Có hỗ trợ bảo trì website không?",
      answer:
        "Có, chúng tôi cung cấp dịch vụ bảo trì website với các gói từ cơ bản đến nâng cao. Bao gồm cập nhật nội dung, backup dữ liệu, tối ưu tốc độ và bảo mật.",
    },
    {
      question: "Website có tương thích mobile không?",
      answer:
        "Tất cả website chúng tôi thiết kế đều responsive 100%, tương thích hoàn hảo trên mọi thiết bị từ điện thoại, tablet đến desktop với trải nghiệm tốt nhất.",
    },
    {
      question: "Có hỗ trợ SEO không?",
      answer:
        "Có, chúng tôi tích hợp SEO cơ bản vào tất cả website. Ngoài ra còn có dịch vụ SEO chuyên sâu để website đạt thứ hạng cao trên Google.",
    },
    {
      question: "Thanh toán như thế nào?",
      answer:
        "Chúng tôi nhận thanh toán qua chuyển khoản ngân hàng, ví điện tử hoặc tiền mặt. Thường chia làm 2-3 đợt: 50% khi ký hợp đồng, 50% khi bàn giao website.",
    },
  ];

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle contact form submission
  const handleContactSubmit = (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Contact form submitted:", formData);
    }, 2000);
  };

  return (
    <div className="seogo-contact-page">
      {/* Header */}
      <Header
        currentPage="contact"
        onQuoteClick={() => setShowQuoteModal(true)}
      />

      {/* Page Header */}
      <section className="seogo-page-header">
        <Container>
          <div className="seogo-page-header-content">
            <nav className="seogo-breadcrumb">
              <span>Trang chủ</span>
              <i className="fas fa-chevron-right"></i>
              <span>Liên hệ</span>
            </nav>

            <h1 className="seogo-page-title">Liên Hệ Với Chúng Tôi</h1>
            <p className="seogo-page-description">
              Sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ để được tư vấn miễn phí về
              dự án website và chiến lược marketing online.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="seogo-contact-methods-section">
        <Container>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <Card className="seogo-contact-method-card" hover>
                <CardBody className="text-center">
                  <div className="seogo-method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <h5>Hotline</h5>
                  <p>{contactInfo.phone}</p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  >
                    Gọi ngay
                  </Button>
                </CardBody>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="seogo-contact-method-card" hover>
                <CardBody className="text-center">
                  <div className="seogo-method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h5>Email</h5>
                  <p>{contactInfo.email}</p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    href={`mailto:${contactInfo.email}`}
                  >
                    Gửi email
                  </Button>
                </CardBody>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="seogo-contact-method-card" hover>
                <CardBody className="text-center">
                  <div className="seogo-method-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h5>Địa chỉ</h5>
                  <p>{contactInfo.address}</p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/?q=${contactInfo.address}`,
                        "_blank"
                      )
                    }
                  >
                    Chỉ đường
                  </Button>
                </CardBody>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card className="seogo-contact-method-card" hover>
                <CardBody className="text-center">
                  <div className="seogo-method-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h5>Giờ làm việc</h5>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {contactInfo.workingHours}
                  </p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setShowQuoteModal(true)}
                  >
                    Đặt lịch hẹn
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="seogo-main-contact-section">
        <Container>
          <Row className="g-5">
            {/* Contact Form */}
            <Col lg={8}>
              <Card className="seogo-main-contact-card" shadow="lg">
                <CardHeader>
                  <div className="seogo-contact-tabs">
                    <button
                      className={`seogo-tab-btn ${
                        activeTab === "contact" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("contact")}
                    >
                      <i className="fas fa-envelope"></i>
                      Liên hệ tư vấn
                    </button>
                    <button
                      className={`seogo-tab-btn ${
                        activeTab === "quote" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("quote")}
                    >
                      <i className="fas fa-calculator"></i>
                      Yêu cầu báo giá
                    </button>
                  </div>
                </CardHeader>

                <CardBody>
                  {activeTab === "contact" ? (
                    <div className="seogo-contact-form-wrapper">
                      <h4>Gửi tin nhắn cho chúng tôi</h4>
                      <p>
                        Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong
                        30 phút.
                      </p>
                      <ContactForm
                        onSubmit={handleContactSubmit}
                        loading={isLoading}
                      />
                    </div>
                  ) : (
                    <div className="seogo-quote-form-wrapper">
                      <h4>Yêu cầu báo giá chi tiết</h4>
                      <p>
                        Nhận báo giá chính xác cho dự án của bạn trong 24 giờ.
                      </p>
                      <QuoteRequest
                        onSubmit={handleContactSubmit}
                        loading={isLoading}
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>

            {/* Contact Info Sidebar */}
            <Col lg={4}>
              <div className="seogo-contact-sidebar">
                {/* Office Locations */}
                <Card className="seogo-office-locations-card" shadow="md">
                  <CardHeader
                    title="Văn phòng làm việc"
                    icon="fas fa-building"
                  />
                  <CardBody>
                    {offices.map((office) => (
                      <div key={office.id} className="seogo-office-item">
                        <div className="seogo-office-header">
                          <h6>{office.name}</h6>
                          {office.isMain && (
                            <span className="seogo-main-badge">Chính</span>
                          )}
                        </div>
                        <div className="seogo-office-details">
                          <p>
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {office.address}
                          </p>
                          <p>
                            <i className="fas fa-phone"></i> {office.phone}
                          </p>
                          <p>
                            <i className="fas fa-envelope"></i> {office.email}
                          </p>
                        </div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          fullWidth
                          onClick={() =>
                            window.open(
                              `https://maps.google.com/?q=${office.address}`,
                              "_blank"
                            )
                          }
                        >
                          Xem bản đồ
                        </Button>
                      </div>
                    ))}
                  </CardBody>
                </Card>

                {/* Social Media */}
                <Card className="seogo-social-media-card" shadow="md">
                  <CardHeader
                    title="Kết nối với chúng tôi"
                    icon="fas fa-share-alt"
                  />
                  <CardBody>
                    <div className="seogo-social-grid">
                      {contactInfo.social.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="seogo-social-item"
                          title={social.name}
                        >
                          <i className={social.icon}></i>
                          <span>{social.name}</span>
                        </a>
                      ))}
                    </div>
                  </CardBody>
                </Card>

                {/* Quick Actions */}
                <Card
                  className="seogo-quick-actions-card"
                  variant="primary"
                  shadow="md"
                >
                  <CardBody>
                    <h5>Cần hỗ trợ khẩn cấp?</h5>
                    <p>Liên hệ hotline để được hỗ trợ 24/7</p>
                    <div className="seogo-quick-actions">
                      <Button
                        variant="light"
                        fullWidth
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                        className="mb-2"
                      >
                        <i className="fas fa-phone"></i>
                        Gọi ngay
                      </Button>
                      <Button
                        variant="outline-light"
                        fullWidth
                        onClick={() =>
                          window.open("https://zalo.me/seogo", "_blank")
                        }
                      >
                        <i className="fas fa-comment-dots"></i>
                        Chat Zalo
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="seogo-map-section">
        <Container fluid className="px-0">
          <div className="seogo-map-container">
            {!mapLoaded ? (
              <div className="seogo-map-loading">
                <LoadingSpinner
                  variant="pulse"
                  size="lg"
                  text="Đang tải bản đồ..."
                />
              </div>
            ) : (
              <div className="seogo-map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.461851862055!2d106.69530977483389!3d10.776990459339995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3c161a3fb%3A0xef77cd47a1cc691e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ3V54buFbiBUw6J0IFRow6BuaA!5e0!3m2!1svi!2s!4v1689320445723!5m2!1svi!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SEOGO Office Location"
                ></iframe>

                <div className="seogo-map-overlay">
                  <Card className="seogo-map-info-card">
                    <CardBody>
                      <h6>Văn phòng chính SEOGO</h6>
                      <p>
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {contactInfo.address}
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `https://maps.google.com/?q=${contactInfo.address}`,
                            "_blank"
                          )
                        }
                      >
                        Chỉ đường
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="seogo-faq-section">
        <Container>
          <div className="seogo-section-header text-center">
            <span className="seogo-section-badge">FAQ</span>
            <h2 className="seogo-section-title">Câu Hỏi Thường Gặp</h2>
            <p className="seogo-section-description">
              Tìm câu trả lời nhanh chóng cho những thắc mắc phổ biến
            </p>
          </div>

          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="seogo-faq-list">
                {faqs.map((faq, index) => (
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

              <div className="seogo-faq-footer text-center">
                <p>Không tìm thấy câu trả lời?</p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowQuoteModal(true)}
                >
                  Liên hệ tư vấn trực tiếp
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <Footer />

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
          subtitle="Nhận báo giá chi tiết trong 24 giờ"
          icon="fas fa-calculator"
        />
        <ModalBody padding="none">
          <QuoteRequest onClose={() => setShowQuoteModal(false)} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ContactPage;
