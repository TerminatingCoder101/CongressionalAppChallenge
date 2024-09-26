import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './pages/Hero';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* Add more routes here for other pages */}
      </Routes>
    </Router>
  );
}

export default App;