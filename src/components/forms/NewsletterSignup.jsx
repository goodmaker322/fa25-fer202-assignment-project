import React, { useState } from "react";
import { Form, Button, Alert, InputGroup, Card } from "react-bootstrap";

const NewsletterSignup = ({
  variant = "default",
  showHeader = true,
  size = "default",
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Định dạng email không hợp lệ");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would normally send data to your backend
      console.log("Newsletter signup:", email);

      setSubmitStatus("success");
      setEmail("");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Compact version for footer or sidebar
  if (variant === "compact") {
    return (
      <div className="seogo-newsletter-compact">
        {showHeader && (
          <div className="seogo-newsletter-header-compact">
            <h6 className="seogo-newsletter-title-compact">
              📧 Nhận tin tức mới nhất
            </h6>
            <p className="seogo-newsletter-subtitle-compact">
              Cập nhật xu hướng thiết kế web và SEO
            </p>
          </div>
        )}

        {submitStatus === "success" && (
          <Alert variant="success" className="seogo-newsletter-alert-compact">
            <i className="fas fa-check-circle me-2"></i>
            Đăng ký thành công!
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="seogo-newsletter-form-compact">
          <InputGroup className="seogo-input-group-compact">
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Nhập email của bạn"
              className={`seogo-email-input-compact ${
                error ? "seogo-input-error" : ""
              }`}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="seogo-submit-btn-compact"
            >
              {isSubmitting ? (
                <span className="seogo-spinner-compact"></span>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
            </Button>
          </InputGroup>

          {error && (
            <div className="seogo-error-compact">
              <i className="fas fa-exclamation-triangle me-1"></i>
              {error}
            </div>
          )}
        </Form>
      </div>
    );
  }

  // Full version for dedicated sections
  return (
    <section className={`seogo-newsletter-signup seogo-newsletter-${size}`}>
      <Card className="seogo-newsletter-card">
        <Card.Body className="seogo-newsletter-body">
          {showHeader && (
            <div className="seogo-newsletter-header">
              <div className="seogo-newsletter-icon">
                <i className="fas fa-envelope-open-text"></i>
              </div>
              <h3 className="seogo-newsletter-title">Đăng Ký Nhận Tin Tức</h3>
              <p className="seogo-newsletter-subtitle">
                Nhận thông tin mới nhất về xu hướng thiết kế web, SEO tips, và
                các ưu đãi đặc biệt từ SeoGo.
              </p>

              <div className="seogo-newsletter-benefits">
                <div className="seogo-benefit-item">
                  <i className="fas fa-check seogo-benefit-icon"></i>
                  <span>Tips thiết kế web hàng tuần</span>
                </div>
                <div className="seogo-benefit-item">
                  <i className="fas fa-check seogo-benefit-icon"></i>
                  <span>Xu hướng SEO mới nhất</span>
                </div>
                <div className="seogo-benefit-item">
                  <i className="fas fa-check seogo-benefit-icon"></i>
                  <span>Ưu đãi độc quyền cho subscriber</span>
                </div>
              </div>
            </div>
          )}

          {submitStatus === "success" && (
            <Alert variant="success" className="seogo-newsletter-alert">
              <div className="seogo-alert-content">
                <i className="fas fa-check-circle seogo-alert-icon"></i>
                <div>
                  <h5 className="seogo-alert-title">Đăng ký thành công! 🎉</h5>
                  <p className="seogo-alert-text">
                    Cảm ơn bạn đã đăng ký. Hãy kiểm tra email để xác nhận đăng
                    ký.
                  </p>
                </div>
              </div>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert variant="danger" className="seogo-newsletter-alert">
              <div className="seogo-alert-content">
                <i className="fas fa-exclamation-circle seogo-alert-icon"></i>
                <div>
                  <h5 className="seogo-alert-title">Có lỗi xảy ra</h5>
                  <p className="seogo-alert-text">
                    Vui lòng thử lại sau hoặc liên hệ với chúng tôi.
                  </p>
                </div>
              </div>
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="seogo-newsletter-form">
            <div className="seogo-form-group">
              <Form.Label className="seogo-form-label">
                <i className="fas fa-envelope seogo-label-icon"></i>
                Địa chỉ email
              </Form.Label>

              <InputGroup className="seogo-input-group">
                <InputGroup.Text className="seogo-input-addon">
                  <i className="fas fa-at"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="example@email.com"
                  className={`seogo-email-input ${
                    error ? "seogo-input-error" : ""
                  }`}
                  disabled={isSubmitting}
                />
              </InputGroup>

              {error && (
                <div className="seogo-error-message">
                  <i className="fas fa-exclamation-triangle"></i>
                  {error}
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="seogo-submit-btn w-100"
            >
              {isSubmitting ? (
                <>
                  <span className="seogo-spinner"></span>
                  Đang đăng ký...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane me-2"></i>
                  Đăng Ký Ngay
                </>
              )}
            </Button>

            <p className="seogo-privacy-note">
              <i className="fas fa-shield-alt me-2"></i>
              Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký
              bất cứ lúc nào.
            </p>
          </Form>

          {/* Social Proof */}
          <div className="seogo-social-proof">
            <div className="seogo-subscribers-count">
              <i className="fas fa-users seogo-count-icon"></i>
              <span className="seogo-count-number">2,500+</span>
              <span className="seogo-count-text">người đã đăng ký</span>
            </div>

            <div className="seogo-testimonial">
              <div className="seogo-testimonial-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="seogo-testimonial-text">
                "Nội dung rất hữu ích và cập nhật. Đáng để theo dõi!"
              </p>
              <cite className="seogo-testimonial-author">
                - Nguyễn Văn A, Web Developer
              </cite>
            </div>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default NewsletterSignup;
