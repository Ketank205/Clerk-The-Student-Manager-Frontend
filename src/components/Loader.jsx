/**
 * @module components/Loader
 * @description Loading indicator component with customizable label
 */

import React from "react";

/**
 * Loader Component
 * Renders a loading spinner with an optional label text
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.label="Loading..."] - Text displayed next to the spinner
 * 
 * @example
 * // Basic usage
 * return <Loader />
 * 
 * @example
 * // Custom label
 * return <Loader label="Please wait..." />
 */
export default function Loader({ label = "Loading..." }) {
  return (
    <div 
      role="status"
      aria-live="polite"
      style={{ display: "flex", gap: 10, alignItems: "center" }}
    >
      <div 
        className="loader" 
        aria-hidden="true"
      />
      <div style={{ color: "#666" }}>
        {label}
      </div>
    </div>
  );
}