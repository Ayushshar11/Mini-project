// src/components/StudentList.jsx
import React from 'react';

const StudentList = ({ students, searchTerm, onSearchChange, onLoadStudents, onAdd, onEdit, onDelete, onView }) => {
  return (
    <div className="card">
      <h2>Student List</h2>
      
      {/* Search Input for filtering */}
      <div className="search-bar" style={{ marginBottom: '15px' }}>
          <input
              type="text"
              placeholder="Filter by Name..."
              value={searchTerm}
              onChange={onSearchChange}
              style={{ padding: '8px', width: '300px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          {/* Button to clear the filter if a search term is present */}
          {searchTerm && (
              <button onClick={() => onSearchChange({ target: { value: '' } })}>
                  Show All
              </button>
          )}
      </div>

      <div className="actions" style={{ marginBottom: '20px' }}>
        <button onClick={onLoadStudents}>Load All Students</button>
        <button onClick={onAdd}>Add New Student</button>
      </div>

      {students.length === 0 ? (
        <p>No students found {searchTerm ? `matching "${searchTerm}".` : 'in the list. Click "Load All Students".'}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Section</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.section}</td>
                <td>{student.marks}</td>
                <td>{student.grade}</td>
                <td>
                  <button onClick={() => onView(student)}>View Details</button>
                  <button onClick={() => onEdit(student)}>Edit</button>
                  <button onClick={() => onDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;