/**
 * @module views/CoursesView
 * @description Component for displaying and searching available courses
 */

import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import Loader from "../components/Loader";

/**
 * CoursesView Component
 * Displays a list of available courses with search functionality
 * 
 * @component
 * @example
 * return (
 *   <CoursesView />
 * )
 */
export default function CoursesView() {
  const { courses, coursesLoading, coursesError } = useStudents();
  
  /**
   * State for search query
   * @type {[string, function]} query - Search input value
   */
  const [query, setQuery] = useState("");

  // Show loader while fetching courses
  if (coursesLoading) return <Loader label="Loading courses..." />;

  // Display error state if courses fetch failed
  if (coursesError) {
    return (
      <div style={{ color: "red" }}>
        <p>⚠️ Failed to load courses: {coursesError.message}</p>
        <button
          className="btn"
          onClick={() => window.location.reload()}
          style={{ marginTop: 8 }}
        >
          Retry
        </button>
      </div>
    );
  }

  /**
   * Filter courses based on search query
   * @type {Array} filtered - Filtered courses array
   */
  const filtered = courses.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>Available Courses</h2>

      {/* Search input */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          className="input"
          placeholder="Search course"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Course grid with empty state */}
      {filtered.length === 0 ? (
        <div>No courses found.</div>
      ) : (
        <div className="grid">
          {filtered.map((c) => (
            <div key={c.id} className="card">
              <div style={{ fontWeight: 700 }}>{c.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}