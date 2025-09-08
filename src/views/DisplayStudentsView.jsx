/**
 * @module views/DisplayStudentsView
 * @description Component for displaying and managing student list with search and delete functionality
 */

import React, { useMemo, useState } from "react";
import { useStudents } from "../context/StudentContext";
import StudentCard from "../components/StudentCard";
import Loader from "../components/Loader";
import { useToast } from "../context/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";

/**
 * DisplayStudentsView Component
 * Renders a searchable grid of student cards with delete functionality
 * 
 * @component
 * @example
 * return (
 *   <DisplayStudentsView />
 * )
 */
export default function DisplayStudentsView() {
  const { students, removeStudent } = useStudents();
  
  /**
   * State for search query and delete confirmation
   * @type {[string, function]} query - Search input value
   * @type {[Object|null, function]} confirmData - Student data for delete confirmation
   */
  const [query, setQuery] = useState("");
  const { showToast } = useToast();
  const [confirmData, setConfirmData] = useState(null);

  /**
   * Filtered students based on search query
   * Searches through name and email
   * @type {Array} filtered - Filtered students array
   */
  const filtered = useMemo(() => {
    return students.filter((s) =>
      `${s.name} ${s.email}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [students, query]);

  /**
   * Initiates delete confirmation for a student
   * @param {Object} student - Student object to be deleted
   */
  const handleDeleteRequest = (student) => {
    setConfirmData(student);
  };

  /**
   * Handles confirmed student deletion
   * @async
   * @throws {Error} When student deletion fails
   */
  const handleDeleteConfirm = async () => {
    try {
      await removeStudent(confirmData._id);
      showToast("🗑️ Student deleted successfully!", "success");
    } catch (err) {
      showToast(err.message || "❌ Failed to delete student", "error");
    } finally {
      setConfirmData(null);
    }
  };

  // Show loader while fetching students
  if (!students) return <Loader />;

  return (
    <div>
      {/* Search input */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          className="input"
          placeholder="Search student by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Student grid with empty state */}
      {filtered.length === 0 ? (
        <div>No students found.</div>
      ) : (
        <div className="grid" style={{ marginTop: 10 }}>
          {filtered.map((s) => (
            <StudentCard
              key={s._id}
              student={s}
              onEdit={() =>
                showToast("ℹ️ Switch to Edit view to modify student", "info")
              }
              onDelete={() => handleDeleteRequest(s)}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={!!confirmData}
        title="Delete Student"
        message={`Are you sure you want to delete ${confirmData?.name}?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmData(null)}
      />
    </div>
  );
}