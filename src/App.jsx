/**
 * @module App
 * @description Root component that handles routing and layout structure for the Student Management System
 */

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudentsView from "./views/AddStudentsView";
import DisplayStudentsView from "./views/DisplayStudentsView";
import EditStudentsView from "./views/EditStudentsView";
import CoursesView from "./views/CoursesView";
import "./App.css";

/**
 * App Component
 * Provides the main routing configuration and layout structure
 * 
 * @component
 * @example
 * // Wrap in BrowserRouter when using
 * import { BrowserRouter } from 'react-router-dom';
 * 
 * ReactDOM.render(
 *   <BrowserRouter>
 *     <App />
 *   </BrowserRouter>,
 *   document.getElementById('root')
 * );
 */
export default function App() {
  return (
    <Routes>
      {/* Dashboard layout wrapper */}
      <Route path="/" element={<Dashboard />}>
        {/* Default redirect to students list */}
        <Route index element={<Navigate to="/students" replace />} />
        
        {/* Student management routes */}
        <Route path="students" element={<DisplayStudentsView />} />
        <Route path="students/add" element={<AddStudentsView />} />
        <Route path="students/edit" element={<EditStudentsView />} />
        
        {/* Course management route */}
        <Route path="courses" element={<CoursesView />} />
      </Route>

      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}