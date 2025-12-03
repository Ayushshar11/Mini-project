// src/components/StudentForm.jsx
import React, { useState } from 'react';

const StudentForm = ({ mode, initialData, onSubmit, onCancel }) => {
  const isEditing = mode === 'edit';
  const initialState = initialData || {
    name: '',
    section: '',
    marks: '',
    grade: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation (optional)
    if (!formData.name || !formData.section || !formData.marks || !formData.grade) {
        alert('Please fill out all fields.');
        return;
    }

    // Call the submit handler passed from App.jsx
    onSubmit(formData);
  };

  return (
    <div className="card">
      <h2>{isEditing ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="marks">Marks:</label>
          <input
            type="number"
            id="marks"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{isEditing ? 'Save Changes' : 'Add Student'}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default StudentForm;