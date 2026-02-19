import { useEffect, useState } from "react";
import useQuiz from "../hooks/useQuiz";
import QuizUI from "../components/QuizUI";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(10);

  // Fetch questions
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results))
      .catch((err) => console.log(err));
  }, []);

  const { currentIndex, currentQuestion, score, handleAnswer } =
    useQuiz(questions);

  // Timer logic
  useEffect(() => {
    if (!currentQuestion) return;
    if (time === 0) {
      handleAnswer(""); // move to next question
      setTime(10);
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, currentQuestion]);

  if (!currentQuestion) return <p>Loading...</p>;

  return (
    <QuizUI
      question={currentQuestion}
      handleAnswer={handleAnswer}
      time={time}
      score={score}
      currentIndex={currentIndex}
    />
  );
}
