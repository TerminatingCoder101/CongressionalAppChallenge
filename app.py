from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

class CognitiveTest:
    def __init__(self):
        self.questions = {
            "Memory": self.memory_questions(),
            "Attention": self.attention_questions(),
            "Language": self.language_questions()
        }

    def memory_questions(self):
        words = ["apple", "banana", "orange", "grape", "pear"]
        random.shuffle(words)
        return {
            "question": f"Remember these words: {', '.join(words)}",
            "answers": words
        }

    def attention_questions(self):
      sequence = [random.choice(['A', 'B', 'C', 'D']) for _ in range(10)]
      correct_answer = sequence[2]
      return correct_answer, f"Sequence: {' '.join(sequence)}"


    def language_questions(self):
        return {
            "question": "Complete the sentence: 'The cat is on the __.'",
            "answer": "roof"
        }

    def administer_test(self, memory_answers, attention_answer, language_answer):
        scores = []

        # Memory Test
        score = self.calculate_memory_score(memory_answers, self.questions["Memory"]["answers"])
        scores.append(("Memory", score))

        # Attention Test
        correct_answer, _ = self.attention_questions()
        score = 1 if attention_answer == correct_answer else 0
        scores.append(("Attention", score))

        # Language Test
        score = 1 if language_answer.lower() == self.questions["Language"]["answer"] else 0
        scores.append(("Language", score))

        return scores

    def calculate_memory_score(self, user_answers, correct_answers):
      if len(correct_answers) == 0:
        return 0 
      score = sum(1 for answer in user_answers if answer in correct_answers)
      return score / len(correct_answers)


cognitive_test = CognitiveTest()

@app.route('/api/test', methods=['GET'])
def get_questions():
    return jsonify(cognitive_test.questions)

@app.route('/api/test/result', methods=['POST'])
def submit_answers():
    data = request.json
    memory_answers = data.get('memory_answers', [])
    attention_answer = data.get('attention_answer', '')
    language_answer = data.get('language_answer', '')

    scores = cognitive_test.administer_test(memory_answers, attention_answer, language_answer)
    total_score = sum(score for _, score in scores)
    result = {
      "scores": scores,
      "total_score": (total_score / len(scores)) * 100 if len(scores) > 0 else 0
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
