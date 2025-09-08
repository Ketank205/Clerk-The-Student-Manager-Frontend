/**
 * @module context/ToastContext
 * @description Context provider for managing toast notifications globally
 */

import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * Context for toast notifications
 * @type {React.Context}
 */
const ToastContext = createContext();

/**
 * Provider component for toast notification system
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap
 * 
 * @example
 * return (
 *   <ToastProvider>
 *     <App />
 *   </ToastProvider>
 * )
 */
export function ToastProvider({ children }) {
  /**
   * State for managing toast notifications
   * @type {[Array, Function]} Toast state and setter
   */
  const [toasts, setToasts] = useState([]);

  /**
   * Display a new toast notification
   * @function showToast
   * @param {string} message - Toast message content
   * @param {('info'|'success'|'error')} [type='info'] - Toast type/style
   * @param {number} [duration=3000] - Display duration in milliseconds
   */
  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((cur) => [...cur, newToast]);

    setTimeout(() => {
      setToasts((cur) => cur.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Hook to access toast notification functionality
 * @returns {Object} Toast context value
 * @returns {Function} showToast - Function to display a toast
 * @throws {Error} When used outside of ToastProvider
 * 
 * @example
 * function MyComponent() {
 *   const { showToast } = useToast();
 *   
 *   const handleSuccess = () => {
 *     showToast("Operation successful!", "success");
 *   };
 * 
 *   const handleError = () => {
 *     showToast("Something went wrong!", "error");
 *   };
 * 
 *   return <button onClick={handleSuccess}>Do Something</button>;
 * }
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}