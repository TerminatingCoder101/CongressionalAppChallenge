import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserAuth } from '../context/AuthContext';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt, faPrint } from '@fortawesome/free-solid-svg-icons';

const Documents = () => {
  // sample data for now, we have to change after creating and updating everything by connecting to Diagnosis page to send reports here
  const [documents] = useState([
    {
      id: 1,
      title: 'Blood Test Report',
      date: 'October 12, 2024',
      content: 'Here is the detailed content of the blood test report. The report includes results on glucose, cholesterol, and more.',
    },
    {
      id: 2,
      title: 'X-Ray Report',
      date: 'October 10, 2024',
      content: 'The X-ray results indicate a slight fracture in the left arm.',
    },
    {
      id: 3,
      title: 'MRI Scan Report',
      date: 'October 8, 2024',
      content: 'MRI scan results show normal brain activity and no signs of abnormalities.',
    },
  ]);

  const printRef = useRef();

  // Update the document printing function here to print out the results from our tests from Diagnosis & Aid Page
  const handlePrint = (document) => {
    printRef.current.innerHTML = `
      <h1>${document.title}</h1>
      <p><strong>Date:</strong> ${document.date}</p>
      <div>${document.content}</div>
    `;
    window.print();
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
        <div className="flex flex-grow justify-center items-center p-8">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Documents</h1>

            {/* Documents List */}
            <div className="grid grid-cols-1 gap-4">
              {documents.map((document) => (
                <div key={document.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold">{document.title}</p>
                    <p className="text-sm text-gray-600">{document.date}</p>
                  </div>
                  <p className="mt-2 text-gray-700">{document.content.substring(0, 100)}...</p>

                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={() => handlePrint(document)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                    >
                      <FontAwesomeIcon icon={faPrint} className="mr-2" />
                      Print
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Print Area */}
            <div ref={printRef} className="hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
