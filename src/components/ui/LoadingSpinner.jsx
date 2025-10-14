import React from "react";

const LoadingSpinner = ({
  variant = "default",
  size = "md",
  color = "primary",
  speed = "normal",
  overlay = false,
  text = "",
  position = "center",
  className = "",
  ...props
}) => {
  // Generate spinner classes
  const getSpinnerClasses = () => {
    let classes = ["seogo-loading-spinner"];

    // Variant classes
    classes.push(`seogo-spinner-${variant}`);

    // Size classes
    classes.push(`seogo-spinner-${size}`);

    // Color classes
    classes.push(`seogo-spinner-${color}`);

    // Speed classes
    classes.push(`seogo-spinner-${speed}`);

    // Position classes
    if (overlay) classes.push(`seogo-spinner-${position}`);

    // Custom classes
    if (className) classes.push(className);

    return classes.join(" ");
  };

  const SpinnerComponent = () => {
    const spinnerContent = (() => {
      switch (variant) {
        case "dots":
          return (
            <div className="seogo-spinner-dots">
              <div className="seogo-dot"></div>
              <div className="seogo-dot"></div>
              <div className="seogo-dot"></div>
            </div>
          );

        case "pulse":
          return <div className="seogo-spinner-pulse"></div>;

        case "ring":
          return <div className="seogo-spinner-ring"></div>;

        case "wave":
          return (
            <div className="seogo-spinner-wave">
              <div className="seogo-wave-bar"></div>
              <div className="seogo-wave-bar"></div>
              <div className="seogo-wave-bar"></div>
              <div className="seogo-wave-bar"></div>
              <div className="seogo-wave-bar"></div>
            </div>
          );

        case "bounce":
          return (
            <div className="seogo-spinner-bounce">
              <div className="seogo-bounce-ball"></div>
              <div className="seogo-bounce-ball"></div>
            </div>
          );

        case "squares":
          return (
            <div className="seogo-spinner-squares">
              <div className="seogo-square"></div>
              <div className="seogo-square"></div>
              <div className="seogo-square"></div>
              <div className="seogo-square"></div>
            </div>
          );

        case "bars":
          return (
            <div className="seogo-spinner-bars">
              <div className="seogo-bar"></div>
              <div className="seogo-bar"></div>
              <div className="seogo-bar"></div>
            </div>
          );

        case "circle":
          return <div className="seogo-spinner-circle"></div>;

        case "gradient":
          return <div className="seogo-spinner-gradient"></div>;

        default:
          return <div className="seogo-spinner-default"></div>;
      }
    })();

    return (
      <div className={getSpinnerClasses()} {...props}>
        {spinnerContent}
        {text && <div className="seogo-spinner-text">{text}</div>}
      </div>
    );
  };

  if (overlay) {
    return (
      <div className="seogo-spinner-overlay">
        <SpinnerComponent />
      </div>
    );
  }

  return <SpinnerComponent />;
};

// Inline Spinner for buttons and small spaces
export const InlineSpinner = ({
  size = "sm",
  color = "inherit",
  className = "",
  ...props
}) => {
  return (
    <span
      className={`seogo-inline-spinner seogo-spinner-${size} seogo-spinner-${color} ${className}`}
      {...props}
    >
      <span className="seogo-spinner-default"></span>
    </span>
  );
};

// Page Loading Component
export const PageLoader = ({
  message = "Đang tải...",
  variant = "gradient",
  logo,
  className = "",
  ...props
}) => {
  return (
    <div className={`seogo-page-loader ${className}`} {...props}>
      <div className="seogo-page-loader-content">
        {logo && (
          <div className="seogo-loader-logo">
            <img src={logo} alt="Logo" />
          </div>
        )}

        <LoadingSpinner variant={variant} size="lg" color="primary" />

        <div className="seogo-loader-message">{message}</div>
      </div>
    </div>
  );
};

// Skeleton Loader Component
export const SkeletonLoader = ({
  variant = "text",
  width = "100%",
  height,
  count = 1,
  animation = true,
  className = "",
  ...props
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`seogo-skeleton seogo-skeleton-${variant} ${
        animation ? "seogo-skeleton-animate" : ""
      }`}
      style={{
        width,
        height:
          height ||
          (variant === "text"
            ? "1rem"
            : variant === "title"
            ? "2rem"
            : "200px"),
      }}
    />
  ));

  return (
    <div className={`seogo-skeleton-container ${className}`} {...props}>
      {skeletons}
    </div>
  );
};

// Loading Button Component
export const LoadingButton = ({
  loading = false,
  children,
  loadingText = "Đang xử lý...",
  spinnerVariant = "default",
  disabled,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`seogo-btn seogo-loading-btn ${
        loading ? "seogo-btn-loading" : ""
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <InlineSpinner variant={spinnerVariant} size="sm" color="inherit" />
      )}
      <span className={`seogo-btn-content ${loading ? "seogo-loading" : ""}`}>
        {loading ? loadingText : children}
      </span>
    </button>
  );
};

// Progress Ring Component
export const ProgressRing = ({
  progress = 0,
  size = 100,
  strokeWidth = 8,
  color = "primary",
  showText = true,
  className = "",
  ...props
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`seogo-progress-ring seogo-progress-${color} ${className}`}
      {...props}
    >
      <svg width={size} height={size} className="seogo-progress-svg">
        <circle
          className="seogo-progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="seogo-progress-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showText && (
        <div className="seogo-progress-text">{Math.round(progress)}%</div>
      )}
    </div>
  );
};

export default LoadingSpinner;
