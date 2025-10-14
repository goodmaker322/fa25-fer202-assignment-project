import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const ClientReviews = () => {
  const [currentReview, setCurrentReview] = useState(0);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      position: "CEO",
      company: "Fashion Store Co.",
      avatar: "/images/avatar-1.jpg",
      rating: 5,
      review:
        "SeoGo đã tạo ra một website e-commerce tuyệt vời cho công ty chúng tôi. Doanh số tăng 300% sau khi ra mắt website mới.",
      project: "E-commerce Website",
      date: "2024-01-15",
      featured: true,
    },
    {
      id: 2,
      name: "Trần Thị Bích",
      position: "Marketing Manager",
      company: "ABC Corporation",
      avatar: "/images/avatar-2.jpg",
      rating: 5,
      review:
        "Đội ngũ chuyên nghiệp, thiết kế đẹp và tối ưu SEO rất tốt. Website của chúng tôi hiện đứng top Google.",
      project: "Corporate Website",
      date: "2024-02-20",
      featured: false,
    },
    {
      id: 3,
      name: "Lê Hoàng Nam",
      position: "Restaurant Owner",
      company: "Delicious Restaurant",
      avatar: "/images/avatar-3.jpg",
      rating: 5,
      review:
        "Landing page nhà hàng đẹp mắt và hiệu quả. Số lượng đặt bàn online tăng gấp đôi chỉ sau 1 tháng.",
      project: "Restaurant Landing Page",
      date: "2024-03-10",
      featured: true,
    },
    {
      id: 4,
      name: "Phạm Thị Lan",
      position: "Creative Director",
      company: "Design Studio",
      avatar: "/images/avatar-4.jpg",
      rating: 5,
      review:
        "Portfolio website cực kỳ ấn tượng và sáng tạo. Tôi đã nhận được nhiều dự án mới nhờ website này.",
      project: "Portfolio Website",
      date: "2024-03-25",
      featured: false,
    },
    {
      id: 5,
      name: "Hoàng Minh Đức",
      position: "Startup Founder",
      company: "Tech Startup",
      avatar: "/images/avatar-5.jpg",
      rating: 5,
      review:
        "Dịch vụ tuyệt vời! Website startup của chúng tôi được hoàn thành đúng thời hạn và vượt ngoài mong đợi.",
      project: "Startup Website",
      date: "2024-04-05",
      featured: true,
    },
  ];

  // Auto rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleReviewSelect = (index) => {
    setCurrentReview(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fas fa-star seogo-star ${
          index < rating ? "seogo-star-filled" : "seogo-star-empty"
        }`}
      ></i>
    ));
  };

  const featuredReviews = reviews.filter((review) => review.featured);

  return (
    <section className="seogo-client-reviews">
      <Container>
        {/* Section Header */}
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <div className="seogo-section-header">
              <Badge bg="success" className="seogo-section-badge">
                Testimonials
              </Badge>
              <h2 className="seogo-section-title">
                Khách Hàng Nói Gì Về Chúng Tôi
              </h2>
              <p className="seogo-section-subtitle">
                Đọc những phản hồi chân thực từ các khách hàng đã tin tưởng và
                sử dụng dịch vụ thiết kế website của SeoGo.
              </p>
            </div>
          </Col>
        </Row>

        {/* Featured Review Carousel */}
        <Row className="mb-5">
          <Col>
            <div className="seogo-featured-review">
              <Card className="seogo-review-main-card">
                <Card.Body className="seogo-review-main-content">
                  <div className="seogo-review-quote">
                    <i className="fas fa-quote-left seogo-quote-icon"></i>
                    <blockquote className="seogo-review-text">
                      {reviews[currentReview].review}
                    </blockquote>
                    <i className="fas fa-quote-right seogo-quote-icon"></i>
                  </div>

                  <div className="seogo-review-rating">
                    {renderStars(reviews[currentReview].rating)}
                  </div>

                  <div className="seogo-review-author">
                    <img
                      src={reviews[currentReview].avatar}
                      alt={reviews[currentReview].name}
                      className="seogo-author-avatar"
                    />
                    <div className="seogo-author-info">
                      <h5 className="seogo-author-name">
                        {reviews[currentReview].name}
                      </h5>
                      <p className="seogo-author-position">
                        {reviews[currentReview].position} tại{" "}
                        {reviews[currentReview].company}
                      </p>
                      <span className="seogo-project-type">
                        Dự án: {reviews[currentReview].project}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Review Navigation Dots */}
              <div className="seogo-review-navigation">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    className={`seogo-nav-dot ${
                      currentReview === index ? "seogo-nav-active" : ""
                    }`}
                    onClick={() => handleReviewSelect(index)}
                  ></button>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {/* Review Grid */}
        <Row className="gy-4">
          {featuredReviews.slice(0, 3).map((review) => (
            <Col key={review.id} lg={4} md={6}>
              <Card className="seogo-review-card">
                <Card.Body className="seogo-review-card-content">
                  <div className="seogo-review-header">
                    <div className="seogo-review-rating-small">
                      {renderStars(review.rating)}
                    </div>
                    <span className="seogo-review-date">
                      {new Date(review.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  <p className="seogo-review-text-small">"{review.review}"</p>

                  <div className="seogo-review-footer">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="seogo-avatar-small"
                    />
                    <div className="seogo-author-details">
                      <h6 className="seogo-author-name-small">{review.name}</h6>
                      <small className="seogo-author-company">
                        {review.company}
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Stats Section */}
        <Row className="mt-5">
          <Col>
            <div className="seogo-review-stats">
              <Row className="text-center">
                <Col md={3} sm={6}>
                  <div className="seogo-stat-item">
                    <span className="seogo-stat-number">98%</span>
                    <span className="seogo-stat-label">
                      Khách hàng hài lòng
                    </span>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="seogo-stat-item">
                    <span className="seogo-stat-number">5.0</span>
                    <span className="seogo-stat-label">
                      Đánh giá trung bình
                    </span>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="seogo-stat-item">
                    <span className="seogo-stat-number">100+</span>
                    <span className="seogo-stat-label">Dự án hoàn thành</span>
                  </div>
                </Col>
                <Col md={3} sm={6}>
                  <div className="seogo-stat-item">
                    <span className="seogo-stat-number">24/7</span>
                    <span className="seogo-stat-label">Hỗ trợ khách hàng</span>
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

export default ClientReviews;
