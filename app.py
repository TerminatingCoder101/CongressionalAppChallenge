from flask import Flask, request, jsonify
from flask_cors import CORS

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
            "MathSkills": self.math_skills_questions(),
            "AdditionalQuestions": self.additional_questions()
        }

    def memory_questions(self):
        return {
            "short_term": "1. What is the date today (from memory)?",
            "answers": ["Day", "Month", "Year"]
        }

    def attention_questions(self):
        return {
            "question": "2. How many nickels are in 60 cents?",
            "correct_answer": "12"
        }

    def language_questions(self):
        return {
            "question": "3. You are buying $13.45 worth of groceries. How much in change do you receive back from a $20 bill?",
            "correct_answer": "6.55"
        }

    def problem_solving_questions(self):
        return {
            "question": "4. Do you have trouble making decisions even for everyday things such as what to eat or what to wear?",
            "options": ["Never", "Always", "Sometimes"],
            "correct_answer": "Never"  # Subjective question
        }

    def visual_spatial_questions(self):
        return {
            "question": "5. Choose the two below that are most similar: Ruler, House, Book, Measuring tape",
            "correct_answer": ["Ruler", "Measuring tape"]
        }

    def logical_reasoning_questions(self):
        return {
            "question": "6. If 3 apples can be picked in 5 minutes, how many can be picked in 1 hour?",
            "correct_answer": "36"
        }

    def math_skills_questions(self):
        return {
            "question": "7. How many quarters are in $10?",
            "correct_answer": "40"
        }

    def additional_questions(self):
        return {
            "Question11": self.question_11(),
            "Question12": self.question_12(),
            "Question13": self.question_13(),
            "Question14": self.question_14(),
            "Question15": self.question_15(),
            "Question16": self.question_16(),
            "Question17": self.question_17(),
            "Question18": self.question_18()
        }

    def question_11(self):
        return {
            "question": "8. When talking, do you forget the point you're trying to make?",
            "options": ["Never", "Always", "Sometimes"],
            "correct_answer": "Never"  # Subjective question
        }

    def question_12(self):
        return {
            "question": "9. Write down the names of 5 US states.",
            "correct_answer": None  # Open-ended question
        }

    def question_13(self):
        return {
            "question": "10. On the last question, write your first name.",
            "correct_answer": None  # Open-ended question
        }

    def question_14(self):
        return {
            "question": "11. Choose the two below that are most similar: Apple, Bottle, Melon, Cattle",
            "correct_answer": ["Apple", "Melon"]
        }

    def question_15(self):
        return {
            "question": "12. Please remember these words: 'paper, broccoli, knob'.",
            "correct_answer": None  # Memorization task
        }

    def question_16(self):
        return {
            "question": "13. What words were you asked to memorize in question 12?",
            "correct_answer": ["paper", "broccoli", "knob"]  # Open-ended question
        }

    def question_17(self):
        return {
            "question": "14. Cattle are to land as fish are to ______: Forests, Taiga, Water, or Polar regions",
            "options": ["Forests", "Taiga", "Water", "Polar regions"],
            "correct_answer": "Water"
        }

    def question_18(self):
        return {
            "question": "15. Answer what question 10 was asking (from memory).",
            "correct_answer": None  # Open-ended question
        }

    def administer_test(self, memory_answers, attention_answer, language_answer, problem_solving_answer, visual_spatial_answer, logical_reasoning_answer, math_skills_answer, additional_answers):
        scores = []

        # Memory Test
        memory_score = 1 if memory_answers == ["Day", "Month", "Year"] else 0
        scores.append(("Memory", memory_score))

        # Attention Test
        attention_score = 1 if attention_answer.strip() == self.questions["Attention"]["correct_answer"] else 0
        scores.append(("Attention", attention_score))

        # Language Test
        language_score = 1 if language_answer.strip() == self.questions["Language"]["correct_answer"] else 0
        scores.append(("Language", language_score))

        # Problem Solving Test
        problem_solving_score = 1 if problem_solving_answer.strip() in self.questions["ProblemSolving"]["options"] else 0
        scores.append(("Problem Solving", problem_solving_score))

        # Visual-Spatial Test
        visual_spatial_score = 1 if visual_spatial_answer.strip().lower() == "ruler and measuring tape" else 0
        scores.append(("Visual-Spatial", visual_spatial_score))

        # Logical Reasoning Test
        logical_reasoning_score = 1 if logical_reasoning_answer.strip() == self.questions["LogicalReasoning"]["correct_answer"] else 0
        scores.append(("Logical Reasoning", logical_reasoning_score))

        # Math Skills Test
        math_skills_score = 1 if math_skills_answer.strip() == self.questions["MathSkills"]["correct_answer"] else 0
        scores.append(("Math Skills", math_skills_score))

        # Additional Questions Test
        additional_scores = self.administer_additional_questions(additional_answers)
        scores.extend(additional_scores)

        return scores

    def administer_additional_questions(self, additional_answers):
        scores = []

        # Evaluate additional questions based on provided answers
        if additional_answers.get("Question11") in ["Never", "Always", "Sometimes"]:
            scores.append(("Question 11", 1))
        if additional_answers.get("Question12") and len(additional_answers["Question12"].split(',')) == 5:
            scores.append(("Question 12", 1))
        if additional_answers.get("Question13") and len(additional_answers["Question13"].strip()) > 0:
            scores.append(("Question 13", 1))
        if additional_answers.get("Question14") == ["Apple", "Melon"]:
            scores.append(("Question 14", 1))
        if additional_answers.get("Question15") and len(additional_answers["Question15"].strip()) > 0:
            scores.append(("Question 15", 1))
        if additional_answers.get("Question16") == ["paper", "broccoli", "knob"]:
            scores.append(("Question 16", 1))
        if additional_answers.get("Question17") == "Water":
            scores.append(("Question 17", 1))
        if additional_answers.get("Question18") and len(additional_answers["Question18"].strip()) > 0:
            scores.append(("Question 18", 1))

        return scores

    def generate_diagnosis(self, scores):
        total_score = sum(score for _, score in scores)
        if total_score >= 12:
            return "Normal cognitive function."
        elif total_score >= 8:
            return "Mild cognitive impairment."
        else:
            return "Significant cognitive impairment."

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
    additional_answers = data.get('additional_answers', {})

    scores = cognitive_test_ai.administer_test(
        memory_answers, attention_answer, language_answer,
        problem_solving_answer, visual_spatial_answer,
        logical_reasoning_answer, math_skills_answer,
        additional_answers
    )
    
    total_score = sum(score for _, score in scores)
    diagnosis = cognitive_test_ai.generate_diagnosis(scores)

    # Create a detailed results dictionary for additional questions
    additional_results = cognitive_test_ai.administer_additional_questions(additional_answers)
    additional_results_dict = {question: result for question, result in additional_results}

    result = {
        "scores": scores,
        "total_score": total_score,
        "diagnosis": diagnosis,
        "additional_results": additional_results_dict  # Include additional results
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
