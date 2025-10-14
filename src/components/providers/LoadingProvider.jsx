import React, { createContext, useContext, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Đang tải...");

  const showLoading = (text = "Đang tải...") => {
    setLoadingText(text);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && (
        <div className="seogo-global-loading">
          <LoadingSpinner variant="gradient" size="xl" text={loadingText} />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
