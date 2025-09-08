/**
 * @module context/StudentContext
 * @description Context provider for managing student and course data globally
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as api from "../services/api";

/**
 * Context for student management
 * @type {React.Context}
 */
const StudentContext = createContext();

/**
 * Provider component for student management functionality
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap
 * 
 * @example
 * return (
 *   <StudentProvider>
 *     <App />
 *   </StudentProvider>
 * )
 */
export function StudentProvider({ children }) {
  // State management
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState(null);

  /**
   * Load courses from API
   * @effect
   */
  useEffect(() => {
    let mounted = true;
    async function load() {
      setCoursesLoading(true);
      try {
        const cs = await api.getCourses();
        if (mounted) setCourses(cs);
      } catch (err) {
        if (mounted) setCoursesError(err);
      } finally {
        if (mounted) setCoursesLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  /**
   * Load students from API
   * @effect
   */
  useEffect(() => {
    let mounted = true;
    async function loadStudents() {
      try {
        const list = await api.getStudents();
        if (mounted) setStudents(list);
      } catch (err) {
        console.error("Failed to load students", err);
      }
    }
    loadStudents();
    return () => (mounted = false);
  }, []);

  /**
   * Add a new student
   * @function addStudent
   * @param {FormData} formData - Student form data including image
   * @returns {Promise<Object>} Created student object
   */
  const addStudent = useCallback(async (formData) => {
    const s = await api.saveStudent(formData);
    setStudents((cur) => [...cur, s]);
    return s;
  }, []);

  /**
   * Edit existing student
   * @function editStudent
   * @param {string} id - Student ID
   * @param {FormData} formData - Updated student form data
   * @returns {Promise<Object>} Updated student object
   */
  const editStudent = useCallback(async (id, formData) => {
    const s = await api.updateStudent(id, formData);
    setStudents((cur) => cur.map((c) => (c._id === s._id ? s : c)));
    return s;
  }, []);

  /**
   * Delete student
   * @function removeStudent
   * @param {string} id - Student ID to delete
   * @returns {Promise<boolean>} Success indicator
   */
  const removeStudent = useCallback(async (id) => {
    await api.deleteStudent(id);
    setStudents((cur) => cur.filter((c) => c._id !== id));
    return true;
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
        courses,
        addStudent,
        editStudent,
        removeStudent,
        coursesLoading,
        coursesError,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

/**
 * Hook to access student context
 * @returns {Object} Student context value
 * @throws {Error} When used outside of StudentProvider
 * 
 * @example
 * function StudentList() {
 *   const { students, removeStudent } = useStudents();
 *   return (
 *     <ul>
 *       {students.map(s => (
 *         <li key={s._id}>
 *           {s.name}
 *           <button onClick={() => removeStudent(s._id)}>Delete</button>
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 */
export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
}