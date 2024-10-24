import React, {useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const CognitiveTest = () => {
    const [questions] = useState({
        question1: 'What is the date today (from memory) Day____ Month____ Year',
        question2: 'How many nickels are in 60 cents?',
        question3: 'You are buying $13.45 worth of groceries. How much in change do you receive back from a $20 bill?',
        question4: 'If 3 apples can be picked in 5 minutes, how many can be picked in 1 hour?',
        question5: 'Do you have trouble making decisions even for everyday things such as what to eat, clothes to wear, making plans with family/friends, what to read?',
        question6: 'Do you have trouble focusing or concentrating while watching TV, playing on your phone/tablet, or listening to music?',
        question7: 'Do you forget the names of familiar objects and use general phrases such as "you know what I mean" or "that thing"?',
        question8: 'How many quarters are in $10?',
        question9: 'When talking, do you forget the point you are trying to make?',
        question10: 'Write down the names of 5 US states.'
    });
    const [answers, setAnswers] = useState({ 
        question1Answer: [], 
        question2Answer: '', 
        question3Answer: '', 
        question4Answer: '', 
        question5Answer: '', 
        question6Answer: '', 
        question7Answer: '',
        question8Answer: '',
        Question9Answer: '',
        Question10Answer: ''
    });

    const [score] = useState(null);
    const [gptDiagnosis, setGptDiagnosis] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const gptResponse = await axios.post('http://localhost:8000/api/gpt', { answers });
            setGptDiagnosis(gptResponse.data.diagnosis);  // Set the GPT diagnosis result
        } catch (error) {
            console.error('Error calling GPT diagnosis API:', error);
            setGptDiagnosis('Error determining result');
        }
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
      <div className="min-h-screen flex">
      {/* Sidebar */}
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

        <div className="w-4/5 h-screen overflow-y-auto bg-gradient-to-br from-purple-100 to-pink-200 p-8">
        <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Cognitive Test</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Memory Questions */}
                <div>
                    <h2 className="font-semibold">{questions.question1}</h2>
                    <input
                        type="text"
                        placeholder="Month/Day/Year"
                        onChange={(e) => setAnswers({ ...answers, question1Answer: e.target.value.split(',') })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Attention Questions */}
                <div>
                    {<h2 className="font-semibold">{questions.question2}</h2>}
                    <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAnswers({ ...answers, question2Answer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Language Questions */}
                <div>
                    {<h2 className="font-semibold">{questions.question3}</h2>}
                    <input
                        type="text"
                        placeholder="Do not include the $ sign"
                        onChange={(e) => setAnswers({ ...answers, question3Answer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Problem Solving Questions */}
                <div>
                    {<h2 className="font-semibold">{questions.question4}</h2>}
                    <input
                        type="text"
                        placeholder="Enter number here."
                        onChange={(e) => setAnswers({ ...answers, question4Answer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Visual-Spatial Questions */}
                <div>
                    {<h2 className="font-semibold">{questions.question5}</h2>}
                    <input
                        type="text"
                        placeholder="Never, Always, Sometimes"
                        onChange={(e) => setAnswers({ ...answers, question5Answer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Logical Reasoning Questions */}
                <div>
                    {<h2 className="font-semibold">{questions.question6}</h2>}
                    <input
                        type="text"
                        placeholder="Never, Always, Sometimes"
                        onChange={(e) => setAnswers({ ...answers, question6: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Math Skills Questions */}
                <div>
                    {<h2 className="font-semibold">{questions.question7}</h2>}
                    <input
                        type="text"
                        placeholder="Never, Always, Sometimes"
                        onChange={(e) => setAnswers({ ...answers, question7Answer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Additional Questions */}
                <div>
                    <h2 className="font-semibold">{questions.question8}</h2>
                    <input
                        type="text"
                        placeholder="Enter number here."
                        onChange={(e) => setAnswers({ 
                            ...answers, 
                            additionalAnswers: { ...answers.additionalAnswers, question8Answer: e.target.value } 
                        })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <div>
                    <h2 className="font-semibold">{questions.question9}</h2>
                    <input
                        type="text"
                        placeholder="Never, Always, Sometimes"
                        onChange={(e) => setAnswers({ 
                            ...answers, 
                            additionalAnswers: { ...answers.additionalAnswers, Question9Answer: e.target.value } 
                        })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <div>
                    <h2 className="font-semibold">{questions.question10}</h2>
                    <input
                        type="text"
                        placeholder="List with comma"
                        onChange={(e) => setAnswers({ 
                            ...answers, 
                            additionalAnswers: { ...answers.additionalAnswers, Question10Answer: e.target.value } 
                        })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Submit
                </button>
            </form>

            {score && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Results:</h2>
                    <ul>
                        {score.scores.map(([area, score]) => (
                            <li key={area}>
                                {area}: {score === 1 ? "Correct" : "Incorrect"}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2">Diagnosis: {score.diagnosis}</p>
                </div>
            )}

            {gptDiagnosis && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">GPT Diagnosis:</h2>
                    <p>Your predicted diagnosis result is {gptDiagnosis}</p>
                </div>
            )}
        </div>
        </div>
        </div>
    );
};

export default CognitiveTest;
