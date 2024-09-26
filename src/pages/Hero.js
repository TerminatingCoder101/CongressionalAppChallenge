import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

function Home() {
    return (
        <div>
            <Header/> {/* Header at the top */}

            {/* Hero Section */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to SmartSympto</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Our quiz is designed to detect early signs of brain diseases like Alzheimer's and Parkinson's.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
                        Start the Quiz
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Early Detection</h2>
                        <p className="text-gray-600">
                            Our quiz can help identify early signs of cognitive decline, allowing for timely intervention.
                        </p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Scientifically Backed</h2>
                        <p className="text-gray-600">
                            The quiz is based on research from leading neuroscientists and healthcare professionals.
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

            <Footer /> {/* Footer at the bottom */}
        </div>
    );
}

export default Home;