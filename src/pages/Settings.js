import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const { user, logOut, updateUserProfile } = UserAuth();
    const [name, setName] = useState(user?.displayName || ''); 
    const [email, setEmail] = useState(user?.email || ''); 

    useEffect(() => {
        setName(user?.displayName || '');
        setEmail(user?.email || '');
    }, [user]);

    //make this function start working, not working right now because of updateUserProfile function
    const handleUpdate = () => {
        if (name && email) {
            updateUserProfile({ displayName: name, email });
            alert('Profile updated!');
        } else {
            alert('Please fill out both name and email.');
        }
    };

    //make this function work by deleting the user's account from the database and sending to the hero page
    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
        if (confirmDelete) {
            alert('Account deleted!');
        }
    };

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

            {/* Main Content (Center the settings box) */}
            <div className="flex-grow flex justify-center items-center">
                <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Settings</h2>

                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-4 w-full rounded-full shadow-sm border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-4 w-full rounded-full shadow-sm border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="flex justify-between space-x-4">
                        <button
                            onClick={handleUpdate}
                            className="w-1/2 py-3 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
                            Save Changes
                        </button>

                        <button
                            onClick={handleDeleteAccount}
                            className="w-1/2 py-3 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 transition-all duration-300">
                            Delete My Account
                        </button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-8 w-full py-3 text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 transition-all duration-300">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Settings;
