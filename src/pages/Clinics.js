import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Clinics = () => {
  const [zipCode, setZipCode] = useState('');
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to search clinics by ZIP code (existing)
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setClinics([]);

    try {
      // Step 1: Get coordinates from ZIP code using Nominatim API
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=us&format=json`;
      const geocodeResponse = await axios.get(geocodeUrl);

      if (geocodeResponse.data.length === 0) {
        setError('No location found for the provided ZIP code.');
        setLoading(false);
        return;
      }

      const { lat, lon } = geocodeResponse.data[0];
      console.log(`Coordinates for ZIP code ${zipCode}: ${lat}, ${lon}`);

      // Step 2: Use backend to proxy Google Places API request
      const placesUrl = `http://localhost:8000/api/clinics?lat=${lat}&lon=${lon}`;
      const placesResponse = await axios.get(placesUrl);

      if (placesResponse.data.results.length === 0) {
        setError('No clinics found near the provided location.');
        setLoading(false);
        return;
      }

      const clinicDetails = await Promise.all(
        placesResponse.data.results.map(async (clinic) => {
          const placeId = clinic.place_id;

          // Step 3: Fetch additional details from backend
          const detailsUrl = `http://localhost:8000/api/clinic-details?placeId=${placeId}`;
          const detailsResponse = await axios.get(detailsUrl);

          const { formatted_address, formatted_phone_number } = detailsResponse.data.result;

          return {
            name: clinic.name,
            address: formatted_address || 'Address not available',
            phoneNumber: formatted_phone_number || 'Phone number not available',
            mapUrl: `https://www.google.com/maps/embed/v1/place?key=AIzaSyBUKISFssUCSBAeskeX5HI24YE5FcCWeAY&q=place_id:${placeId}`
          };
        })
      );

      setClinics(clinicDetails);

    } catch (error) {
      console.error('Error fetching clinics:', error);
      setError('An error occurred while searching for clinics.');
    } finally {
      setLoading(false);
    }
  };

  // Function to search clinics near the user's current location (new)
  const handleSearchNearMe = async () => {
    setLoading(true);
    setError(null);
    setClinics([]);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Your location: ${latitude}, ${longitude}`);

        try {
          const placesUrl = `http://localhost:8000/api/clinics?lat=${latitude}&lon=${longitude}`;
          const placesResponse = await axios.get(placesUrl);

          if (placesResponse.data.results.length === 0) {
            setError('No clinics found near your location.');
            setLoading(false);
            return;
          }

          const clinicDetails = await Promise.all(
            placesResponse.data.results.map(async (clinic) => {
              const placeId = clinic.place_id;

              // Fetch additional details from backend
              const detailsUrl = `http://localhost:8000/api/clinic-details?placeId=${placeId}`;
              const detailsResponse = await axios.get(detailsUrl);

              const { formatted_address, formatted_phone_number } = detailsResponse.data.result;

              return {
                name: clinic.name,
                address: formatted_address || 'Address not available',
                phoneNumber: formatted_phone_number || 'Phone number not available',
                mapUrl: `https://www.google.com/maps/embed/v1/place?key=AIzaSyBUKISFssUCSBAeskeX5HI24YE5FcCWeAY&q=place_id:${placeId}`
              };
            })
          );

          setClinics(clinicDetails);

        } catch (error) {
          console.error('Error fetching clinics near me:', error);
          setError('An error occurred while searching for clinics near you.');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Error getting your location:', error);
        setError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
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

    <main className="w-4/5 p-10 overflow-y-auto h-screen">
      <header className="flex items-center mb-8 justify-between">
        <h1 className="text-5xl font-extrabold text-gray-800">Search for Nearby Clinics!</h1>

        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter ZIP Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
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
            className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-300"
          >
            <span>Search by ZIP Code</span>
          </button>

          <button
            onClick={handleSearchNearMe}
            disabled={loading}
            className="bg-green-600 text-white py-2 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Search Near Me</span>
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-8 shadow-lg">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
        </div>
      )}

      {!loading && clinics.length > 0 && (
        <div className="space-y-8">
          {clinics.map((clinic, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="flex items-start space-x-8">
                {/* Clinic Info */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{clinic.name}</h2>
                  <p className="text-gray-700 mb-2">{clinic.address}</p>
                  <p className="text-gray-700 mb-4">Phone: {clinic.phoneNumber}</p>
                </div>

                {/* Clinic Map */}
                <iframe
                  src={clinic.mapUrl}
                  width="300"
                  height="200"
                  className="rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  </div>
</div>



    );
};

export default Clinics;
