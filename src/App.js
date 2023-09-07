import './styles/tailwind.css'; // Import your Tailwind CSS file
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <h1>piql</h1>
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
