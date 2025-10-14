import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "E-commerce Fashion Store",
      category: "ecommerce",
      image: "/images/project-1.jpg",
      client: "Fashion Brand Co.",
      description:
        "Website bán hàng thời trang với tính năng thanh toán online và quản lý kho hàng.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 2,
      title: "Corporate Business Website",
      category: "corporate",
      image: "/images/project-2.jpg",
      client: "ABC Corporation",
      description:
        "Website doanh nghiệp chuyên nghiệp với CMS quản trị và tối ưu SEO.",
      technologies: ["WordPress", "PHP", "MySQL"],
      liveUrl: "https://example.com",
      featured: false,
    },
    {
      id: 3,
      title: "Restaurant Landing Page",
      category: "landing",
      image: "/images/project-3.jpg",
      client: "Delicious Restaurant",
      description: "Landing page nhà hàng với booking system và menu online.",
      technologies: ["React", "Bootstrap", "Firebase"],
      liveUrl: "https://example.com",
      featured: true,
    },
    {
      id: 4,
      title: "Portfolio Website",
      category: "portfolio",
      image: "/images/project-4.jpg",
      client: "Creative Designer",
      description: "Website portfolio cá nhân với gallery và contact form.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      liveUrl: "https://example.com",
      featured: false,
    },
  ];

  const categories = [
    { id: "all", label: "Tất cả", count: projects.length },
    {
      id: "ecommerce",
      label: "E-commerce",
      count: projects.filter((p) => p.category === "ecommerce").length,
    },
    {
      id: "corporate",
      label: "Corporate",
      count: projects.filter((p) => p.category === "corporate").length,
    },
    {
      id: "landing",
      label: "Landing Page",
      count: projects.filter((p) => p.category === "landing").length,
    },
    {
      id: "portfolio",
      label: "Portfolio",
      count: projects.filter((p) => p.category === "portfolio").length,
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section className="seogo-project-showcase">
      <Container>
        {/* Section Header */}
        <Row>
          <Col lg={8} className="mx-auto text-center">
            <div className="seogo-section-header">
              <Badge bg="primary" className="seogo-section-badge">
                Portfolio
              </Badge>
              <h2 className="seogo-section-title">Các Dự Án Đã Hoàn Thành</h2>
              <p className="seogo-section-subtitle">
                Khám phá những website chất lượng cao mà chúng tôi đã tạo ra cho
                các khách hàng từ nhiều lĩnh vực khác nhau.
              </p>
            </div>
          </Col>
        </Row>

        {/* Filter Buttons */}
        <Row className="mb-5">
          <Col>
            <div className="seogo-filter-container">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`seogo-filter-btn ${
                    activeFilter === category.id ? "seogo-filter-active" : ""
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  {category.label}
                  <span className="seogo-filter-count">({category.count})</span>
                </button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Projects Grid */}
        <Row className="gy-4">
          {filteredProjects.map((project) => (
            <Col key={project.id} lg={6} md={6}>
              <Card className="seogo-project-card">
                <div className="seogo-project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="seogo-project-img"
                  />
                  <div className="seogo-project-overlay">
                    <div className="seogo-project-actions">
                      <Button
                        variant="light"
                        size="sm"
                        className="seogo-btn-preview me-2"
                        href={project.liveUrl}
                        target="_blank"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        Xem Demo
                      </Button>
                      <Button
                        variant="outline-light"
                        size="sm"
                        className="seogo-btn-details"
                      >
                        <i className="fas fa-info-circle"></i>
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                  {project.featured && (
                    <Badge bg="warning" className="seogo-featured-badge">
                      <i className="fas fa-star"></i> Nổi bật
                    </Badge>
                  )}
                </div>

                <Card.Body className="seogo-project-content">
                  <div className="seogo-project-meta">
                    <span className="seogo-project-category">
                      {
                        categories.find((cat) => cat.id === project.category)
                          ?.label
                      }
                    </span>
                    <span className="seogo-project-client">
                      {project.client}
                    </span>
                  </div>

                  <h4 className="seogo-project-title">{project.title}</h4>

                  <p className="seogo-project-description">
                    {project.description}
                  </p>

                  <div className="seogo-project-technologies">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        bg="secondary"
                        className="seogo-tech-badge me-1 mb-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* View More Button */}
        <Row className="mt-5">
          <Col className="text-center">
            <Button
              as={Link}
              to="/portfolio"
              variant="outline-primary"
              size="lg"
              className="seogo-btn-view-more"
            >
              <i className="fas fa-th-large me-2"></i>
              Xem Thêm Portfolio
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectShowcase;
