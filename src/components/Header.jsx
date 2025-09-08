/**
 * @module components/Header
 * @description Application header component with title and user controls
 */

import React from "react";

/**
 * Header Component
 * Renders the application header with branding and user authentication status
 * 
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
export default function Header() {
  return (
    <header 
      className="header" 
      role="banner"
      aria-label="Site header"
    >
      <div className="page-title">CLERK! The Student Manager</div>
      <div className="right">
        <div className="text-sm font-semibold">Welcome, User</div>
        <button className="btn ghost">Logout</button>
      </div>
    </header>
  );
}