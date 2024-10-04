import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import GoogleLogo from '../assets/GoogleLogo.webp';
import HomeLogo from '../assets/HomeLogo.png';
import LoginImage from '../assets/LoginImage.jpg';
import { UserAuth } from '../context/AuthContext';

function Login() {

{/* Create Login with Google Feature, these are placeholders for now, they do not work properly*/}
  const { googleSignIn } = UserAuth();

  const  handleGoogleSignIn  = async () => {
    try{
      await googleSignIn();
    }
    catch(error){
      console.log( error);
    }
  };

  return (
    <div className="flex flex-wrap min-h-screen bg-gradient-to-br from-purple-100 to-pink-200">
      <Link to="/" className="absolute top-8 right-8 z-10">
        <img
          src={HomeLogo}
          alt="Home Logo"
          className="w-00 h-10"
        />
      </Link>
      <div className="relative hidden md:block md:w-1/2">
        <img
          src={LoginImage}
          alt="Login Picture"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center md:w-1/2 w-full p-8 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300">
        <div className="w-full max-w-lg">
          <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Welcome Back!</h1>
          <form className="space-y-6">
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
                Log in
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="flex justify-center items-center my-6">
            <span className="text-gray-500">────────── or ──────────</span>
          </div>
          <div className="flex justify-center mt-4">
            {/* Change the onClick Attribute as well when we get the Login with Google Feature working*/}
            <button
              onClick={googleSignIn} 
              className="w-full py-3 px-4 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-md shadow-md flex items-center justify-center space-x-3 transition duration-300"
            >
              <img
                src={GoogleLogo}
                alt="Google Image"
                className="w-5 h-5"
              />
              <span>Log in with Google</span>
            </button>
          </div>
          <div className="text-center mt-6">
            <span className="text-gray-500">Not a Member? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
