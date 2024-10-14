import React, { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from '../assets/GoogleLogo.webp';
import HomeLogo from '../assets/HomeLogo.png';
import SignupImage from '../assets/SignupImage.jpg';
import { UserAuth } from '../context/AuthContext';

function Signup() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const  handleGoogleSignIn  = async () => {
    try{
      await googleSignIn();
    }
    catch(error){
      console.log( error);
    }
  };

  useEffect(() => {
    if(user != null) {
      navigate('/dashboard');
    }
  }, [user]);

  return (
    <div className="flex flex-wrap min-h-screen bg-gradient-to-br from-purple-100 to-pink-200">
      <Link to="/" className="absolute top-8 left-8 z-10">
        <img
          src={HomeLogo}
          alt="Home Logo"
          className="w-00 h-10"
        />
      </Link>
      
      <div className="flex justify-center items-center md:w-1/2 w-full p-8 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300">
        <div className="w-full max-w-lg">
          <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Create an Account!</h1>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center my-6">
            <span className="text-gray-500">────────── or ──────────</span>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-md shadow-md flex items-center justify-center space-x-3 transition duration-300"
            >
              <img
                src={GoogleLogo}
                alt="Google Logo"
                className="w-5 h-5"
              />
              <span>Sign up with Google</span>
            </button>
          </div>
          <div className="text-center mt-6">
            <span className="text-gray-500">Already a Member? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in!
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src={SignupImage}
          alt="Signup Picture"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Signup;
