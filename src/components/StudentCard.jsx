import React from "react";

export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="card" role="article">
      <img
        src={
          student.image ||
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>"
        }
        alt={`${student.name}'s profile`}
        className="profile-preview"
      />
      <div style={{ fontWeight: 700 }}>{student.name}</div>
      <div className="meta">{student.email}</div>
      <div className="meta">{student.course?.name ?? "—"}</div>
      <div className="actions">
        <button className="btn" onClick={() => onEdit(student)}>
          Edit
        </button>
        <button
          className="btn ghost"
          onClick={() => onDelete(student._id)} // ✅ use _id
        >
          Delete
        </button>
      </div>
    </div>
  );
}
