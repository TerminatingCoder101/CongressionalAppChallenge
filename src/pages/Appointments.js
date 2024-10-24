import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, date: 'April 20, 2024', time: '10:00 AM', doctor: 'Dr. Smith', location: 'Orange, California' },
    { id: 2, date: 'May 5, 2024', time: '1:00 PM', doctor: 'Dr. Johnson', location: 'Frisco, Texas' },
  ]);

  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', doctor: '', location: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { date, time, doctor, location } = newAppointment;
    return date && time && doctor && location;
  };

  const addAppointment = () => {
    if (isEditing) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editingId ? { ...appointment, ...newAppointment } : appointment
      );
      setAppointments(updatedAppointments);
      setIsEditing(false);
      setEditingId(null);
    } else {
      setAppointments([
        ...appointments,
        { id: appointments.length + 1, ...newAppointment },
      ]);
    }
    setNewAppointment({ date: '', time: '', doctor: '', location: '' });
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const startEditing = (appointment) => {
    setNewAppointment({ date: appointment.date, time: appointment.time, doctor: appointment.doctor, location: appointment.location });
    setIsEditing(true);
    setEditingId(appointment.id);
  };

  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      console.log('User has been logged out!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-indigo-50">
  <div className="flex flex-grow">
    <aside className="w-1/5 bg-blue-950 text-white shadow-lg h-screen flex flex-col rounded-r-lg overflow-y-auto">
      <div className="p-6 flex-grow">
        <h2 className="text-4xl font-extrabold mb-8">SmartSympto</h2>
        <nav className="space-y-4">
          <Link to="/dashboard" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
            <FontAwesomeIcon icon={faTachometerAlt} className="w-6 h-6" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/clinics" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
            <FontAwesomeIcon icon={faUserMd} className="w-6 h-6" />
            <span className="font-medium">Clinics</span>
          </Link>
          <Link to="/appointments" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
            <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
            <span className="font-medium">Appointments</span>
          </Link>
          <Link to="/messages" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
            <span className="font-medium">Messages</span>
          </Link>
          <Link to="/medications" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
            <FontAwesomeIcon icon={faPills} className="w-6 h-6" />
            <span className="font-medium">Diagnosis & Aid</span>
          </Link>
          <Link to="/documents" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
            <FontAwesomeIcon icon={faFileAlt} className="w-6 h-6" />
            <span className="font-medium">Documents</span>
          </Link>
          <Link to="/settings" className="py-3 px-5 bg-blue-800 hover:bg-blue-700 rounded-lg flex items-center space-x-4 transition-all duration-300">
            <FontAwesomeIcon icon={faCog} className="w-6 h-6" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>
      </div>

      {user?.displayName && (
        <button
          onClick={handleLogout}
          className="w-auto px-6 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-3 rounded-lg flex items-center justify-center space-x-2 mb-6 mx-4">
          <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6" />
          <span>Log Out</span>
        </button>
      )}
    </aside>

        <div className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">My Appointments</h1>

            {/* Appointments List */}
            <div className="grid grid-cols-1 gap-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center shadow-md">
                  <div>
                    <p className="text-lg font-semibold">{appointment.date} at {appointment.time}</p>
                    <p>{appointment.doctor} - {appointment.location}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => startEditing(appointment)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAppointment(appointment.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add/Edit New Appointment */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Appointment' : 'Add New Appointment'}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="date"
                  placeholder="Date"
                  value={newAppointment.date}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="time"
                  placeholder="Time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="doctor"
                  placeholder="Doctor"
                  value={newAppointment.doctor}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={newAppointment.location}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Add/Update Button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={addAppointment}
                  disabled={!isFormValid()}
                  className={`px-6 py-2 rounded-lg ${isFormValid() ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300'} text-white transition-all duration-300`}
                >
                  {isEditing ? 'Update Appointment' : 'Add Appointment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
