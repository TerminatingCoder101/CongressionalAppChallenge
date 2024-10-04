import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { UserAuth } from '../context/AuthContext';

const Home = () => {
    const { user, logOut } = UserAuth();

    const handleLogout = async () => {
        try{
            await logOut();
            console.log('User has been logged out!');
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <div>
            {/* Home Page After Login Section */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to SmartSympto</h1>
                    {user?.displayName ? (
                        <button onClick={handleLogout} className="rounded-md bg-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Log Out
                        </button> ) : (null)
                    }
        </div>
    );
}

export default Home;