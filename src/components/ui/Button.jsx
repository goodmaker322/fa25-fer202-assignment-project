import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  rounded = true,
  gradient = false,
  outline = false,
  animate = true,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  // Generate class names
  const getButtonClasses = () => {
    let classes = ["seogo-btn"];

    // Variant classes
    if (outline) {
      classes.push(`seogo-btn-outline-${variant}`);
    } else if (gradient) {
      classes.push(`seogo-btn-gradient-${variant}`);
    } else {
      classes.push(`seogo-btn-${variant}`);
    }

    // Size classes
    classes.push(`seogo-btn-${size}`);

    // Modifier classes
    if (fullWidth) classes.push("seogo-btn-block");
    if (rounded) classes.push("seogo-btn-rounded");
    if (animate) classes.push("seogo-btn-animate");
    if (loading) classes.push("seogo-btn-loading");

    // Custom classes
    if (className) classes.push(className);

    return classes.join(" ");
  };

  // Render loading spinner
  const renderSpinner = () => (
    <span className="seogo-btn-spinner">
      <span className="seogo-spinner-border"></span>
    </span>
  );

  // Render icon
  const renderIcon = (position) => {
    if (!icon || loading) return null;

    return (
      <span className={`seogo-btn-icon seogo-btn-icon-${position}`}>
        <i className={icon}></i>
      </span>
    );
  };

  return (
    <button
      type={type}
      className={getButtonClasses()}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && renderSpinner()}
      {iconPosition === "left" && renderIcon("left")}

      <span className="seogo-btn-content">{children}</span>

      {iconPosition === "right" && renderIcon("right")}
    </button>
  );
};

// Button Group Component
export const ButtonGroup = ({
  children,
  vertical = false,
  size = "md",
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-btn-group",
    vertical ? "seogo-btn-group-vertical" : "",
    size !== "md" ? `seogo-btn-group-${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Icon Button Component
export const IconButton = ({
  icon,
  variant = "primary",
  size = "md",
  rounded = true,
  tooltip,
  className = "",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      rounded={rounded}
      className={`seogo-btn-icon-only ${className}`}
      title={tooltip}
      {...props}
    >
      <i className={icon}></i>
    </Button>
  );
};

// Floating Action Button
export const FloatingButton = ({
  icon = "fas fa-plus",
  variant = "primary",
  size = "lg",
  position = "bottom-right",
  className = "",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      rounded={true}
      className={`seogo-btn-floating seogo-btn-floating-${position} ${className}`}
      {...props}
    >
      <i className={icon}></i>
    </Button>
  );
};

export default Button;
