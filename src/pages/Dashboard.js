import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Graph from '../assets/graph.png';
import Clinic from '../assets/clinic.avif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, CardHeader, CardTitle } from "../components/Home/card";
import { Brain, Users } from "lucide-react";
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

                {/* Main Content */}
                <main className="w-4/5 p-10 overflow-y-auto h-screen">
                    <header className="flex justify-between items-center mb-8 pt-4">
                        <h1 className="text-5xl font-extrabold text-gray-800">Welcome, {user?.displayName}!</h1>
                        <div className="bg-white p-4 rounded-full shadow-md flex items-center">
                            <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
                        </div>
                    </header>

            {/* Dashboard Stats */}
                    
                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-5">

                    {/* Total Tests Conducted Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium flex items-center justify-between w-full">Total Tests Conducted<Brain className="w-4 h-4 text-blue-500 ml-2" /></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,285</div>
                            <p className="text-xs text-muted-foreground">+20% from last month</p>
                        </CardContent>
                    </Card>

                    {/* New Patients Card */}
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium flex items-center justify-between w-full">New Patients<Users className="w-4 h-4 text-blue-500 ml-2" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">145</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                    </Card>

                    {/* Brain Health Score Card */}
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium flex items-center justify-between w-full">Brain Health Score<Brain className="w-4 h-4 text-blue-500 ml-2" /></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87</div>
                        <p className="text-xs text-muted-foreground">+2 points from last month</p>
                    </CardContent>
                    </Card>
                    
                    {/* Early Detection Rate Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium flex items-center justify-between w-full">Early Detection Rate<Brain className="w-4 h-4 text-blue-500 ml-2" /></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">92%</div>
                            <p className="text-xs text-muted-foreground">+3% from last month</p>
                        </CardContent>
                    </Card>
                </div>
                    

                    {/* Chart and Best Doctor Section */}
                    <section className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            {/* Chart Placeholder */}
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Patient Status</h3>
                            <div className="h-56 rounded-lg flex justify-center items-center">
                                <img
                                    src={Graph}
                                    alt="Home Logo"
                                    className="mt-36"
                                />
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Clinic of the Week</h3>
                            <div className="text-center">
                                <img
                                    src={Clinic}
                                    alt="graph"
                                    className="mx-auto rounded-full mb-4 border-4 border-gray-200"
                                />
                                <p className="text-xl font-bold text-gray-800">St Joseph Hospital Outpatient</p>
                                <p className="text-gray-600">Orange, California</p>
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
                                    <p className="text-gray-700">Dr. Smith - Orange, California</p>
                                    <p className="text-gray-500">October 31, 2024 - 10 AM</p>
                                </li>
                                <li className="flex justify-between">
                                    <p className="text-gray-700">Dr. Johnson - San Diego, California</p>
                                    <p className="text-gray-500">December 15, 2024 - 1 PM</p>
                                </li>
                                {/* Add more appointments as needed */}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent History</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between">
                                    <p className="text-gray-700">September 25th, 2024</p>
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