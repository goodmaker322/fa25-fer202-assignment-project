import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const handleNavClick = () => {
    setExpanded(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="seogo-header">
      <Navbar
        expand="lg"
        className="seogo-navbar"
        expanded={expanded}
        onToggle={setExpanded}
        fixed="top"
      >
        <Container>
          {/* Logo Section */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="seogo-logo-brand"
            onClick={handleNavClick}
          >
            <div className="seogo-logo-container">
              <img
                src="/logo.png"
                alt="SeoGo Website Design Services"
                className="seogo-logo-image"
                width="40"
                height="40"
              />
              <span className="seogo-logo-text">SeoGo</span>
            </div>
          </Navbar.Brand>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle
            aria-controls="seogo-navbar-nav"
            className="seogo-navbar-toggle"
          >
            <span className="seogo-toggle-icon"></span>
            <span className="seogo-toggle-icon"></span>
            <span className="seogo-toggle-icon"></span>
          </Navbar.Toggle>

          {/* Navigation Menu */}
          <Navbar.Collapse id="seogo-navbar-nav">
            <Nav className="seogo-nav-menu me-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={`seogo-nav-link ${
                  isActiveLink("/") ? "seogo-nav-active" : ""
                }`}
                onClick={handleNavClick}
              >
                Trang chủ
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/services"
                className={`seogo-nav-link ${
                  isActiveLink("/services") ? "seogo-nav-active" : ""
                }`}
                onClick={handleNavClick}
              >
                Dịch vụ
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/portfolio"
                className={`seogo-nav-link ${
                  isActiveLink("/portfolio") ? "seogo-nav-active" : ""
                }`}
                onClick={handleNavClick}
              >
                Portfolio
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/pricing"
                className={`seogo-nav-link ${
                  isActiveLink("/pricing") ? "seogo-nav-active" : ""
                }`}
                onClick={handleNavClick}
              >
                Bảng giá
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/contact"
                className={`seogo-nav-link ${
                  isActiveLink("/contact") ? "seogo-nav-active" : ""
                }`}
                onClick={handleNavClick}
              >
                Liên hệ
              </Nav.Link>
            </Nav>

            {/* CTA Buttons */}
            <div className="seogo-header-cta">
              <Button
                variant="outline-primary"
                as={Link}
                to="/contact"
                className="seogo-btn-quote me-2"
                onClick={handleNavClick}
              >
                Báo giá miễn phí
              </Button>

              <Button
                variant="primary"
                as={Link}
                to="/contact"
                className="seogo-btn-contact"
                onClick={handleNavClick}
              >
                Tư vấn ngay
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AppHeader;
