import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.js';
import Dashboard from './Dashboard.js';

const App = () => {
  const isAuthenticated = document.cookie.includes('user=authenticated');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
