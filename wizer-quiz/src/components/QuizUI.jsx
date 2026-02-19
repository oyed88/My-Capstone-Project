export default function QuizUI({
  question,
  handleAnswer,
  time,
  score,
  currentIndex,
}) {
  const answers = [
    question.correct_answer,
    ...question.incorrect_answers,
  ];

  // shuffle
  answers.sort(() => Math.random() - 0.5);

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-xl font-bold mb-4">
        Question {currentIndex + 1}
      </h2>

      <p className="mb-4">{question.question}</p>

      <p className="mb-4 text-red-500">Time: {time}s</p>

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

      <p className="mt-6">Score: {score}</p>
    </div>
  );
}
