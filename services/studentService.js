// src/services/studentService.js

const API_URL = 'http://localhost:5000/students';

/** Handles fetching all students */
export const getStudents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch students.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    // Use a custom modal or message box in a real app, not alert()
    alert('Error fetching student data.'); 
    return [];
  }
};

/** Handles creating a new student (POST) */
export const createStudent = async (studentData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) {
      throw new Error('Failed to create student.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating student:', error);
    alert('Error creating student data.');
  }
};

/** Handles updating an existing student (PUT) */
export const updateStudent = async (id, studentData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) {
      throw new Error('Failed to update student.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating student:', error);
    alert('Error updating student data.');
  }
};

/** Handles deleting a student (DELETE) */
export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    // JSON Server returns status 204 (No Content), so we don't check for response.ok here.
    if (response.status !== 204 && response.status !== 200) { 
         throw new Error(`Failed to delete student. Status: ${response.status}`);
    }
    return true; // Return true on success
  } catch (error) {
    console.error('Error deleting student:', error);
    alert('Error deleting student data.'); // This is the alert you were seeing
    return false;
  }
};