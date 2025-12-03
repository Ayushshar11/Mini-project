import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/studentService';

// Define the three possible views/modes
const VIEWS = {
  LIST: 'LIST',
  ADD: 'ADD',
  EDIT: 'EDIT',
  DETAILS: 'DETAILS',
};

function App() {
  const [students, setStudents] = useState([]);
  const [currentView, setCurrentView] = useState(VIEWS.LIST);
  const [selectedStudent, setSelectedStudent] = useState(null); 
  
  // State for the search/filter term. Used to display only the student just added.
  const [searchTerm, setSearchTerm] = useState(''); 

  // --- Filtering Logic ---
  // Calculates the list to display based on the search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // --- Data & CRUD Handlers ---

  /** Fetches all students from the server and updates state. */
  const handleLoadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
    setCurrentView(VIEWS.LIST); 
    return data; 
  };
  
  /** Handles both Add (Create) and Edit (Update) submission. */
  const handleCreateOrUpdateStudent = async (formData) => {
    let studentName = formData.name;
    let success = false;

    if (currentView === VIEWS.ADD) {
      // Create new student
      await createStudent(formData);
      alert('Student added successfully!');
      setSearchTerm(studentName); // Set filter to show only this new student
      success = true;

    } else if (currentView === VIEWS.EDIT && selectedStudent) {
      // Update existing student
      await updateStudent(selectedStudent.id, formData);
      alert('Student updated successfully!');
      setSearchTerm(studentName); // Keep filter on the updated student
      success = true;
    }
    
    // Auto-reload the student list from the server after successful change
    if (success) {
        await handleLoadStudents(); 
    }

    // Reset view and state
    setCurrentView(VIEWS.LIST);
    setSelectedStudent(null);
  };

  /** Handles Deletion of a student. */
  const handleDeleteStudent = async (id) => {
    // Using window.confirm as a placeholder for a custom modal UI
    const shouldDelete = window.confirm('Are you sure you want to delete this student?');

    if (shouldDelete) {
      // Calls the delete function in studentService.js
      const success = await deleteStudent(id); 
      
      if (success) {
        alert('Student deleted successfully!');
        setSearchTerm(''); // Clear filter to show full list after deletion
        await handleLoadStudents(); // Auto-reload the list
      } 
    }
  };

  // --- View Switching Functions ---

  const handleAddClick = () => {
    setSearchTerm(''); // Clear filter when entering the Add form
    setSelectedStudent(null);
    setCurrentView(VIEWS.ADD);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setCurrentView(VIEWS.EDIT);
  };

  const handleViewDetailsClick = (student) => {
    setSelectedStudent(student);
    setCurrentView(VIEWS.DETAILS);
  };

  const handleCancelForm = () => {
    setSelectedStudent(null);
    setCurrentView(VIEWS.LIST);
  };
  
  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
  }

  // --- Render Current View ---
  const renderView = () => {
    switch (currentView) {
      case VIEWS.ADD:
      case VIEWS.EDIT:
        return (
          <StudentForm
            mode={currentView === VIEWS.ADD ? "add" : "edit"}
            initialData={selectedStudent}
            onSubmit={handleCreateOrUpdateStudent}
            onCancel={handleCancelForm}
          />
        );
      case VIEWS.DETAILS:
        return (
          <StudentDetails
            student={selectedStudent}
            onGoBack={handleCancelForm} 
          />
        );
      case VIEWS.LIST:
      default:
        return (
          <StudentList
            // PASSES THE FILTERED LIST AND SEARCH CONTROLS
            students={filteredStudents} 
            searchTerm={searchTerm} 
            onSearchChange={handleSearchChange} 
            
            onLoadStudents={handleLoadStudents}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteStudent}
            onView={handleViewDetailsClick}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <h1>Student Result Management (Simple CRUD)</h1>
      {renderView()}
    </div>
  );
}

export default App;