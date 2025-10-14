import React from "react";

const Card = ({
  children,
  variant = "default",
  size = "md",
  shadow = "md",
  hover = false,
  border = true,
  rounded = true,
  clickable = false,
  loading = false,
  className = "",
  onClick,
  ...props
}) => {
  // Generate card classes
  const getCardClasses = () => {
    let classes = ["seogo-card"];

    // Variant classes
    classes.push(`seogo-card-${variant}`);

    // Size classes
    classes.push(`seogo-card-${size}`);

    // Shadow classes
    if (shadow) classes.push(`seogo-card-shadow-${shadow}`);

    // Modifier classes
    if (hover) classes.push("seogo-card-hover");
    if (!border) classes.push("seogo-card-borderless");
    if (rounded) classes.push("seogo-card-rounded");
    if (clickable) classes.push("seogo-card-clickable");
    if (loading) classes.push("seogo-card-loading");

    // Custom classes
    if (className) classes.push(className);

    return classes.join(" ");
  };

  return (
    <div
      className={getCardClasses()}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {loading && <div className="seogo-card-loading-overlay" />}
      {children}
    </div>
  );
};

// Card Header Component
export const CardHeader = ({
  children,
  title,
  subtitle,
  icon,
  actions,
  divider = true,
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-card-header",
    divider ? "seogo-card-header-divider" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      <div className="seogo-card-header-content">
        {icon && (
          <div className="seogo-card-header-icon">
            <i className={icon}></i>
          </div>
        )}

        <div className="seogo-card-header-text">
          {title && <h5 className="seogo-card-title">{title}</h5>}
          {subtitle && <p className="seogo-card-subtitle">{subtitle}</p>}
          {!title && !subtitle && children}
        </div>
      </div>

      {actions && <div className="seogo-card-header-actions">{actions}</div>}
    </div>
  );
};

// Card Body Component
export const CardBody = ({
  children,
  padding = "default",
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-card-body",
    padding !== "default" ? `seogo-card-body-${padding}` : "",
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

// Card Footer Component
export const CardFooter = ({
  children,
  divider = true,
  align = "left",
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-card-footer",
    divider ? "seogo-card-footer-divider" : "",
    `seogo-card-footer-${align}`,
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

// Card Image Component
export const CardImage = ({
  src,
  alt,
  position = "top",
  height,
  overlay = false,
  overlayContent,
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-card-image",
    `seogo-card-image-${position}`,
    overlay ? "seogo-card-image-overlay" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const imageStyle = height ? { height } : {};

  return (
    <div className={classes} style={imageStyle} {...props}>
      <img src={src} alt={alt} className="seogo-card-img" />
      {overlay && overlayContent && (
        <div className="seogo-card-image-overlay-content">{overlayContent}</div>
      )}
    </div>
  );
};

// Card Stats Component
export const CardStats = ({
  stats = [],
  variant = "horizontal",
  className = "",
  ...props
}) => {
  const classes = ["seogo-card-stats", `seogo-card-stats-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {stats.map((stat, index) => (
        <div key={index} className="seogo-card-stat-item">
          {stat.icon && (
            <div className="seogo-card-stat-icon">
              <i className={stat.icon}></i>
            </div>
          )}
          <div className="seogo-card-stat-content">
            <span className="seogo-card-stat-value">{stat.value}</span>
            <span className="seogo-card-stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Card Grid Component
export const CardGrid = ({
  children,
  columns = 3,
  gap = "md",
  responsive = true,
  className = "",
  ...props
}) => {
  const classes = [
    "seogo-card-grid",
    `seogo-card-grid-cols-${columns}`,
    `seogo-card-grid-gap-${gap}`,
    responsive ? "seogo-card-grid-responsive" : "",
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

// Profile Card Component
export const ProfileCard = ({
  avatar,
  name,
  title,
  description,
  stats,
  actions,
  social,
  className = "",
  ...props
}) => {
  return (
    <Card className={`seogo-profile-card ${className}`} {...props}>
      <CardBody padding="lg">
        <div className="seogo-profile-header">
          {avatar && (
            <div className="seogo-profile-avatar">
              <img src={avatar} alt={name} />
            </div>
          )}

          <div className="seogo-profile-info">
            <h4 className="seogo-profile-name">{name}</h4>
            {title && <p className="seogo-profile-title">{title}</p>}
          </div>
        </div>

        {description && (
          <div className="seogo-profile-description">
            <p>{description}</p>
          </div>
        )}

        {stats && <CardStats stats={stats} />}

        {social && (
          <div className="seogo-profile-social">
            {social.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="seogo-profile-social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={item.icon}></i>
              </a>
            ))}
          </div>
        )}

        {actions && <div className="seogo-profile-actions">{actions}</div>}
      </CardBody>
    </Card>
  );
};

export default Card;
