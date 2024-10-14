import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Clinics = () => {
  const [zipCode, setZipCode] = useState('');
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with API Key, need to get it to work properly also need google api key
    const searchRadius = 5000; // Radius in meters (5km)
    
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`;
      const geocodeResponse = await axios.get(geocodeUrl);
      const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=hospital|doctor&key=${apiKey}`;
      const placesResponse = await axios.get(placesUrl);

      setClinics(placesResponse.data.results);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    } finally {
      setLoading(false);
    }
  };

  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      console.log('User has been logged out!');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-blue-50">
            <div className="flex flex-grow">
                <aside className="w-1/5 bg-blue-950 text-white shadow-lg h-screen flex flex-col rounded-r-lg overflow-y-auto">
                    <div className="p-6 flex-grow">
                        <h2 className="text-4xl font-bold mb-8">SmartSympto</h2>
                        <nav className="space-y-4">
                            <Link to="/dashboard" className="py-3 px-5 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-4 transition-all duration-300">
                                <FontAwesomeIcon icon={faTachometerAlt} className="w-6 h-6" />
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/clinics" className="py-3 px-5 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-4 transition-all duration-300">
                                <FontAwesomeIcon icon={faUserMd} className="w-6 h-6" />
                                <span>Clinics</span>
                            </Link>
                            <Link to="/appointments" className="py-3 px-5 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-4 transition-all duration-300">
                                <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
                                <span>Appointments</span>
                            </Link>
                            <Link to="/messages" className="py-3 px-5 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-4 transition-all duration-300">
                                <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
                                <span>Messages</span>
                            </Link>
                            <Link to="/medications" className="py-3 px-5 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-4 transition-all duration-300">
                                <FontAwesomeIcon icon={faPills} className="w-6 h-6" />
                                <span>Diagnosis & Aid</span>
                            </Link>
                            <Link to="/documents" className="py-3 px-5 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-4 transition-all duration-300">
                                <FontAwesomeIcon icon={faFileAlt} className="w-6 h-6" />
                                <span>Documents</span>
                            </Link>
                            <Link to="/settings" className="py-3 px-5 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center space-x-4 transition-all duration-300">
                                <FontAwesomeIcon icon={faCog} className="w-6 h-6" />
                                <span>Settings</span>
                            </Link>
                        </nav>
                    </div>

          {/* Log Out Button at the bottom */}
          {user?.displayName && (
            <button
              onClick={handleLogout}
              className="w-auto px-6 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-3 rounded shadow-lg flex items-center justify-center space-x-2 mb-6 mx-4">
              <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6" />
              <span>Log Out</span>
            </button>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-4/5 p-10 overflow-y-auto h-screen">
          <header className="flex items-center mb-8 justify-between">
            <h1 className="text-5xl font-extrabold text-gray-800">Search for Nearby Clinics!</h1>
            
            {/* Move search box to the top-right */}
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter ZIP Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-800 transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414 0L9 10.586V7a1 1 0 00-2 0v6a1 1 0 001 1h6a1 1 0 100-2H10.414l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span>{loading ? 'Searching...' : 'Search Clinics'}</span>
              </button>
            </div>
          </header>

          {/* Clinics results */}
          <div className="mt-6">
            {clinics.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Results:</h3>
                <ul className="space-y-4">
                  {clinics.map((clinic) => (
                    <li key={clinic.place_id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                      <h2 className="text-lg font-bold text-gray-900">{clinic.name}</h2>
                      <p className="text-gray-600">{clinic.vicinity}</p>
                      <p className="text-gray-600">Rating: {clinic.rating}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Clinics;
