import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/students", label: "Display Students", exact: true },
  { to: "/students/add", label: "Add Student" },
  { to: "/students/edit", label: "Edit Student Details" },
  { to: "/courses", label: "Available Courses" },
];

export default function Sidebar({ onClose }) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.exact || false}   // 👈 important: only exact match
          className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`} 
        >
          {l.label}
        </NavLink>
      ))}
      <div style={{ marginTop: 8 }}>
        <button className="nav-btn" onClick={onClose}>
          Close Side
        </button>
      </div>
    </aside>
  );
}
