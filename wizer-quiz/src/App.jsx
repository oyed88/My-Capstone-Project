import { useEffect } from "react"
import { fetchQuestions } from "./services/triviaApi"

export default function App() {

  useEffect(() => {
    console.log("USEEFFECT RUNNING")

    fetchQuestions()
      .then((questions) => {
        console.log("QUESTIONS:", questions)
      })
      .catch((err) => {
        console.log("ERROR:", err)
      })
  }, [])

  return (
    <h1 className="text-3xl font-bold text-center mt-10">
      Wizer Quiz 🚀
    </h1>
  )
}
