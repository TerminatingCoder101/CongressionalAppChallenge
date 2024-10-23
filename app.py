from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

class CognitiveTestAI:
    def __init__(self):
        self.questions = {
            "Memory": self.memory_questions(),
            "Attention": self.attention_questions(),
            "Language": self.language_questions(),
            "ProblemSolving": self.problem_solving_questions(),
            "VisualSpatial": self.visual_spatial_questions(),
            "LogicalReasoning": self.logical_reasoning_questions(),
            "MathSkills": self.math_skills_questions()
        }

    def memory_questions(self):
        words = ["apple", "banana", "orange", "grape", "pear", "dog", "car", "house", "school", "book"]
        random.shuffle(words)
        return {
            "short_term": f"Remember these words: {', '.join(words[:5])}",
            "long_term": f"Remember these words: {', '.join(words[5:])}",
            "answers": words
        }

    def attention_questions(self):
        sequence = [random.choice(['A', 'B', 'C', 'D', 'E', 'F']) for _ in range(10)]
        return {
            "question": f"Pay attention to this sequence: {' '.join(sequence)}",
            "correct_answer": sequence[2]  # User must recall the third letter
        }

    def language_questions(self):
        return {
            "question": "Form a sentence with the following words: 'dog', 'runs', 'fast'",
            "answer": "The dog runs fast"
        }

    def problem_solving_questions(self):
        math_problem = "If 2+3 equals 5, what is 7-2?"
        correct_answer = "5"
        return {
            "question": math_problem,
            "answer": correct_answer
        }

    def visual_spatial_questions(self):
        shapes = ["circle", "square", "triangle", "hexagon"]
        random.shuffle(shapes)
        return {
            "question": f"Which shape comes after {shapes[0]} and before {shapes[2]}?",
            "correct_answer": shapes[1]
        }

    def logical_reasoning_questions(self):
        return {
            "question": "All men are mortal. Socrates is a man. Therefore, Socrates is ______.",
            "correct_answer": "mortal"
        }

    def math_skills_questions(self):
        return {
            "question": "What is 12 * 7?",
            "correct_answer": "84"
        }

    def administer_test(self, memory_answers, attention_answer, language_answer, problem_solving_answer, visual_spatial_answer, logical_reasoning_answer, math_skills_answer):
        scores = []

        # Memory Test
        memory_score = self.calculate_memory_score(memory_answers, self.questions["Memory"]["answers"])
        scores.append(("Memory", memory_score))

        # Attention Test
        attention_score = 1 if attention_answer.strip().upper() == self.questions["Attention"]["correct_answer"].upper() else 0
        scores.append(("Attention", attention_score))

        # Language Test
        language_score = 1 if language_answer.lower().strip() == self.questions["Language"]["answer"].lower().strip() else 0
        scores.append(("Language", language_score))

        # Problem Solving Test
        problem_solving_score = 1 if problem_solving_answer.strip() == self.questions["ProblemSolving"]["answer"].strip() else 0
        scores.append(("Problem Solving", problem_solving_score))

        # Visual-Spatial Test
        visual_spatial_score = 1 if visual_spatial_answer.strip().lower() == self.questions["VisualSpatial"]["correct_answer"].strip().lower() else 0
        scores.append(("Visual-Spatial", visual_spatial_score))

        # Logical Reasoning Test
        logical_reasoning_score = 1 if logical_reasoning_answer.lower().strip() == self.questions["LogicalReasoning"]["correct_answer"].lower().strip() else 0
        scores.append(("Logical Reasoning", logical_reasoning_score))

        # Math Skills Test
        math_skills_score = 1 if math_skills_answer.strip() == self.questions["MathSkills"]["correct_answer"].strip() else 0
        scores.append(("Math Skills", math_skills_score))

        return scores

    def calculate_memory_score(self, user_answers, correct_answers):
        correct_matches = set([word.strip().lower() for word in user_answers]) & set([word.lower() for word in correct_answers])
        return len(correct_matches) / len(correct_answers)

    def generate_diagnosis(self, scores):
        total_score = sum(score for _, score in scores)
        diagnosis = "Healthy"
        if total_score < 3:  # If score is very low
            diagnosis = "Severe cognitive impairment"
        elif total_score < 5:
            diagnosis = "Moderate cognitive impairment"
        elif total_score < 7:
            diagnosis = "Mild cognitive impairment"
        return diagnosis


cognitive_test_ai = CognitiveTestAI()

@app.route('/api/test', methods=['GET'])
def get_questions():
    return jsonify(cognitive_test_ai.questions)

@app.route('/api/test/result', methods=['POST'])
def submit_answers():
    data = request.json
    memory_answers = data.get('memory_answers', [])
    attention_answer = data.get('attention_answer', '')
    language_answer = data.get('language_answer', '')
    problem_solving_answer = data.get('problem_solving_answer', '')
    visual_spatial_answer = data.get('visual_spatial_answer', '')
    logical_reasoning_answer = data.get('logical_reasoning_answer', '')
    math_skills_answer = data.get('math_skills_answer', '')

    scores = cognitive_test_ai.administer_test(memory_answers, attention_answer, language_answer, problem_solving_answer, visual_spatial_answer, logical_reasoning_answer, math_skills_answer)
    total_score = sum(score for _, score in scores)
    diagnosis = cognitive_test_ai.generate_diagnosis(scores)

    result = {
        "scores": scores,
        "total_score": total_score,
        "diagnosis": diagnosis
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
