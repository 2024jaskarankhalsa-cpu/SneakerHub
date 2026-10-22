
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const dashboardRoot = document.getElementById("react-dashboard");

if (dashboardRoot) {
  createRoot(dashboardRoot).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
