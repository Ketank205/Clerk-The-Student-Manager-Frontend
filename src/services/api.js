/**
 * API service module for student management system
 * Handles all HTTP requests to the Express + MongoDB + Cloudinary backend
 * @module services/api
 */

// Base URL from environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch all courses from the database
 * @async
 * @returns {Promise<Array>} Array of course objects
 * @throws {Error} If the API request fails
 */
export async function getCourses() {
  const res = await fetch(`${BASE_URL}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

/**
 * Create a new course
 * @async
 * @param {Object} course - Course data
 * @param {string} course.name - Name of the course
 * @param {string} course.description - Course description
 * @returns {Promise<Object>} Created course object
 * @throws {Error} If the API request fails
 */
export async function addCourse(course) {
  const res = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error("Failed to add course");
  return res.json();
}

/**
 * Fetch all students from the database
 * @async
 * @returns {Promise<Array>} Array of student objects with populated course data
 * @throws {Error} If the API request fails
 */
export async function getStudents() {
  const res = await fetch(`${BASE_URL}/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

/**
 * Create a new student with optional image upload
 * @async
 * @param {FormData} studentData - Form data containing student info and optional image
 * @param {string} studentData.name - Student name
 * @param {string} studentData.email - Student email
 * @param {string} studentData.course - Course ID
 * @param {File} [studentData.image] - Student image file
 * @returns {Promise<Object>} Created student object
 * @throws {Error} If the API request fails
 */
export async function saveStudent(studentData) {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    body: studentData,
  });
  if (!res.ok) throw new Error("Failed to save student");
  return res.json();
}

/**
 * Update an existing student
 * @async
 * @param {string} id - Student ID
 * @param {FormData} studentData - Form data containing updated student info
 * @param {string} studentData.name - Student name
 * @param {string} studentData.email - Student email
 * @param {string} studentData.course - Course ID
 * @param {File} [studentData.image] - New student image file
 * @returns {Promise<Object>} Updated student object
 * @throws {Error} If the API request fails
 */
export async function updateStudent(id, studentData) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    body: studentData,
  });
  if (!res.ok) throw new Error("Failed to update student");
  return res.json();
}

/**
 * Delete a student
 * @async
 * @param {string} id - Student ID to delete
 * @returns {Promise<Object>} Deletion confirmation message
 * @throws {Error} If the API request fails
 */
export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete student");
  return res.json();
}