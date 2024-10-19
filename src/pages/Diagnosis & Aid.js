import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserMd, faUsers, faEnvelope, faPills, faFileAlt, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const CognitiveTest = () => {
    const [questions, setQuestions] = useState({});
    const [answers, setAnswers] = useState({ memoryAnswers: [], attentionAnswer: '', languageAnswer: '' });
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get('http://127.0.0.1:5000/api/test');
            setQuestions(response.data);
        };
        fetchQuestions();
    }, []);

    const handleMemoryInput = (index, value) => {
        const newMemoryAnswers = [...answers.memoryAnswers];
        newMemoryAnswers[index] = value;
        setAnswers({ ...answers, memoryAnswers: newMemoryAnswers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post('http://127.0.0.1:5000/api/test/result', {
            memory_answers: answers.memoryAnswers,
            attention_answer: answers.attentionAnswer,
            language_answer: answers.languageAnswer,
        });
        setScore(result.data);
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

        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Cognitive Test</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Memory Questions */}
                <div>
                    <h2 className="font-semibold">{questions.Memory?.question}</h2>
                    <input
                        type="text"
                        placeholder="Recall words (comma separated)"
                        onChange={(e) => handleMemoryInput(0, e.target.value.split(','))}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Attention Questions */}
                <div>
                    {questions.Attention && <h2 className="font-semibold">{questions.Attention[1]}</h2>}
                    <input
                        type="text"
                        placeholder="What was the third letter?"
                        onChange={(e) => setAnswers({ ...answers, attentionAnswer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Language Questions */}
                <div>
                    <h2 className="font-semibold">{questions.Language?.question}</h2>
                    <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAnswers({ ...answers, languageAnswer: e.target.value })}
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
                              {area}: {!isNaN(score) ? `${Math.round(score * 100)}%` : 'N/A'}
                          </li>
                      ))}
                  </ul>
                  <p className="mt-2">
                      Total Score: {!isNaN(score.total_score) ? `${Math.round(score.total_score)}%` : 'N/A'}
                  </p>
                  {score.total_score < 50 && (
                      <p className="text-red-500">
                          Recommendation: Consider consulting a healthcare professional for further evaluation.
                      </p>
                  )}
              </div>
              )}
        </div>
        </div>
        </div>
    );
};

export default CognitiveTest;
