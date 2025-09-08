/**
 * @module views/StudentForm
 * @description Reusable form component for creating and editing student records
 */

import React, { useState, useEffect } from "react";
import { useStudents } from "../context/StudentContext";

/**
 * StudentForm Component
 * Renders a form for student data input with validation and image upload
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.initial] - Initial student data for editing
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Function} [props.onCancel] - Optional cancel handler
 * @example
 * return (
 *   <StudentForm 
 *     initial={studentData}
 *     onSubmit={handleSubmit}
 *     onCancel={handleCancel}
 *   />
 * )
 */
export default function StudentForm({ initial = null, onSubmit, onCancel }) {
  const { courses, coursesLoading } = useStudents();
  
  /**
   * Form state
   * @type {[string, function]} name - Student name
   * @type {[string, function]} email - Student email
   * @type {[string, function]} courseId - Selected course ID
   * @type {[string, function]} imagePreview - Image preview URL
   * @type {[File|null, function]} file - Uploaded image file
   * @type {[Object, function]} errors - Validation errors
   * @type {[boolean, function]} submitting - Form submission state
   */
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [courseId, setCourseId] = useState(initial?.course?._id ?? "");
  const [imagePreview, setImagePreview] = useState(initial?.image ?? "");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /**
   * Reset form when initial data changes
   */
  useEffect(() => {
    setName(initial?.name ?? "");
    setEmail(initial?.email ?? "");
    setCourseId(initial?.course?._id ?? "");
    setImagePreview(initial?.image ?? "");
    setFile(null);
  }, [initial]);

  /**
   * Validate form inputs
   * @returns {boolean} True if validation passes
   */
  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRe.test(email)) e.email = "Invalid email format";
    if (!courseId) e.course = "Choose a course";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /**
   * Handle image file selection
   * @param {Event} ev - File input change event
   */
  function handleFile(ev) {
    const fileObj = ev.target.files?.[0];
    if (!fileObj) return;
    setFile(fileObj);

    // Generate preview URL
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(fileObj);
  }

  /**
   * Handle form submission
   * @async
   * @param {Event} ev - Form submit event
   * @throws {Error} When validation fails or submission errors
   */
  async function submit(ev) {
    ev?.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      if (initial?._id) formData.append("id", initial._id);
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("course", courseId);
      if (file) formData.append("image", file);

      await onSubmit(initial?._id, formData);

      // Reset form if adding new student
      if (!initial) {
        setName("");
        setEmail("");
        setCourseId("");
        setImagePreview("");
        setFile(null);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="row" style={{ alignItems: "center", gap: 18 }}>
        <div>
          <label>Profile Image</label>
          <div style={{ marginTop: 6 }}>
            <img
              src={
                imagePreview ||
                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>"
              }
              alt="preview"
              className="profile-preview"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ marginTop: 8 }}
            className="input"
          />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 8 }}>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`input ${errors.name ? "error" : ""}`}
              placeholder="Enter full name."
            />
            {errors.name && (
              <div style={{ color: "red", fontSize: 13 }}>{errors.name}</div>
            )}
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="email"
              placeholder="Enter unique email, if fails."
            />
            {errors.email && (
              <div className="text-red-500 text-[13px]"
              >{errors.email}</div>
            )}
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Course</label>
            <select
              className="select"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">-- Select a course --</option>
              {coursesLoading && <option>Loading courses…</option>}
              {courses?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.course && (
              <div style={{ color: "red", fontSize: 13 }}>{errors.course}</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button className="btn" type="submit" disabled={submitting}>
          {initial
            ? submitting
              ? "Saving…"
              : "Save"
            : submitting
              ? "Adding…"
              : "Add"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
