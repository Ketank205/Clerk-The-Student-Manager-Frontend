/**
 * @module main
 * @description Application entry point that sets up React root and context providers
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StudentProvider } from "./context/StudentContext";
import { ToastProvider } from "./context/ToastContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

/**
 * Application Root Configuration
 * 
 * Provider Hierarchy (outside to inside):
 * 1. React.StrictMode - Enables additional development checks
 * 2. BrowserRouter   - Enables client-side routing
 * 3. ToastProvider   - Manages notification system
 * 4. StudentProvider - Manages student data state
 * 5. App            - Main application component
 * 
 * Note: Provider order is important for dependency resolution
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);