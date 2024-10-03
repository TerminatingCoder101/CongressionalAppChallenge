import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './pages/Home';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId="<YOUR_GOOGLE_CLIENT_ID>">
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        {/* Add more routes here for other pages */}
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;