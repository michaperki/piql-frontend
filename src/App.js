import './styles/tailwind.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h2>piql</h2>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
