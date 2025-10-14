import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
  Badge,
  ProgressBar,
} from "react-bootstrap";

const QuoteRequest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Project Type
    projectType: "",
    websiteType: "",

    // Step 2: Project Details
    pages: "",
    features: [],
    integrations: [],
    designStyle: "",

    // Step 3: Requirements
    hasContent: "",
    needHosting: "",
    needDomain: "",
    needSEO: "",
    needMaintenance: "",
    timeline: "",

    // Step 4: Contact Info
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const totalSteps = 4;

  const projectTypes = [
    {
      value: "new",
      label: "Website mới",
      icon: "fas fa-plus-circle",
      description: "Tạo website hoàn toàn mới",
    },
    {
      value: "redesign",
      label: "Thiết kế lại",
      icon: "fas fa-sync-alt",
      description: "Cải thiện website hiện tại",
    },
    {
      value: "migrate",
      label: "Chuyển đổi",
      icon: "fas fa-exchange-alt",
      description: "Chuyển từ platform khác",
    },
  ];

  const websiteTypes = [
    { value: "landing", label: "Landing Page", price: "5-10tr" },
    { value: "corporate", label: "Website doanh nghiệp", price: "10-20tr" },
    { value: "ecommerce", label: "E-commerce", price: "20-50tr" },
    { value: "portfolio", label: "Portfolio", price: "5-15tr" },
    { value: "blog", label: "Blog/Magazine", price: "8-18tr" },
    { value: "custom", label: "Tùy chỉnh đặc biệt", price: "Trao đổi" },
  ];

  const featureOptions = [
    { value: "contact-form", label: "Form liên hệ" },
    { value: "booking", label: "Hệ thống đặt lịch" },
    { value: "payment", label: "Thanh toán online" },
    { value: "membership", label: "Quản lý thành viên" },
    { value: "blog", label: "Blog/Tin tức" },
    { value: "gallery", label: "Thư viện ảnh" },
    { value: "search", label: "Tìm kiếm nâng cao" },
    { value: "multilang", label: "Đa ngôn ngữ" },
    { value: "analytics", label: "Báo cáo thống kê" },
    { value: "chat", label: "Live chat" },
  ];

  const integrationOptions = [
    { value: "google-analytics", label: "Google Analytics" },
    { value: "facebook-pixel", label: "Facebook Pixel" },
    { value: "google-ads", label: "Google Ads" },
    { value: "mailchimp", label: "MailChimp" },
    { value: "hubspot", label: "HubSpot" },
    { value: "zapier", label: "Zapier" },
    { value: "social-media", label: "Social Media" },
    { value: "crm", label: "CRM System" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts interacting
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.projectType)
          newErrors.projectType = "Vui lòng chọn loại dự án";
        if (!formData.websiteType)
          newErrors.websiteType = "Vui lòng chọn loại website";
        break;

      case 2:
        if (!formData.pages) newErrors.pages = "Vui lòng chọn số lượng trang";
        if (!formData.designStyle)
          newErrors.designStyle = "Vui lòng chọn phong cách thiết kế";
        break;

      case 3:
        if (!formData.hasContent)
          newErrors.hasContent = "Vui lòng cho biết về nội dung";
        if (!formData.timeline)
          newErrors.timeline = "Vui lòng chọn thời gian hoàn thành";
        break;

      case 4:
        if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
        if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Email không hợp lệ";
        }
        if (!formData.phone.trim())
          newErrors.phone = "Vui lòng nhập số điện thoại";
        if (!formData.budget) newErrors.budget = "Vui lòng chọn ngân sách";
        break;
    }

    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Quote Request Data:", formData);

      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    return (currentStep / totalSteps) * 100;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="seogo-step-content">
            <div className="seogo-step-header">
              <h4 className="seogo-step-title">Loại Dự Án</h4>
              <p className="seogo-step-description">
                Chọn loại dự án và website bạn muốn thực hiện
              </p>
            </div>

            <Form.Group className="seogo-form-group mb-4">
              <Form.Label className="seogo-form-label">Loại dự án *</Form.Label>
              <div className="seogo-option-grid">
                {projectTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`seogo-option-card ${
                      formData.projectType === type.value
                        ? "seogo-option-selected"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        projectType: type.value,
                      }))
                    }
                  >
                    <div className="seogo-option-icon">
                      <i className={type.icon}></i>
                    </div>
                    <h6 className="seogo-option-title">{type.label}</h6>
                    <p className="seogo-option-desc">{type.description}</p>
                  </div>
                ))}
              </div>
              {errors.projectType && (
                <div className="seogo-error-message">{errors.projectType}</div>
              )}
            </Form.Group>

            <Form.Group className="seogo-form-group">
              <Form.Label className="seogo-form-label">
                Loại website *
              </Form.Label>
              <div className="seogo-website-grid">
                {websiteTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`seogo-website-card ${
                      formData.websiteType === type.value
                        ? "seogo-website-selected"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        websiteType: type.value,
                      }))
                    }
                  >
                    <div className="seogo-website-info">
                      <h6 className="seogo-website-title">{type.label}</h6>
                      <Badge bg="primary" className="seogo-price-badge">
                        {type.price}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              {errors.websiteType && (
                <div className="seogo-error-message">{errors.websiteType}</div>
              )}
            </Form.Group>
          </div>
        );

      case 2:
        return (
          <div className="seogo-step-content">
            <div className="seogo-step-header">
              <h4 className="seogo-step-title">Chi Tiết Dự Án</h4>
              <p className="seogo-step-description">
                Cung cấp thông tin chi tiết về website của bạn
              </p>
            </div>

            <Row>
              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    Số lượng trang *
                  </Form.Label>
                  <Form.Select
                    name="pages"
                    value={formData.pages}
                    onChange={handleInputChange}
                    className="seogo-form-control"
                  >
                    <option value="">Chọn số lượng trang</option>
                    <option value="1-5">1-5 trang</option>
                    <option value="6-10">6-10 trang</option>
                    <option value="11-20">11-20 trang</option>
                    <option value="21-50">21-50 trang</option>
                    <option value="50+">Trên 50 trang</option>
                  </Form.Select>
                  {errors.pages && (
                    <div className="seogo-error-message">{errors.pages}</div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    Phong cách thiết kế *
                  </Form.Label>
                  <Form.Select
                    name="designStyle"
                    value={formData.designStyle}
                    onChange={handleInputChange}
                    className="seogo-form-control"
                  >
                    <option value="">Chọn phong cách</option>
                    <option value="modern">Hiện đại & Tối giản</option>
                    <option value="corporate">
                      Doanh nghiệp & Chuyên nghiệp
                    </option>
                    <option value="creative">Sáng tạo & Nghệ thuật</option>
                    <option value="ecommerce">Thương mại điện tử</option>
                    <option value="custom">Tùy chỉnh theo yêu cầu</option>
                  </Form.Select>
                  {errors.designStyle && (
                    <div className="seogo-error-message">
                      {errors.designStyle}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="seogo-form-group mb-3">
              <Form.Label className="seogo-form-label">
                Tính năng cần thiết
              </Form.Label>
              <div className="seogo-checkbox-grid">
                {featureOptions.map((feature) => (
                  <Form.Check
                    key={feature.value}
                    type="checkbox"
                    name="features"
                    value={feature.value}
                    checked={(formData.features || []).includes(feature.value)}
                    onChange={handleInputChange}
                    label={feature.label}
                    className="seogo-checkbox-item"
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="seogo-form-group">
              <Form.Label className="seogo-form-label">
                Tích hợp bên thứ 3
              </Form.Label>
              <div className="seogo-checkbox-grid">
                {integrationOptions.map((integration) => (
                  <Form.Check
                    key={integration.value}
                    type="checkbox"
                    name="integrations"
                    value={integration.value}
                    checked={(formData.integrations || []).includes(
                      integration.value
                    )}
                    onChange={handleInputChange}
                    label={integration.label}
                    className="seogo-checkbox-item"
                  />
                ))}
              </div>
            </Form.Group>
          </div>
        );

      case 3:
        return (
          <div className="seogo-step-content">
            <div className="seogo-step-header">
              <h4 className="seogo-step-title">Yêu Cầu Khác</h4>
              <p className="seogo-step-description">
                Các dịch vụ bổ sung và yêu cầu đặc biệt
              </p>
            </div>

            <Row>
              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    Bạn đã có nội dung? *
                  </Form.Label>
                  <div className="seogo-radio-group">
                    <Form.Check
                      type="radio"
                      name="hasContent"
                      value="yes"
                      checked={formData.hasContent === "yes"}
                      onChange={handleInputChange}
                      label="Có, tôi đã chuẩn bị sẵn"
                      className="seogo-radio-item"
                    />
                    <Form.Check
                      type="radio"
                      name="hasContent"
                      value="partial"
                      checked={formData.hasContent === "partial"}
                      onChange={handleInputChange}
                      label="Một phần, cần hỗ trợ"
                      className="seogo-radio-item"
                    />
                    <Form.Check
                      type="radio"
                      name="hasContent"
                      value="no"
                      checked={formData.hasContent === "no"}
                      onChange={handleInputChange}
                      label="Chưa, cần viết mới hoàn toàn"
                      className="seogo-radio-item"
                    />
                  </div>
                  {errors.hasContent && (
                    <div className="seogo-error-message">
                      {errors.hasContent}
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    Thời gian hoàn thành *
                  </Form.Label>
                  <Form.Select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="seogo-form-control"
                  >
                    <option value="">Chọn thời gian</option>
                    <option value="asap">Càng sớm càng tốt</option>
                    <option value="1-2weeks">1-2 tuần</option>
                    <option value="3-4weeks">3-4 tuần</option>
                    <option value="1-2months">1-2 tháng</option>
                    <option value="flexible">Linh hoạt</option>
                  </Form.Select>
                  {errors.timeline && (
                    <div className="seogo-error-message">{errors.timeline}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <div className="seogo-services-grid">
              <div className="seogo-service-option">
                <Form.Check
                  type="checkbox"
                  name="needHosting"
                  value="yes"
                  checked={formData.needHosting === "yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needHosting: e.target.checked ? "yes" : "",
                    }))
                  }
                  label="Cần dịch vụ hosting"
                  className="seogo-service-check"
                />
                <small className="seogo-service-desc">
                  Hosting chất lượng cao, tốc độ nhanh
                </small>
              </div>

              <div className="seogo-service-option">
                <Form.Check
                  type="checkbox"
                  name="needDomain"
                  value="yes"
                  checked={formData.needDomain === "yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needDomain: e.target.checked ? "yes" : "",
                    }))
                  }
                  label="Cần đăng ký tên miền"
                  className="seogo-service-check"
                />
                <small className="seogo-service-desc">
                  Tên miền .com, .vn, .com.vn
                </small>
              </div>

              <div className="seogo-service-option">
                <Form.Check
                  type="checkbox"
                  name="needSEO"
                  value="yes"
                  checked={formData.needSEO === "yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needSEO: e.target.checked ? "yes" : "",
                    }))
                  }
                  label="Cần tối ưu SEO"
                  className="seogo-service-check"
                />
                <small className="seogo-service-desc">
                  Tối ưu để lên top Google
                </small>
              </div>

              <div className="seogo-service-option">
                <Form.Check
                  type="checkbox"
                  name="needMaintenance"
                  value="yes"
                  checked={formData.needMaintenance === "yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      needMaintenance: e.target.checked ? "yes" : "",
                    }))
                  }
                  label="Cần bảo trì định kỳ"
                  className="seogo-service-check"
                />
                <small className="seogo-service-desc">
                  Backup, update, security
                </small>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="seogo-step-content">
            <div className="seogo-step-header">
              <h4 className="seogo-step-title">Thông Tin Liên Hệ</h4>
              <p className="seogo-step-description">
                Để chúng tôi có thể gửi báo giá chi tiết cho bạn
              </p>
            </div>

            <Row>
              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    Họ và tên *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    className="seogo-form-control"
                  />
                  {errors.name && (
                    <div className="seogo-error-message">{errors.name}</div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="seogo-form-control"
                  />
                  {errors.email && (
                    <div className="seogo-error-message">{errors.email}</div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    Số điện thoại *
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0123 456 789"
                    className="seogo-form-control"
                  />
                  {errors.phone && (
                    <div className="seogo-error-message">{errors.phone}</div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    Công ty/Tổ chức
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Tên công ty (không bắt buộc)"
                    className="seogo-form-control"
                  />
                </Form.Group>
              </Col>

              <Col lg={12}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    Ngân sách dự kiến *
                  </Form.Label>
                  <Form.Select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="seogo-form-control"
                  >
                    <option value="">Chọn ngân sách</option>
                    <option value="under-10">Dưới 10 triệu VNĐ</option>
                    <option value="10-20">10 - 20 triệu VNĐ</option>
                    <option value="20-50">20 - 50 triệu VNĐ</option>
                    <option value="50-100">50 - 100 triệu VNĐ</option>
                    <option value="over-100">Trên 100 triệu VNĐ</option>
                    <option value="discuss">Thảo luận chi tiết</option>
                  </Form.Select>
                  {errors.budget && (
                    <div className="seogo-error-message">{errors.budget}</div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={12}>
                <Form.Group className="seogo-form-group">
                  <Form.Label className="seogo-form-label">
                    Thông tin bổ sung
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Chia sẻ thêm về dự án, yêu cầu đặc biệt, hoặc bất kỳ thông tin nào bạn muốn chúng tôi biết..."
                    className="seogo-form-control"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitStatus === "success") {
    return (
      <section className="seogo-quote-request">
        <Card className="seogo-quote-card">
          <Card.Body className="seogo-success-body text-center">
            <div className="seogo-success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3 className="seogo-success-title">Yêu Cầu Đã Được Gửi!</h3>
            <p className="seogo-success-text">
              Cảm ơn bạn đã gửi yêu cầu báo giá. Chúng tôi sẽ phân tích thông
              tin và gửi báo giá chi tiết trong vòng 24 giờ.
            </p>
            <div className="seogo-next-steps">
              <h5>Các bước tiếp theo:</h5>
              <ul className="seogo-steps-list">
                <li>📧 Kiểm tra email xác nhận</li>
                <li>📞 Cuộc gọi tư vấn (nếu cần)</li>
                <li>📋 Nhận báo giá chi tiết</li>
                <li>🤝 Thảo luận và ký hợp đồng</li>
              </ul>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.reload()}
              className="seogo-new-quote-btn"
            >
              Gửi Yêu Cầu Mới
            </Button>
          </Card.Body>
        </Card>
      </section>
    );
  }

  return (
    <section className="seogo-quote-request">
      <Card className="seogo-quote-card">
        <Card.Header className="seogo-quote-header">
          <div className="seogo-header-content">
            <div className="seogo-header-icon">
              <i className="fas fa-calculator"></i>
            </div>
            <div className="seogo-header-text">
              <h3 className="seogo-quote-title">Yêu Cầu Báo Giá</h3>
              <p className="seogo-quote-subtitle">
                Hoàn thành form để nhận báo giá chi tiết và chính xác nhất
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="seogo-progress-container">
            <ProgressBar
              now={calculateProgress()}
              className="seogo-quote-progress"
            />
            <div className="seogo-progress-info">
              <span className="seogo-progress-text">
                Bước {currentStep} / {totalSteps}
              </span>
              <span className="seogo-progress-percent">
                {Math.round(calculateProgress())}%
              </span>
            </div>
          </div>
        </Card.Header>

        <Card.Body className="seogo-quote-body">
          {submitStatus === "error" && (
            <Alert variant="danger" className="seogo-error-alert mb-4">
              <i className="fas fa-exclamation-circle me-2"></i>
              Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp.
            </Alert>
          )}

          <Form
            onSubmit={
              currentStep === totalSteps
                ? handleSubmit
                : (e) => e.preventDefault()
            }
          >
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="seogo-form-navigation">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={handlePrevious}
                  className="seogo-nav-btn seogo-prev-btn"
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Quay lại
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  className="seogo-nav-btn seogo-next-btn ms-auto"
                >
                  Tiếp theo
                  <i className="fas fa-arrow-right ms-2"></i>
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="success"
                  disabled={isSubmitting}
                  className="seogo-nav-btn seogo-submit-btn ms-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span className="seogo-spinner"></span>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane me-2"></i>
                      Gửi Yêu Cầu
                    </>
                  )}
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default QuoteRequest;
