/**
 * @module views/EditStudentsView
 * @description Component for editing and deleting student records with confirmation dialogs
 */

import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import StudentForm from "./StudentForm";
import { useToast } from "../context/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";

/**
 * EditStudentsView Component
 * Renders a table of students with edit and delete functionality
 * 
 * @component
 * @example
 * return (
 *   <EditStudentsView />
 * )
 */
export default function EditStudentsView() {
  const { students, removeStudent, editStudent } = useStudents();
  
  /**
   * State for editing and delete confirmation
   * @type {[Object|null, function]} editing - Currently editing student
   * @type {[Object|null, function]} confirmData - Student data for delete confirmation
   */
  const [editing, setEditing] = useState(null);
  const [confirmData, setConfirmData] = useState(null);
  const { showToast } = useToast();

  /**
   * Handles saving edited student data
   * @async
   * @param {string} id - Student ID
   * @param {FormData} formData - Updated student form data
   * @throws {Error} When student update fails
   */
  async function handleSave(id, formData) {
    try {
      await editStudent(id, formData);
      showToast("✅ Student updated successfully!", "success");
      setEditing(null);
    } catch (err) {
      showToast(err.message || "❌ Failed to update student", "error");
    }
  }

  /**
   * Initiates delete confirmation for a student
   * @param {Object} student - Student to be deleted
   */
  const handleDeleteRequest = (student) => {
    setConfirmData(student);
  };

  /**
   * Handles confirmed student deletion
   * @async
   * @throws {Error} When student deletion fails
   */
  async function handleDeleteConfirm() {
    try {
      await removeStudent(confirmData._id);
      showToast("🗑️ Student deleted successfully!", "success");
    } catch (err) {
      showToast(err.message || "❌ Failed to delete student", "error");
    } finally {
      setConfirmData(null);
    }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Edit Students</h2>

      {/* Edit form section */}
      {editing && (
        <div style={{ marginBottom: 12 }}>
          <h3>Editing: {editing.name}</h3>
          <StudentForm
            initial={editing}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {/* Students table */}
      <table className="table">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>
                <img
                  src={s.image}
                  alt=""
                  style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}
                />
              </td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course?.name}</td>
              <td>
                <button className="btn" onClick={() => setEditing(s)}>Edit</button>
                <button
                  className="btn ghost"
                  onClick={() => handleDeleteRequest(s)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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