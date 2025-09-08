/**
 * @module views/AddStudentsView
 * @description Component for adding new students using a form interface
 */

import React from "react";
import StudentForm from "../views/StudentForm";
import { useStudents } from "../context/StudentContext";
import { useToast } from "../context/ToastContext";

/**
 * AddStudentsView Component
 * Renders a form for adding new students and handles form submission
 * 
 * @component
 * @example
 * return (
 *   <AddStudentsView />
 * )
 */
export default function AddStudentsView() {
  const { addStudent } = useStudents();
  const { showToast } = useToast();

  /**
   * Handles the form submission for adding a new student
   * @async
   * @param {string} _id - Unused ID parameter
   * @param {FormData} formData - Form data containing student information and image
   * @throws {Error} When student creation fails
   */
  async function handleAdd(_id, formData) {
    try {
      await addStudent(formData); // formData is already prepared in StudentForm
      showToast("✅ Student added successfully!", "success");
    } catch (err) {
      showToast(err.message || "❌ Failed to add student", "error");
    }
  }

  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>Add Student</h2>
      <StudentForm onSubmit={handleAdd} />
    </div>
  );
}