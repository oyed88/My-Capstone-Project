import { useEffect, useState } from "react";
import { fetchQuestions } from "../services/triviaApi";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Fetch questions on load
  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    loadQuestions();
  }, []);

  // Loading state
  if (questions.length === 0) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  // ✅ SCORE SCREEN (BONUS)
  if (currentIndex >= questions.length) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Quiz Finished 🎉</h1>
        <p className="mt-4 text-lg">Your Score: {score}</p>

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 mt-6 rounded hover:bg-blue-600"
        >
          Restart
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  // Combine & shuffle answers
  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  // Handle answer click
  const handleAnswer = (answer) => {
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-center">
      <h2 className="text-lg font-semibold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>

      <p className="mb-6">{currentQuestion.question}</p>

      <div className="space-y-3">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className="block w-full bg-gray-200 p-2 rounded hover:bg-gray-300"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
