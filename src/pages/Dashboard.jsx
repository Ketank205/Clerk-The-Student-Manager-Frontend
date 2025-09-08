/**
 * @module pages/Dashboard
 * @description Main layout component that provides the application structure with header, 
 * sidebar, content area, and footer
 */

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

/**
 * Dashboard Component
 * Renders the main application layout with collapsible sidebar
 * 
 * @component
 * @example
 * return (
 *   <BrowserRouter>
 *     <Routes>
 *       <Route path="/*" element={<Dashboard />}>
 *         <Route path="students" element={<StudentsView />} />
 *       </Route>
 *     </Routes>
 *   </BrowserRouter>
 * )
 */
export default function Dashboard() {
  /**
   * State for sidebar visibility
   * @type {[boolean, function]} sidebarOpen - Controls sidebar visibility
   */
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header />
      <div className={`layout ${!sidebarOpen ? "collapsed" : ""}`}>
        {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
        <div className="content">
          {!sidebarOpen && (
            <button
              className="btn ghost"
              style={{ marginBottom: 12 }}
              onClick={() => setSidebarOpen(true)}
            >
              ☰ Open Sidebar
            </button>
          )}
          {/* React Router will render the active view here */}
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}