import React from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

function Hero() {
    return (
    <div>
      {/* Header at the top */}
        <Header/>

      {/* Hero Section */}
      <section>
          <div class="relative isolate px-6 pt-2 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          </div>
            <div class="text-center mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
              <div class="text-center">
                <h1 class="font-bold tracking-tight text-gray-900 sm:text-6xl">Welcome to SmartSympto!</h1>
                <p class="mt-6 text-lg leading-8 text-gray-600">Our cutting-edge app combines AI diagnosis with personalized health insights, focusing on a single key health issue. We use Gemini for an initial diagnosis and ChatGPT for precision checks. Generate detailed reports for your doctor, empowering you to take control of your health like never before!</p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" class="rounded-md bg-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          </div>
      </section>

    {/* Features Section */}
    <section className="py-16 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Early Detection</h2>
                  <p className="text-gray-600">
                    Our application can help identify early signs of cognitive decline, allowing for timely intervention.
                  </p>
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Scientifically Backed</h2>
                    <p className="text-gray-600">
                      The application is based on research from leading neuroscientists and healthcare professionals.
                    </p>
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Easy to Use</h2>
                    <p className="text-gray-600">
                        Simple and user-friendly interface for a smooth experience.
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