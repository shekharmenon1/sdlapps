import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  // Initialize form data state here
  const [formData, setFormData] = useState({ Ename: '', Vname: '', Edate: '' });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        
        {/* Passing formData and setFormData to TaskForm and TaskList */}
        <Route
          path="/task-form"
          element={<TaskForm formData={formData} setFormData={setFormData} />}
        />
        <Route
          path="/task-list"
          element={<TaskList setFormData={setFormData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
