import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Wizer Quiz 🚀</h1>

      <Link
        to="/quiz"
        className="bg-blue-500 text-white px-4 py-2 mt-6 inline-block rounded"
      >
        Start Quiz
      </Link>
    </div>
  );
}
