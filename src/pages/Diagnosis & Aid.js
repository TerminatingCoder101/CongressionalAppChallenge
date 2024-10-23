import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CognitiveTest = () => {
    const [questions, setQuestions] = useState({});
    const [answers, setAnswers] = useState({ 
        memoryAnswers: [], 
        attentionAnswer: '', 
        languageAnswer: '', 
        problemSolvingAnswer: '', 
        visualSpatialAnswer: '', 
        logicalReasoningAnswer: '', 
        mathSkillsAnswer: '' 
    });
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get('http://127.0.0.1:5000/api/test');
            setQuestions(response.data);
        };
        fetchQuestions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.post('http://127.0.0.1:5000/api/test/result', {
            memory_answers: answers.memoryAnswers,
            attention_answer: answers.attentionAnswer,
            language_answer: answers.languageAnswer,
            problem_solving_answer: answers.problemSolvingAnswer,
            visual_spatial_answer: answers.visualSpatialAnswer,
            logical_reasoning_answer: answers.logicalReasoningAnswer,
            math_skills_answer: answers.mathSkillsAnswer,
        });
        setScore(result.data);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Cognitive Test</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Memory Questions */}
                <div>
                    <h2 className="font-semibold">{questions.Memory?.short_term}</h2>
                    <input
                        type="text"
                        placeholder="Recall words (comma separated)"
                        onChange={(e) => setAnswers({ ...answers, memoryAnswers: e.target.value.split(',') })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Attention Questions */}
                <div>
                    {questions.Attention && <h2 className="font-semibold">{questions.Attention.question}</h2>}
                    <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAnswers({ ...answers, attentionAnswer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Language Questions */}
                <div>
                    {questions.Language && <h2 className="font-semibold">{questions.Language.question}</h2>}
                    <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAnswers({ ...answers, languageAnswer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Problem Solving Questions */}
                <div>
                    {questions.ProblemSolving && <h2 className="font-semibold">{questions.ProblemSolving.question}</h2>}
                    <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAnswers({ ...answers, problemSolvingAnswer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Visual-Spatial Questions */}
                <div>
                    {questions.VisualSpatial && <h2 className="font-semibold">{questions.VisualSpatial.question}</h2>}
                    <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAnswers({ ...answers, visualSpatialAnswer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Logical Reasoning Questions */}
                <div>
                    {questions.LogicalReasoning && <h2 className="font-semibold">{questions.LogicalReasoning.question}</h2>}
                    <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAnswers({ ...answers, logicalReasoningAnswer: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Math Skills Questions */}
                <div>
                    {questions.MathSkills && <h2 className="font-semibold">{questions.MathSkills.question}</h2>}
                    <input
                        type="text"
                        placeholder="Your answer"
                        onChange={(e) => setAnswers({ ...answers, mathSkillsAnswer: e.target.value })}
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
        </div>
    );
};

export default CognitiveTest;
