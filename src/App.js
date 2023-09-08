import './styles/tailwind.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Games from './pages/Games';
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'


function App() {
  const navigate = useNavigate();

  return (
    <>
      <h2>piql</h2>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/games" element={<Games />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
