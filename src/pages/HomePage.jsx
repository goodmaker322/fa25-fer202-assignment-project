import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import components - SỬA PATHS THEO CẤU TRÚC THỰC TẾ
import AppHeader from "../components/layout/AppHeader";
import AppFooter from "../components/layout/AppFooter";
import MainLayout from "../components/layout/MainLayout";

// Import home components
import HeroBanner from "../components/home/HeroBanner";
import ClientReviews from "../components/home/ClientReviews";
import PricingPlans from "../components/home/PricingPlans";
import ProjectShowcase from "../components/home/ProjectShowcase";
import ServicePackages from "../components/home/ServicePackages";
import WorkflowSteps from "../components/home/WorkflowSteps";

// Import forms
import ContactForm from "../components/forms/ContactForm";
import NewsletterSignup from "../components/forms/NewsletterSignup";
import QuoteRequest from "../components/forms/QuoteRequest";

// Import UI components
import Button from "../components/ui/Button";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../components/ui/Modal";
import LoadingSpinner, { PageLoader } from "../components/ui/LoadingSpinner";

const HomePage = () => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "services",
        "process",
        "portfolio",
        "testimonials",
        "pricing",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Show loading page
  if (isLoading) {
    return (
      <PageLoader
        message="Đang tải trang chủ..."
        logo="/assets/images/logo.png"
      />
    );
  }

  return (
    <div className="seogo-homepage">
      {/* Header */}
      <AppHeader
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onQuoteClick={() => setShowQuoteModal(true)}
        onContactClick={() => setShowContactModal(true)}
      />

      {/* Main Content */}
      <main className="seogo-main-content">
        {/* Hero Section */}
        <section id="home" className="seogo-section">
          <HeroBanner
            onGetQuote={() => setShowQuoteModal(true)}
            onContact={() => setShowContactModal(true)}
            onViewPortfolio={() => scrollToSection("portfolio")}
          />
        </section>

        {/* Services Section */}
        <section id="services" className="seogo-section seogo-services-section">
          <Container>
            <div className="seogo-section-header text-center">
              <span className="seogo-section-badge">Dịch Vụ</span>
              <h2 className="seogo-section-title">
                Giải Pháp Toàn Diện Cho Doanh Nghiệp
              </h2>
              <p className="seogo-section-description">
                Chúng tôi cung cấp đầy đủ các dịch vụ từ thiết kế website, SEO
                cho đến marketing online để giúp doanh nghiệp phát triển bền
                vững.
              </p>
            </div>

            <ServicePackages
              onServiceSelect={(service) => {
                console.log("Selected service:", service);
                setShowQuoteModal(true);
              }}
            />
          </Container>
        </section>

        {/* Process Section */}
        <section id="process" className="seogo-section seogo-process-section">
          <Container>
            <div className="seogo-section-header text-center">
              <span className="seogo-section-badge">Quy Trình</span>
              <h2 className="seogo-section-title">
                Quy Trình Làm Việc Chuyên Nghiệp
              </h2>
              <p className="seogo-section-description">
                Phương pháp làm việc được tối ưu hóa để đảm bảo chất lượng và
                tiến độ dự án của khách hàng.
              </p>
            </div>

            <WorkflowSteps />
          </Container>
        </section>

        {/* Portfolio Section */}
        <section
          id="portfolio"
          className="seogo-section seogo-portfolio-section"
        >
          <Container>
            <div className="seogo-section-header text-center">
              <span className="seogo-section-badge">Portfolio</span>
              <h2 className="seogo-section-title">Dự Án Tiêu Biểu</h2>
              <p className="seogo-section-description">
                Khám phá những dự án website và ứng dụng chúng tôi đã thực hiện
                thành công cho các khách hàng.
              </p>
            </div>

            <ProjectShowcase />
          </Container>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="seogo-section seogo-testimonials-section"
        >
          <Container>
            <div className="seogo-section-header text-center">
              <span className="seogo-section-badge">Đánh Giá</span>
              <h2 className="seogo-section-title">
                Khách Hàng Nói Gì Về Chúng Tôi
              </h2>
              <p className="seogo-section-description">
                Hàng trăm khách hàng đã tin tưởng và hài lòng với chất lượng
                dịch vụ của SEOGO.
              </p>
            </div>

            <ClientReviews />
          </Container>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="seogo-section seogo-pricing-section">
          <Container>
            <div className="seogo-section-header text-center">
              <span className="seogo-section-badge">Bảng Giá</span>
              <h2 className="seogo-section-title">Gói Dịch Vụ Phù Hợp</h2>
              <p className="seogo-section-description">
                Lựa chọn gói dịch vụ phù hợp với quy mô và ngân sách của doanh
                nghiệp bạn.
              </p>
            </div>

            <PricingPlans
              onSelectPlan={(plan) => {
                console.log("Selected plan:", plan);
                setShowQuoteModal(true);
              }}
            />
          </Container>
        </section>

        {/* Newsletter Section */}
        <section className="seogo-section seogo-newsletter-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8}>
                <div className="seogo-section-header text-center">
                  <span className="seogo-section-badge">Cập Nhật</span>
                  <h2 className="seogo-section-title">Đăng Ký Nhận Tin</h2>
                  <p className="seogo-section-description">
                    Nhận thông tin về xu hướng thiết kế web và ưu đãi đặc biệt
                  </p>
                </div>
                <NewsletterSignup />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Contact Section */}
        <section id="contact" className="seogo-section seogo-contact-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="seogo-contact-info">
                  <span className="seogo-section-badge">Liên Hệ</span>
                  <h2 className="seogo-section-title">
                    Sẵn Sàng Bắt Đầu Dự Án?
                  </h2>
                  <p className="seogo-section-description">
                    Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận
                    báo giá chi tiết cho dự án của bạn.
                  </p>

                  <div className="seogo-contact-methods">
                    <div className="seogo-contact-method">
                      <div className="seogo-contact-icon">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div className="seogo-contact-content">
                        <h6>Hotline</h6>
                        <p>0123 456 789</p>
                      </div>
                    </div>

                    <div className="seogo-contact-method">
                      <div className="seogo-contact-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="seogo-contact-content">
                        <h6>Email</h6>
                        <p>hello@seogo.vn</p>
                      </div>
                    </div>

                    <div className="seogo-contact-method">
                      <div className="seogo-contact-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="seogo-contact-content">
                        <h6>Địa chỉ</h6>
                        <p>123 Đường ABC, Quận 1, TP.HCM</p>
                      </div>
                    </div>
                  </div>

                  <div className="seogo-contact-social">
                    <h6>Kết nối với chúng tôi</h6>
                    <div className="seogo-social-links">
                      <a href="#" className="seogo-social-link">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="seogo-social-link">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="seogo-social-link">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#" className="seogo-social-link">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <Card className="seogo-contact-form-card" shadow="lg">
                  <CardHeader
                    title="Gửi Tin Nhắn"
                    subtitle="Chúng tôi sẽ phản hồi trong vòng 24 giờ"
                    icon="fas fa-paper-plane"
                  />
                  <CardBody>
                    <ContactForm />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <AppFooter
        onQuoteClick={() => setShowQuoteModal(true)}
        onContactClick={() => setShowContactModal(true)}
      />

      {/* Quote Request Modal */}
      <Modal
        show={showQuoteModal}
        onHide={() => setShowQuoteModal(false)}
        size="lg"
        centered
        backdrop="static"
        className="seogo-quote-modal"
      >
        <ModalHeader closeButton={false}>
          <div className="seogo-modal-header-content">
            <div className="seogo-modal-header-icon">
              <i className="fas fa-calculator"></i>
            </div>
            <div>
              <h4>Yêu Cầu Báo Giá</h4>
              <p>Nhận báo giá chi tiết trong 24 giờ</p>
            </div>
          </div>
        </ModalHeader>

        <ModalBody padding="none">
          <QuoteRequest onClose={() => setShowQuoteModal(false)} />
        </ModalBody>
      </Modal>

      {/* Contact Modal */}
      <Modal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        size="md"
        centered
        className="seogo-contact-modal"
      >
        <ModalHeader
          title="Liên Hệ Ngay"
          subtitle="Chúng tôi sẽ liên hệ lại trong vòng 30 phút"
          icon="fas fa-headset"
        />

        <ModalBody>
          <ContactForm
            variant="compact"
            onSuccess={() => {
              setShowContactModal(false);
              // Show success notification
            }}
          />
        </ModalBody>
      </Modal>

      {/* Floating Action Buttons */}
      <div className="seogo-floating-actions">
        <Button
          variant="success"
          size="lg"
          rounded
          className="seogo-floating-chat"
          onClick={() => setShowContactModal(true)}
          title="Chat với chúng tôi"
        >
          <i className="fas fa-comments"></i>
        </Button>

        <Button
          variant="primary"
          size="lg"
          rounded
          className="seogo-floating-quote"
          onClick={() => setShowQuoteModal(true)}
          title="Yêu cầu báo giá"
        >
          <i className="fas fa-calculator"></i>
        </Button>
      </div>

      {/* Back to Top Button */}
      <Button
        variant="dark"
        size="md"
        rounded
        className="seogo-back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Lên đầu trang"
      >
        <i className="fas fa-arrow-up"></i>
      </Button>
    </div>
  );
};

export default HomePage;
