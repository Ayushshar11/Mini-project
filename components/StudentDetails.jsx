// src/components/StudentDetails.jsx
import React from 'react';

const StudentDetails = ({ student, onGoBack }) => {
  if (!student) {
    return (
      <div className="card">
        <h3>No Student Selected</h3>
        <button onClick={onGoBack}>Go Back to List</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Student Details: {student.name}</h2>
      <table>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{student.name}</td>
          </tr>
          <tr>
            <th>Section:</th>
            <td>{student.section}</td>
          </tr>
          <tr>
            <th>Marks:</th>
            <td>{student.marks}</td>
          </tr>
          <tr>
            <th>Grade:</th>
            <td>{student.grade}</td>
          </tr>
          <tr>
            <th>ID:</th>
            <td>{student.id}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={onGoBack}>Go Back to List</button>
    </div>
  );
};

export default StudentDetails;