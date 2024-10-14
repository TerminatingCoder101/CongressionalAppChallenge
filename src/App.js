import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Protected from './components/Home/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Hero from './pages/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Clinics from './pages/Clinics';
import Appointments from './pages/Appointments';
import Messages from './pages/Messages';
import Diagnosis from './pages/Diagnosis & Aid';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/dashboard" element={<Protected> <Dashboard/> </Protected>} />
        <Route path="/clinics" element={<Protected> <Clinics/> </Protected>} />
        <Route path="/appointments" element={<Protected> <Appointments/> </Protected>} />
        <Route path="/messages" element={<Protected> <Messages/> </Protected>} />
        <Route path="/diagnosis" element={<Protected> <Diagnosis/> </Protected>} />
        <Route path="/documents" element={<Protected> <Documents/> </Protected>} />
        <Route path="/settings" element={<Protected> <Settings/> </Protected>} />
        {/* Add more routes here for other pages */}
      </Routes>
    </Router>
    </AuthContextProvider>
  );
}
export default App;