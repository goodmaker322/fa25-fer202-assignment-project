import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    urgency: "normal",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const serviceOptions = [
    { value: "", label: "Chọn dịch vụ quan tâm" },
    { value: "landing-page", label: "Landing Page" },
    { value: "ecommerce", label: "E-commerce Website" },
    { value: "corporate", label: "Corporate Website" },
    { value: "portfolio", label: "Portfolio Website" },
    { value: "custom", label: "Custom Development" },
    { value: "maintenance", label: "Website Maintenance" },
    { value: "consultation", label: "Tư vấn miễn phí" },
  ];

  const budgetOptions = [
    { value: "", label: "Chọn ngân sách dự kiến" },
    { value: "5-10", label: "5 - 10 triệu VNĐ" },
    { value: "10-20", label: "10 - 20 triệu VNĐ" },
    { value: "20-50", label: "20 - 50 triệu VNĐ" },
    { value: "50-100", label: "50 - 100 triệu VNĐ" },
    { value: "100+", label: "Trên 100 triệu VNĐ" },
    { value: "discuss", label: "Thảo luận chi tiết" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Họ tên phải có ít nhất 2 ký tự";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Định dạng email không hợp lệ";
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = "Vui lòng chọn dịch vụ quan tâm";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung tin nhắn";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Tin nhắn phải có ít nhất 10 ký tự";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would normally send data to your backend
      console.log("Form Data:", formData);

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        budget: "",
        message: "",
        urgency: "normal",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="seogo-contact-form">
      <Card className="seogo-form-card">
        <Card.Header className="seogo-form-header">
          <div className="seogo-header-content">
            <div className="seogo-header-icon">
              <i className="fas fa-paper-plane"></i>
            </div>
            <div className="seogo-header-text">
              <h3 className="seogo-form-title">Liên Hệ Với Chúng Tôi</h3>
              <p className="seogo-form-subtitle">
                Chia sẻ ý tưởng và nhận tư vấn miễn phí từ chuyên gia
              </p>
            </div>
          </div>
        </Card.Header>

        <Card.Body className="seogo-form-body">
          {submitStatus === "success" && (
            <Alert variant="success" className="seogo-success-alert">
              <div className="seogo-alert-content">
                <i className="fas fa-check-circle seogo-alert-icon"></i>
                <div>
                  <h5 className="seogo-alert-title">Gửi thành công!</h5>
                  <p className="seogo-alert-text">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24
                    giờ.
                  </p>
                </div>
              </div>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert variant="danger" className="seogo-error-alert">
              <div className="seogo-alert-content">
                <i className="fas fa-exclamation-circle seogo-alert-icon"></i>
                <div>
                  <h5 className="seogo-alert-title">Có lỗi xảy ra!</h5>
                  <p className="seogo-alert-text">
                    Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.
                  </p>
                </div>
              </div>
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="seogo-contact-form-fields">
            <Row>
              {/* Personal Information */}
              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    <i className="fas fa-user seogo-label-icon"></i>
                    Họ và tên *
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên của bạn"
                      className={`seogo-form-control ${
                        errors.name ? "seogo-form-error" : ""
                      }`}
                    />
                  </InputGroup>
                  {errors.name && (
                    <div className="seogo-error-message">
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.name}
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    <i className="fas fa-envelope seogo-label-icon"></i>
                    Email *
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      className={`seogo-form-control ${
                        errors.email ? "seogo-form-error" : ""
                      }`}
                    />
                  </InputGroup>
                  {errors.email && (
                    <div className="seogo-error-message">
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.email}
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    <i className="fas fa-phone seogo-label-icon"></i>
                    Số điện thoại *
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0123 456 789"
                      className={`seogo-form-control ${
                        errors.phone ? "seogo-form-error" : ""
                      }`}
                    />
                  </InputGroup>
                  {errors.phone && (
                    <div className="seogo-error-message">
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.phone}
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    <i className="fas fa-building seogo-label-icon"></i>
                    Công ty/Tổ chức
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Tên công ty (không bắt buộc)"
                      className="seogo-form-control"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Service Information */}
              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    <i className="fas fa-cogs seogo-label-icon"></i>
                    Dịch vụ quan tâm *
                  </Form.Label>
                  <Form.Select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`seogo-form-control ${
                      errors.service ? "seogo-form-error" : ""
                    }`}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.service && (
                    <div className="seogo-error-message">
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.service}
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    <i className="fas fa-dollar-sign seogo-label-icon"></i>
                    Ngân sách dự kiến
                  </Form.Label>
                  <Form.Select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="seogo-form-control"
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Urgency */}
              <Col lg={12}>
                <Form.Group className="seogo-form-group mb-3">
                  <Form.Label className="seogo-form-label">
                    <i className="fas fa-clock seogo-label-icon"></i>
                    Mức độ khẩn cấp
                  </Form.Label>
                  <div className="seogo-radio-group">
                    <Form.Check
                      type="radio"
                      name="urgency"
                      value="low"
                      checked={formData.urgency === "low"}
                      onChange={handleInputChange}
                      label="Không gấp (1-2 tháng)"
                      className="seogo-radio-item"
                    />
                    <Form.Check
                      type="radio"
                      name="urgency"
                      value="normal"
                      checked={formData.urgency === "normal"}
                      onChange={handleInputChange}
                      label="Bình thường (2-4 tuần)"
                      className="seogo-radio-item"
                    />
                    <Form.Check
                      type="radio"
                      name="urgency"
                      value="high"
                      checked={formData.urgency === "high"}
                      onChange={handleInputChange}
                      label="Khẩn cấp (1-2 tuần)"
                      className="seogo-radio-item"
                    />
                  </div>
                </Form.Group>
              </Col>

              {/* Message */}
              <Col lg={12}>
                <Form.Group className="seogo-form-group mb-4">
                  <Form.Label className="seogo-form-label">
                    <i className="fas fa-comment seogo-label-icon"></i>
                    Mô tả chi tiết dự án *
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hãy mô tả chi tiết về dự án website bạn muốn thực hiện, bao gồm mục tiêu, tính năng mong muốn và bất kỳ yêu cầu đặc biệt nào..."
                    className={`seogo-form-control seogo-textarea ${
                      errors.message ? "seogo-form-error" : ""
                    }`}
                  />
                  {errors.message && (
                    <div className="seogo-error-message">
                      <i className="fas fa-exclamation-triangle"></i>
                      {errors.message}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Submit Button */}
            <div className="seogo-form-submit">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="seogo-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="seogo-spinner"></span>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane me-2"></i>
                    Gửi Yêu Cầu Tư Vấn
                  </>
                )}
              </Button>

              <p className="seogo-form-note">
                <i className="fas fa-shield-alt me-2"></i>
                Thông tin của bạn được bảo mật và chỉ sử dụng để tư vấn dịch vụ
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default ContactForm;
