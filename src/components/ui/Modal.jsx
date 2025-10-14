import React, { useState, useEffect } from "react";
import { Modal as BootstrapModal, Button } from "react-bootstrap";

const Modal = ({
  show = false,
  onHide,
  size = "md",
  variant = "default",
  backdrop = true,
  keyboard = true,
  centered = false,
  scrollable = false,
  fullscreen = false,
  animation = true,
  closeButton = true,
  className = "",
  children,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    onHide?.();
  };

  // Generate modal classes
  const getModalClasses = () => {
    let classes = ["seogo-modal"];

    // Variant classes
    classes.push(`seogo-modal-${variant}`);

    // Animation class
    if (!animation) classes.push("seogo-modal-no-animation");

    // Custom classes
    if (className) classes.push(className);

    return classes.join(" ");
  };

  const getModalSize = () => {
    if (fullscreen) return "fullscreen";
    return size;
  };

  return (
    <BootstrapModal
      show={isVisible}
      onHide={handleClose}
      size={getModalSize()}
      backdrop={backdrop}
      keyboard={keyboard}
      centered={centered}
      scrollable={scrollable}
      animation={animation}
      className={getModalClasses()}
      {...props}
    >
      {children}
    </BootstrapModal>
  );
};

// Modal Header Component
export const ModalHeader = ({
  children,
  title,
  subtitle,
  icon,
  variant = "default",
  closeButton = true,
  onClose,
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-modal-header",
    `seogo-modal-header-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <BootstrapModal.Header
      closeButton={closeButton}
      onHide={onClose}
      className={classes}
      {...props}
    >
      <div className="seogo-modal-header-content">
        {icon && (
          <div className="seogo-modal-header-icon">
            <i className={icon}></i>
          </div>
        )}

        <div className="seogo-modal-header-text">
          {title && (
            <BootstrapModal.Title className="seogo-modal-title">
              {title}
            </BootstrapModal.Title>
          )}
          {subtitle && <p className="seogo-modal-subtitle">{subtitle}</p>}
          {!title && !subtitle && children}
        </div>
      </div>
    </BootstrapModal.Header>
  );
};

// Modal Body Component
export const ModalBody = ({
  children,
  padding = "default",
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-modal-body",
    padding !== "default" ? `seogo-modal-body-${padding}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <BootstrapModal.Body className={classes} {...props}>
      {children}
    </BootstrapModal.Body>
  );
};

