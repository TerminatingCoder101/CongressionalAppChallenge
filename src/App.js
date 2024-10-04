import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Protected from './components/Home/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<Protected> <Home/> </Protected>} />
        {/* Add more routes here for other pages */}
      </Routes>
    </Router>
    </AuthContextProvider>
  );
}
export default App;