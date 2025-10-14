import React, { useState } from "react";
import { Container, Row, Col, Card, Badge, ProgressBar } from "react-bootstrap";

const WorkflowSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Tư Vấn & Phân Tích",
      subtitle: "Hiểu rõ nhu cầu của bạn",
      icon: "fas fa-comments",
      duration: "1-2 ngày",
      description:
        "Chúng tôi lắng nghe ý tưởng, phân tích yêu cầu và đưa ra giải pháp tối ưu cho dự án website của bạn.",
      activities: [
        "Trao đổi ý tưởng và mục tiêu",
        "Phân tích đối tượng khách hàng",
        "Nghiên cứu thị trường và đối thủ",
        "Lập kế hoạch chi tiết dự án",
        "Báo giá và timeline cụ thể",
      ],
      deliverables: "Project Brief, Wireframes, Timeline",
      color: "primary",
    },
    {
      id: 2,
      title: "Thiết Kế UI/UX",
      subtitle: "Tạo trải nghiệm tuyệt vời",
      icon: "fas fa-paint-brush",
      duration: "3-5 ngày",
      description:
        "Thiết kế giao diện người dùng đẹp mắt, trực quan và tối ưu trải nghiệm sử dụng trên mọi thiết bị.",
      activities: [
        "Xây dựng User Journey Map",
        "Thiết kế Mockup và Prototype",
        "Chọn màu sắc và Typography",
        "Tối ưu cho Mobile-first",
        "Review và điều chỉnh thiết kế",
      ],
      deliverables: "UI Design, Prototype, Style Guide",
      color: "info",
    },
    {
      id: 3,
      title: "Phát Triển Website",
      subtitle: "Biến thiết kế thành thực tế",
      icon: "fas fa-code",
      duration: "7-14 ngày",
      description:
        "Lập trình website với công nghệ hiện đại, đảm bảo hiệu suất cao và bảo mật tốt.",
      activities: [
        "Setup môi trường phát triển",
        "Code Frontend responsive",
        "Phát triển Backend và Database",
        "Tích hợp API và Third-party",
        "Testing và Debug",
      ],
      deliverables: "Website hoàn chỉnh, Source code",
      color: "warning",
    },
    {
      id: 4,
      title: "Tối Ưu & SEO",
      subtitle: "Chuẩn bị ra mắt",
      icon: "fas fa-search",
      duration: "2-3 ngày",
      description:
        "Tối ưu hóa website về hiệu suất, SEO và đảm bảo sẵn sàng cho việc triển khai thực tế.",
      activities: [
        "Tối ưu tốc độ tải trang",
        "Setup SEO On-page",
        "Cấu hình Google Analytics",
        "Test trên nhiều trình duyệt",
        "Backup và Security",
      ],
      deliverables: "Website optimized, SEO Report",
      color: "success",
    },
    {
      id: 5,
      title: "Deploy & Hỗ Trợ",
      subtitle: "Ra mắt và bảo trì",
      icon: "fas fa-rocket",
      duration: "1-2 ngày + ongoing",
      description:
        "Triển khai website lên server, hướng dẫn sử dụng và cung cấp hỗ trợ kỹ thuật liên tục.",
      activities: [
        "Deploy lên hosting/server",
        "Cấu hình domain và SSL",
        "Hướng dẫn quản trị website",
        "Training team sử dụng",
        "Hỗ trợ maintenance",
      ],
      deliverables: "Website live, User manual, Support",
      color: "dark",
    },
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const calculateProgress = () => {
    return ((activeStep + 1) / steps.length) * 100;
  };

  return (
    <section className="seogo-workflow-steps">
      <Container>
        {/* Section Header */}
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <div className="seogo-section-header">
              <Badge bg="secondary" className="seogo-section-badge">
                Quy Trình
              </Badge>
              <h2 className="seogo-section-title">
                Quy Trình Làm Việc Chuyên Nghiệp
              </h2>
              <p className="seogo-section-subtitle">
                Chúng tôi áp dụng quy trình làm việc chuẩn quốc tế để đảm bảo dự
                án của bạn được hoàn thành đúng tiến độ và chất lượng cao nhất.
              </p>
            </div>
          </Col>
        </Row>

        {/* Progress Bar */}
        <Row className="mb-4">
          <Col lg={10} className="mx-auto">
            <div className="seogo-progress-container">
              <ProgressBar
                now={calculateProgress()}
                className="seogo-workflow-progress"
                variant="primary"
              />
              <div className="seogo-progress-info">
                <span className="seogo-progress-text">
                  Bước {activeStep + 1} / {steps.length}
                </span>
                <span className="seogo-progress-percent">
                  {Math.round(calculateProgress())}%
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Timeline Navigation */}
        <Row className="mb-5">
          <Col>
            <div className="seogo-timeline-nav">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`seogo-timeline-item ${
                    activeStep === index ? "seogo-timeline-active" : ""
                  } ${index < activeStep ? "seogo-timeline-completed" : ""}`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="seogo-timeline-marker">
                    <div className="seogo-timeline-icon">
                      <i className={step.icon}></i>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="seogo-timeline-line"></div>
                    )}
                  </div>
                  <div className="seogo-timeline-content">
                    <h6 className="seogo-timeline-title">{step.title}</h6>
                    <span className="seogo-timeline-duration">
                      {step.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* Active Step Details */}
        <Row>
          <Col lg={10} className="mx-auto">
            <Card className="seogo-step-details">
              <Card.Body className="seogo-step-body">
                <Row className="align-items-center">
                  <Col lg={6}>
                    <div className="seogo-step-info">
                      <div className="seogo-step-header">
                        <div
                          className={`seogo-step-icon seogo-icon-${steps[activeStep].color}`}
                        >
                          <i className={steps[activeStep].icon}></i>
                        </div>
                        <div className="seogo-step-meta">
                          <Badge
                            bg={steps[activeStep].color}
                            className="seogo-step-badge"
                          >
                            Bước {steps[activeStep].id}
                          </Badge>
                          <h3 className="seogo-step-title">
                            {steps[activeStep].title}
                          </h3>
                          <p className="seogo-step-subtitle">
                            {steps[activeStep].subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="seogo-step-description">
                        {steps[activeStep].description}
                      </p>

                      <div className="seogo-step-deliverables">
                        <h6 className="seogo-deliverables-title">
                          <i className="fas fa-box-open me-2"></i>
                          Sản phẩm bàn giao:
                        </h6>
                        <p className="seogo-deliverables-text">
                          {steps[activeStep].deliverables}
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col lg={6}>
                    <div className="seogo-step-activities">
                      <h6 className="seogo-activities-title">
                        <i className="fas fa-tasks me-2"></i>
                        Hoạt động chính:
                      </h6>
                      <ul className="seogo-activities-list">
                        {steps[activeStep].activities.map((activity, idx) => (
                          <li key={idx} className="seogo-activity-item">
                            <i className="fas fa-check-circle seogo-activity-icon"></i>
                            <span className="seogo-activity-text">
                              {activity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistics */}
        <Row className="mt-5">
          <Col>
            <div className="seogo-workflow-stats">
              <Row className="text-center">
                <Col md={3} sm={6}>
                  <div className="seogo-stat-card">
                    <div className="seogo-stat-icon">
                      <i className="fas fa-calendar-check"></i>
                    </div>
                    <span className="seogo-stat-number">15-30</span>
                    <span className="seogo-stat-label">Ngày hoàn thành</span>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="seogo-stat-card">
                    <div className="seogo-stat-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <span className="seogo-stat-number">5+</span>
                    <span className="seogo-stat-label">
                      Chuyên gia tham gia
                    </span>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="seogo-stat-card">
                    <div className="seogo-stat-icon">
                      <i className="fas fa-sync"></i>
                    </div>
                    <span className="seogo-stat-number">5</span>
                    <span className="seogo-stat-label">Lần review tối đa</span>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="seogo-stat-card">
                    <div className="seogo-stat-icon">
                      <i className="fas fa-headset"></i>
                    </div>
                    <span className="seogo-stat-number">24/7</span>
                    <span className="seogo-stat-label">Hỗ trợ kỹ thuật</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WorkflowSteps;
