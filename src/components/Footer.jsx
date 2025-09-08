/**
 * @module components/Footer
 * @description Footer component displaying copyright and build information
 */

import React from "react";

/**
 * Footer Component
 * Renders a sticky footer with copyright notice and build stack information
 * 
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
export default function Footer() {
  return (
    <footer 
      className="header mt-12 sticky-bottom" 
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="text-xl">
        © {new Date().getFullYear()} Ketankumar Borse 
      </div>
      <div className="text-sm">Built with React + Vite</div>
    </footer>
  );
}