import React from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import Image from '../assets/HomeScreen.png';
import { Link } from 'react-router-dom';
import EarlyD from '../assets/Early Detection.jpg';
import ScientificallyP from '../assets/Scientifically Proven.png';
import EasyToUse from '../assets/EasyToUse.avif';


function Hero() {
    return (
    <div>
      {/* Header at the top */}
        <Header/>

      {/* Hero Section */}
      <section id="home">
        <div className="bg-cover h-screen" style={{backgroundImage: `url(${Image})`}}>
          <div className="relative isolate px-6 pt-2 lg:px-8">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          </div>
            <div className="text-center mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="font-bold tracking-tight text-black sm:text-6xl">Welcome to SmartSympto!</h1>
                <p className="mt-6 text-lg leading-8 text-black opacity-100">Our cutting-edge app combines AI diagnosis with personalized health insights, focusing on a single key health issue. We use Gemini for an initial diagnosis and ChatGPT for precision checks. Generate detailed reports for your doctor, empowering you to take control of your health like never before!</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/signup" className="rounded-md bg-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</Link>
                <a href="#about" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          </div>
          </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-gray-100" id="about">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">What makes us special</h1>
          <p className="text-lg leading-relaxed text-gray-600">
            We created a tool that can help people improve their general health by providing early detection and intervention. We're committed to creating a platform that can help individuals overcome any medical decline. 

            Our app combines AI diagnosis with personalized health insights, focusing on a single key health issue. We use Gemini for an initial diagnosis and ChatGPT for precision checks. Generate detailed reports for your doctor, empowering you to take control of your health like never before!
          </p>
        </div>
      </div>
      </section>


    {/* Features Section */}
    <section className="py-16 bg-white" id="services">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img src={EarlyD} alt="Early Detection Image" className="w-full max-w-[300px] ml-14"/>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Early Detection</h2>
                  <p className="text-gray-600">
                    Our application can help identify early signs of cognitive decline, allowing for timely intervention.
                  </p>
            </div>
            <div className="text-center">
            <img src={ScientificallyP} alt="Scientifically Proven Image" className="w-full max-w-[250px] ml-20 mb-16"/>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Scientifically Backed</h2>
                    <p className="text-gray-600">
                      The application is based on research from leading neuroscientists and healthcare professionals.
                    </p>
            </div>
            <div className="text-center">
            <img src={EasyToUse} alt="Easy To Use Image" className="w-full max-w-[250px] ml-20 mb-10"/>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Easy to Use</h2>
                    <p className="text-gray-600">
                        Simple and user-friendly interface for a quick and smooth experience.
                    </p>
            </div>
        </div>
      </section>


      {/* Footer at the bottom */}
      <Footer />
    </div>
    );
}

export default Hero;