import './styles/tailwind.css'; // Import your Tailwind CSS file
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Router basename="/piql-frontend">
      <h1>piql</h1>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
