import React from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const MainLayout = ({ children, className = "" }) => {
  return (
    <div className={`seogo-main-layout ${className}`}>
      {/* Header */}
      <AppHeader />

      {/* Main Content Area */}
      <main className="seogo-main-content">
        <div className="seogo-content-wrapper">{children}</div>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
};

export default MainLayout;
