import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-blue-600 p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">Brain Quiz</div>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-white">Home</Link></li>
                    <li><Link to="/quiz" className="text-white">Start Quiz</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;