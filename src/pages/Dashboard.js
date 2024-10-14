import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Home/Footer';
import { UserAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
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
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-5xl font-extrabold text-gray-800">Welcome, {user?.displayName}!</h1>
                        <div className="bg-white p-4 rounded-full shadow-md flex items-center">
                            <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
                        </div>
                    </header>

                    {/* Dashboard Stats */}
                    <section className="grid grid-cols-4 gap-8 mb-10">
                        {/* Stats Cards */}
                        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center">
                            <h2 className="text-4xl font-bold text-blue-600 mb-2">215</h2>
                            <p className="text-gray-700">New Diagnosis</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center">
                            <h2 className="text-4xl font-bold text-blue-600 mb-2">232</h2>
                            <p className="text-gray-700">New Patients</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center">
                            <h2 className="text-4xl font-bold text-blue-600 mb-2">93</h2>
                            <p className="text-gray-700">Mental Health Score</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center">
                            <h2 className="text-4xl font-bold text-blue-600 mb-2">Healthy</h2>
                            <p className="text-gray-700">Condition</p>
                        </div>
                    </section>

                    {/* Chart and Best Doctor Section */}
                    <section className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            {/* Chart Placeholder */}
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Patient Status</h3>
                            <div className="h-56 bg-gray-200 rounded-lg flex justify-center items-center">
                                <p className="text-gray-500">Chart goes here</p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Clinic of the Week</h3>
                            <div className="text-center">
                                <img
                                    src="https://via.placeholder.com/120"
                                    alt="Image"
                                    className="mx-auto rounded-full mb-4 border-4 border-gray-200"
                                />
                                <p className="text-xl font-bold text-gray-800">Clinic Name</p>
                                <p className="text-gray-600">Clinic Location</p>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">Experience: 21 Years</p>
                                    <p className="text-sm text-gray-600">Patients: 5,352</p>
                                    <p className="text-sm text-gray-600">Reviews: 4.8 out of 5</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Appointments and History */}
                    <section className="grid grid-cols-2 gap-8 mt-12">
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Appointments</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between">
                                    <p className="text-gray-700">Clinic Name - Location</p>
                                    <p className="text-gray-500">April 30th, 2024 - 9 AM</p>
                                </li>
                                {/* Add more appointments as needed */}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent History</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between">
                                    <p className="text-gray-700">April 28th, 2024</p>
                                    <p className="text-gray-500">Starting Symptoms of Dementia</p>
                                </li>
                                {/* Add more history as needed */}
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Home;