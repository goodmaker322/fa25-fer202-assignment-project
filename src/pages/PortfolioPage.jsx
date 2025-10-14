import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import components
import Header from "../components/layout/AppHeader";
import Footer from "../components/layout/AppFooter";
import QuoteRequest from "../components/forms/QuoteRequest";

// Import UI components
import Button from "../components/ui/Button";
import Card, { CardBody, CardHeader } from "../components/ui/Card";
import Modal, { ModalHeader, ModalBody } from "../components/ui/Modal";
import { ImageModal } from "../components/ui/Modal";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const PortfolioPage = () => {
  // State management
  const [activeFilter, setActiveFilter] = useState("all");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Portfolio categories
  const categories = [
    { id: "all", name: "Tất cả", count: 24 },
    { id: "website", name: "Website", count: 12 },
    { id: "ecommerce", name: "E-commerce", count: 6 },
    { id: "mobile", name: "Mobile App", count: 4 },
    { id: "branding", name: "Branding", count: 2 },
  ];

  // Portfolio projects data
  const projects = [
    {
      id: 1,
      title: "Website Thương Mại Điện Tử TechStore",
      category: "ecommerce",
      client: "TechStore Vietnam",
      year: "2024",
      duration: "8 tuần",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      description:
        "Xây dựng hệ thống thương mại điện tử hoàn chỉnh với tính năng thanh toán online, quản lý đơn hàng và hệ thống CRM tích hợp.",
      features: [
        "Giao diện responsive đa thiết bị",
        "Hệ thống thanh toán đa dạng",
        "Quản lý kho hàng thông minh",
        "Tích hợp CRM và email marketing",
        "Dashboard analytics chi tiết",
      ],
      images: [
        "/assets/portfolio/techstore-1.jpg",
        "/assets/portfolio/techstore-2.jpg",
        "/assets/portfolio/techstore-3.jpg",
        "/assets/portfolio/techstore-4.jpg",
      ],
      thumbnail: "/assets/portfolio/techstore-thumb.jpg",
      url: "https://techstore.example.com",
      testimonial: {
        content:
          "SEOGO đã tạo ra một website vượt ngoài mong đợi của chúng tôi. Doanh thu tăng 150% sau 3 tháng launch.",
        author: "Nguyễn Văn A",
        position: "CEO TechStore",
      },
    },
    {
      id: 2,
      title: "Ứng Dụng Mobile Banking VietBank",
      category: "mobile",
      client: "VietBank",
      year: "2024",
      duration: "12 tuần",
      technologies: [
        "React Native",
        "Firebase",
        "Biometric",
        "Push Notifications",
      ],
      description:
        "Phát triển ứng dụng mobile banking với các tính năng bảo mật cao, chuyển tiền nhanh và quản lý tài chính cá nhân.",
      features: [
        "Đăng nhập sinh trắc học",
        "Chuyển tiền QR Pay",
        "Lịch sử giao dịch chi tiết",
        "Tính năng tiết kiệm thông minh",
        "Thông báo push realtime",
      ],
      images: [
        "/assets/portfolio/vietbank-1.jpg",
        "/assets/portfolio/vietbank-2.jpg",
        "/assets/portfolio/vietbank-3.jpg",
      ],
      thumbnail: "/assets/portfolio/vietbank-thumb.jpg",
      url: "https://play.google.com/store/apps/vietbank",
      testimonial: {
        content:
          "Ứng dụng được người dùng đánh giá 4.8/5 sao. Interface đẹp và trải nghiệm mượt mà.",
        author: "Trần Thị B",
        position: "Product Manager VietBank",
      },
    },
    {
      id: 3,
      title: "Website Công Ty EduTech Learning",
      category: "website",
      client: "EduTech Learning",
      year: "2024",
      duration: "6 tuần",
      technologies: ["WordPress", "LMS", "Zoom API", "Payment Gateway"],
      description:
        "Thiết kế website giáo dục trực tuyến với hệ thống LMS tích hợp, video streaming và thanh toán khóa học.",
      features: [
        "Hệ thống LMS hoàn chỉnh",
        "Video streaming chất lượng cao",
        "Quản lý khóa học và học viên",
        "Tích hợp Zoom cho live class",
        "Chứng chỉ hoàn thành tự động",
      ],
      images: [
        "/assets/portfolio/edutech-1.jpg",
        "/assets/portfolio/edutech-2.jpg",
        "/assets/portfolio/edutech-3.jpg",
      ],
      thumbnail: "/assets/portfolio/edutech-thumb.jpg",
      url: "https://edutech.example.com",
      testimonial: {
        content:
          "Số lượng học viên đăng ký tăng 200% sau khi có website mới. Rất hài lòng với chất lượng.",
        author: "Lê Văn C",
        position: "Founder EduTech",
      },
    },
    {
      id: 4,
      title: "Branding & Website Nhà Hàng Luxury",
      category: "branding",
      client: "Luxury Restaurant",
      year: "2023",
      duration: "10 tuần",
      technologies: [
        "Brand Identity",
        "Photography",
        "WordPress",
        "Reservation System",
      ],
      description:
        "Xây dựng thương hiệu hoàn chỉnh và website cho nhà hàng cao cấp, bao gồm logo, menu design và hệ thống đặt bàn.",
      features: [
        "Thiết kế logo và brand identity",
        "Chụp ảnh sản phẩm chuyên nghiệp",
        "Website responsive cao cấp",
        "Hệ thống đặt bàn online",
        "Menu digital tương tác",
      ],
      images: [
        "/assets/portfolio/luxury-1.jpg",
        "/assets/portfolio/luxury-2.jpg",
        "/assets/portfolio/luxury-3.jpg",
      ],
      thumbnail: "/assets/portfolio/luxury-thumb.jpg",
      url: "https://luxury-restaurant.example.com",
      testimonial: {
        content:
          "Thương hiệu mới giúp nhà hàng thu hút được nhiều khách hàng high-end hơn.",
        author: "Phạm Thị D",
        position: "Owner Luxury Restaurant",
      },
    },
    {
      id: 5,
      title: "Platform E-learning CodeMaster",
      category: "website",
      client: "CodeMaster Academy",
      year: "2023",
      duration: "14 tuần",
      technologies: ["React", "Node.js", "Socket.io", "Docker", "AWS"],
      description:
        "Phát triển nền tảng học lập trình trực tuyến với code editor tích hợp, auto grading và community features.",
      features: [
        "Code editor với syntax highlighting",
        "Auto grading system",
        "Video lessons streaming",
        "Community forum",
        "Progress tracking dashboard",
      ],
      images: [
        "/assets/portfolio/codemaster-1.jpg",
        "/assets/portfolio/codemaster-2.jpg",
        "/assets/portfolio/codemaster-3.jpg",
      ],
      thumbnail: "/assets/portfolio/codemaster-thumb.jpg",
      url: "https://codemaster.example.com",
      testimonial: {
        content:
          "Platform này đã giúp 10,000+ học viên học lập trình hiệu quả. Công nghệ rất ấn tượng.",
        author: "Hoàng Văn E",
        position: "CTO CodeMaster",
      },
    },
    {
      id: 6,
      title: "Ứng Dụng Giao Hàng FastDelivery",
      category: "mobile",
      client: "FastDelivery Co.",
      year: "2023",
      duration: "16 tuần",
      technologies: [
        "Flutter",
        "Google Maps",
        "Firebase",
        "Real-time Tracking",
      ],
      description:
        "Ứng dụng giao hàng với tracking real-time, tối ưu route và hệ thống rating đánh giá.",
      features: [
        "Tracking real-time GPS",
        "Tối ưu hóa tuyến đường",
        "Hệ thống rating shipper",
        "Thanh toán đa dạng",
        "Chat support trực tiếp",
      ],
      images: [
        "/assets/portfolio/fastdelivery-1.jpg",
        "/assets/portfolio/fastdelivery-2.jpg",
        "/assets/portfolio/fastdelivery-3.jpg",
      ],
      thumbnail: "/assets/portfolio/fastdelivery-thumb.jpg",
      url: "https://fastdelivery.example.com",
      testimonial: {
        content:
          "Hiệu suất giao hàng tăng 40% nhờ tính năng tối ưu route thông minh.",
        author: "Võ Thị F",
        position: "Operations Manager",
      },
    },
  ];

  // Filter projects based on active category
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle image load
  const handleImageLoad = (projectId) => {
    setLoadedImages((prev) => new Set([...prev, projectId]));
  };

  // Handle project click
  const handleProjectClick = (project, imageIndex = 0) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
    setShowImageModal(true);
  };

  // Handle filter change
  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
  };

  if (isLoading) {
    return (
      <div className="seogo-page-loading">
        <LoadingSpinner
          variant="gradient"
          size="xl"
          text="Đang tải portfolio..."
        />
      </div>
    );
  }

  return (
    <div className="seogo-portfolio-page">
      {/* Header */}
      <Header
        currentPage="portfolio"
        onQuoteClick={() => setShowQuoteModal(true)}
      />

      {/* Page Header */}
      <section className="seogo-page-header">
        <Container>
          <div className="seogo-page-header-content">
            <nav className="seogo-breadcrumb">
              <span>Trang chủ</span>
              <i className="fas fa-chevron-right"></i>
              <span>Portfolio</span>
            </nav>

            <h1 className="seogo-page-title">Portfolio Dự Án</h1>
            <p className="seogo-page-description">
              Khám phá những dự án website, ứng dụng mobile và branding mà chúng
              tôi đã thực hiện thành công cho các khách hàng.
            </p>

            <div className="seogo-portfolio-stats">
              <div className="seogo-stat-item">
                <span className="seogo-stat-number">50+</span>
                <span className="seogo-stat-label">Dự án hoàn thành</span>
              </div>
              <div className="seogo-stat-item">
                <span className="seogo-stat-number">40+</span>
                <span className="seogo-stat-label">Khách hàng hài lòng</span>
              </div>
              <div className="seogo-stat-item">
                <span className="seogo-stat-number">3+</span>
                <span className="seogo-stat-label">Năm kinh nghiệm</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio Filter */}
      <section className="seogo-portfolio-filter-section">
        <Container>
          <div className="seogo-filter-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`seogo-filter-btn ${
                  activeFilter === category.id ? "active" : ""
                }`}
                onClick={() => handleFilterChange(category.id)}
              >
                {category.name}
                <span className="seogo-filter-count">{category.count}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio Grid */}
      <section className="seogo-portfolio-grid-section">
        <Container>
          <Row className="g-4">
            {filteredProjects.map((project, index) => (
              <Col key={project.id} lg={6} md={6} sm={12}>
                <Card className="seogo-portfolio-card" hover shadow="lg">
                  <div className="seogo-portfolio-image">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      onLoad={() => handleImageLoad(project.id)}
                      className={
                        loadedImages.has(project.id) ? "loaded" : "loading"
                      }
                    />
                    <div className="seogo-portfolio-overlay">
                      <div className="seogo-portfolio-actions">
                        <Button
                          variant="light"
                          size="sm"
                          rounded
                          onClick={() => handleProjectClick(project)}
                          className="seogo-view-btn"
                        >
                          <i className="fas fa-eye"></i>
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          rounded
                          href={project.url}
                          target="_blank"
                          className="seogo-link-btn"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </Button>
                      </div>
                      <div className="seogo-portfolio-info">
                        <span className="seogo-portfolio-category">
                          {
                            categories.find(
                              (cat) => cat.id === project.category
                            )?.name
                          }
                        </span>
                        <h4 className="seogo-portfolio-title">
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <CardBody>
                    <div className="seogo-portfolio-meta">
                      <span className="seogo-portfolio-client">
                        <i className="fas fa-building"></i>
                        {project.client}
                      </span>
                      <span className="seogo-portfolio-year">
                        <i className="fas fa-calendar"></i>
                        {project.year}
                      </span>
                    </div>

                    <p className="seogo-portfolio-description">
                      {project.description}
                    </p>

                    <div className="seogo-portfolio-technologies">
                      {project.technologies
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <span key={techIndex} className="seogo-tech-tag">
                            {tech}
                          </span>
                        ))}
                      {project.technologies.length > 3 && (
                        <span className="seogo-tech-more">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="seogo-portfolio-footer">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleProjectClick(project)}
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowQuoteModal(true)}
                      >
                        Dự án tương tự
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          {filteredProjects.length === 0 && (
            <div className="seogo-empty-state">
              <div className="seogo-empty-icon">
                <i className="fas fa-folder-open"></i>
              </div>
              <h4>Không có dự án nào</h4>
              <p>Chưa có dự án nào trong danh mục này.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Call to Action */}
      <section className="seogo-portfolio-cta-section">
        <Container>
          <div className="seogo-cta-content">
            <h2>Bạn Có Dự Án Tương Tự?</h2>
            <p>
              Hãy để chúng tôi giúp bạn biến ý tưởng thành hiện thực. Nhận tư
              vấn miễn phí và báo giá chi tiết ngay hôm nay.
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
                href="tel:0123456789"
                icon="fas fa-phone"
              >
                Gọi tư vấn: 0123 456 789
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      {selectedProject && (
        <Modal
          show={showImageModal}
          onHide={() => setShowImageModal(false)}
          size="xl"
          centered
          className="seogo-project-modal"
        >
          <ModalHeader
            title={selectedProject.title}
            subtitle={`${selectedProject.client} • ${selectedProject.year}`}
          />
          <ModalBody padding="none">
            <div className="seogo-project-detail">
              {/* Project Images */}
              <div className="seogo-project-images">
                <div className="seogo-main-image">
                  <img
                    src={selectedProject.images[selectedImageIndex]}
                    alt={selectedProject.title}
                  />
                </div>
                <div className="seogo-image-thumbnails">
                  {selectedProject.images.map((image, index) => (
                    <div
                      key={index}
                      className={`seogo-thumbnail ${
                        index === selectedImageIndex ? "active" : ""
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${selectedProject.title} ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="seogo-project-info">
                <div className="seogo-project-overview">
                  <h5>Tổng quan dự án</h5>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="seogo-project-details">
                  <div className="seogo-detail-item">
                    <strong>Khách hàng:</strong>
                    <span>{selectedProject.client}</span>
                  </div>
                  <div className="seogo-detail-item">
                    <strong>Thời gian:</strong>
                    <span>{selectedProject.duration}</span>
                  </div>
                  <div className="seogo-detail-item">
                    <strong>Năm thực hiện:</strong>
                    <span>{selectedProject.year}</span>
                  </div>
                  <div className="seogo-detail-item">
                    <strong>Website:</strong>
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem trực tiếp <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>

                <div className="seogo-project-features">
                  <h6>Tính năng chính:</h6>
                  <ul>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="seogo-project-technologies">
                  <h6>Công nghệ sử dụng:</h6>
                  <div className="seogo-tech-list">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="seogo-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.testimonial && (
                  <div className="seogo-project-testimonial">
                    <h6>Đánh giá từ khách hàng:</h6>
                    <blockquote>
                      <p>"{selectedProject.testimonial.content}"</p>
                      <footer>
                        <strong>{selectedProject.testimonial.author}</strong>
                        <span>{selectedProject.testimonial.position}</span>
                      </footer>
                    </blockquote>
                  </div>
                )}

                <div className="seogo-project-actions">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      setShowImageModal(false);
                      setShowQuoteModal(true);
                    }}
                    fullWidth
                  >
                    Yêu cầu dự án tương tự
                  </Button>
                </div>
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
            selectedProject={selectedProject}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PortfolioPage;
