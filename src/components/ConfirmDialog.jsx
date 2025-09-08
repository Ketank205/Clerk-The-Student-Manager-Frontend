/**
 * @module components/ConfirmDialog
 * @description Modal dialog component for confirming user actions
 */

import React from "react";

/**
 * ConfirmDialog Component
 * Renders a modal dialog for confirming user actions with customizable content
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.open - Controls dialog visibility
 * @param {string} [props.title="Are you sure?"] - Dialog title text
 * @param {string} props.message - Main confirmation message
 * @param {Function} props.onConfirm - Handler for confirmation action
 * @param {Function} props.onCancel - Handler for cancellation action
 * 
 * @example
 * return (
 *   <ConfirmDialog
 *     open={showDialog}
 *     title="Delete Student"
 *     message="Are you sure you want to delete this student?"
 *     onConfirm={() => handleDelete()}
 *     onCancel={() => setShowDialog(false)}
 *   />
 * )
 */
export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  // Don't render if dialog is not open
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>{title || "Are you sure?"}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn danger" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}