// Modal Footer Component
export const ModalFooter = ({
  children,
  align = "right",
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-modal-footer",
    `seogo-modal-footer-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <BootstrapModal.Footer className={classes} {...props}>
      {children}
    </BootstrapModal.Footer>
  );
};

// Confirmation Modal Component
export const ConfirmModal = ({
  show = false,
  onHide,
  onConfirm,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmText = "Xác nhận",
  cancelText = "Hủy bỏ",
  variant = "danger",
  icon = "fas fa-exclamation-triangle",
  loading = false,
  ...props
}) => {
  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      centered
      variant={variant}
      {...props}
    >
      <ModalHeader
        title={title}
        icon={icon}
        variant={variant}
        closeButton={false}
      />

      <ModalBody padding="lg">
        <p className="seogo-confirm-message">{message}</p>
      </ModalBody>

      <ModalFooter align="center">
        <div className="seogo-confirm-actions">
          <Button
            variant="outline-secondary"
            onClick={onHide}
            disabled={loading}
            className="seogo-cancel-btn"
          >
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={handleConfirm}
            disabled={loading}
            className="seogo-confirm-btn"
          >
            {loading && (
              <span className="seogo-btn-spinner">
                <span className="seogo-spinner-border"></span>
              </span>
            )}
            {confirmText}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

// Alert Modal Component
export const AlertModal = ({
  show = false,
  onHide,
  title = "Thông báo",
  message = "",
  variant = "info",
  icon = "fas fa-info-circle",
  buttonText = "Đóng",
  ...props
}) => {
  const getIconByVariant = () => {
    switch (variant) {
      case "success":
        return "fas fa-check-circle";
      case "warning":
        return "fas fa-exclamation-triangle";
      case "danger":
        return "fas fa-times-circle";
      case "info":
        return "fas fa-info-circle";
      default:
        return icon;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      centered
      variant={variant}
      {...props}
    >
      <ModalHeader
        title={title}
        icon={getIconByVariant()}
        variant={variant}
        closeButton={false}
      />

      <ModalBody padding="lg">
        <p className="seogo-alert-message">{message}</p>
      </ModalBody>

      <ModalFooter align="center">
        <Button variant={variant} onClick={onHide} className="seogo-alert-btn">
          {buttonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Image Modal Component
export const ImageModal = ({
  show = false,
  onHide,
  src = "",
  alt = "",
  title = "",
  description = "",
  gallery = [],
  currentIndex = 0,
  onNavigate,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const hasGallery = gallery && gallery.length > 0;
  const currentImage = hasGallery
    ? gallery[activeIndex]
    : { src, alt, title, description };

  const handlePrevious = () => {
    if (hasGallery && activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      onNavigate?.(newIndex);
    }
  };

  const handleNext = () => {
    if (hasGallery && activeIndex < gallery.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      onNavigate?.(newIndex);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      variant="dark"
      className="seogo-image-modal"
      {...props}
    >
      <ModalHeader title={currentImage.title || title} variant="dark" />

      <ModalBody padding="none">
        <div className="seogo-image-container">
          <img
            src={currentImage.src || src}
            alt={currentImage.alt || alt}
            className="seogo-modal-image"
          />

          {hasGallery && (
            <>
              {activeIndex > 0 && (
                <button
                  className="seogo-image-nav seogo-image-prev"
                  onClick={handlePrevious}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              )}

              {activeIndex < gallery.length - 1 && (
                <button
                  className="seogo-image-nav seogo-image-next"
                  onClick={handleNext}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              )}

              <div className="seogo-image-counter">
                {activeIndex + 1} / {gallery.length}
              </div>
            </>
          )}
        </div>

        {(currentImage.description || description) && (
          <div className="seogo-image-description">
            <p>{currentImage.description || description}</p>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

// Video Modal Component
export const VideoModal = ({
  show = false,
  onHide,
  src = "",
  title = "",
  type = "video", // 'video' | 'youtube' | 'vimeo'
  autoplay = true,
  ...props
}) => {
  const getEmbedUrl = () => {
    if (type === "youtube") {
      const videoId = src.includes("youtube.com")
        ? src.split("v=")[1]?.split("&")[0]
        : src.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}${
        autoplay ? "?autoplay=1" : ""
      }`;
    }

    if (type === "vimeo") {
      const videoId = src.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}${
        autoplay ? "?autoplay=1" : ""
      }`;
    }

    return src;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      variant="dark"
      className="seogo-video-modal"
      {...props}
    >
      <ModalHeader title={title} variant="dark" />

      <ModalBody padding="none">
        <div className="seogo-video-container">
          {type === "video" ? (
            <video
              src={src}
              controls
              autoPlay={autoplay}
              className="seogo-modal-video"
            />
          ) : (
            <iframe
              src={getEmbedUrl()}
              frameBorder="0"
              allowFullScreen
              className="seogo-modal-iframe"
              title={title}
            />
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

// Form Modal Component
export const FormModal = ({
  show = false,
  onHide,
  onSubmit,
  title = "Form",
  submitText = "Lưu",
  cancelText = "Hủy",
  loading = false,
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      centered
      backdrop="static"
      keyboard={!loading}
      {...props}
    >
      <form onSubmit={handleSubmit}>
        <ModalHeader title={title} closeButton={!loading} />

        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button
            variant="outline-secondary"
            onClick={onHide}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button type="submit" variant={variant} disabled={loading}>
            {loading && (
              <span className="seogo-btn-spinner">
                <span className="seogo-spinner-border"></span>
              </span>
            )}
            {submitText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default Modal;
