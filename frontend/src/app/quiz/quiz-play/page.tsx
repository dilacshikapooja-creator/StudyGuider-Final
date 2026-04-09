

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Next from "next/dist/server/next";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

type SavedQuiz = {
  id: number;
  title: string;
  date: string;
  score: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  userAnswers: string[];
};

export default function QuizPlayPage() {
  const router = useRouter();

  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  
  useEffect(() => {
    const savedQuiz = localStorage.getItem("quizData");

    if (savedQuiz) {
      setQuiz(JSON.parse(savedQuiz));
    } else {
      router.push("/quiz/quiz-upload");
    }
  }, [router]);

  const handleNext = () => {
    if (!selected) {
      alert("Please select an answer");
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selected;
    setAnswers(updatedAnswers);

    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected("");
    } else {
      let finalScore = 0;

      quiz.forEach((q, index) => {
        if (q.answer === updatedAnswers[index]) {
          finalScore += 1;
        }
      });

      setScore(finalScore);
      setShowResult(true);
    }
  };

  const saveQuizResult = () => {
  try {
    const savedQuizzes = localStorage.getItem("savedQuizzes");
    const parsedQuizzes = savedQuizzes ? JSON.parse(savedQuizzes) : [];

    const fileName = localStorage.getItem("quizFileName") || "Untitled Quiz";

    const newQuiz = {
      id: Date.now(),
      title: fileName,
      date: new Date().toLocaleDateString(),
      score: score,
      totalQuestions: quiz.length,
      questions: quiz,
      userAnswers: answers,
    };

    const updatedQuizzes = [newQuiz, ...parsedQuizzes];
    localStorage.setItem("savedQuizzes", JSON.stringify(updatedQuizzes));

    alert("Quiz saved successfully!");
  } catch (error) {
    console.error("Error saving quiz:", error);
  }
};

  if (!quiz.length) {
    return <p style={{ padding: "40px" }}>Loading quiz...</p>;
  }

  if (showResult) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Quiz Review</h1>
        <h2>
          Final Score: {score} / {quiz.length}
        </h2>

        <div style={{ display: "flex", gap: "12px", marginTop: "20px", marginBottom: "30px" }}>
          <button
            onClick={saveQuizResult}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              color: "#56cf60"
            }}
          >
            Save Quiz
          </button>

          <button
          type="button"
          onClick={() => router.push("/notes/short-notes")}
          style={{
            padding: "14px 24px",
            border: "none",
            borderRadius: "10px",
            background: "#259e25",
            cursor: "pointer",
            fontSize: "18px",
            color: "#fff",
          }}
        >
          Next
        </button>
        </div>

        <div style={{ marginTop: "30px" }}>
          {quiz.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.answer;

            return (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3>
                  {index + 1}. {q.question}
                </h3>

                <p>
                  <strong>Your Answer:</strong> {userAnswer || "Not answered"}
                </p>

                <p>
                  <strong>Correct Answer:</strong> {q.answer}
                </p>

                <p>
                  <strong>Result:</strong> {isCorrect ? "Correct" : "Wrong"}
                </p>

                {q.explanation && (
                  <p>
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    );
  }

  const currentQuestion = quiz[currentIndex];

  return (
    <main style={{ padding: "40px" }}>
      <h1>Quiz</h1>
      <p>
        Question {currentIndex + 1} of {quiz.length}
      </p>

      <div style={{ marginTop: "20px" }}>
        <h2>{currentQuestion.question}</h2>

        <div style={{ marginTop: "20px" }}>
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              style={{
                display: "block",
                marginBottom: "12px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="quiz-option"
                value={option}
                checked={selected === option}
                onChange={(e) => setSelected(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              {option}
            </label>
          ))}
        </div>

        <button
          onClick={handleNext}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {currentIndex === quiz.length - 1 ? "Submit Quiz" : "Next Question"}
        </button>
      </div>
    </main>
  );
}
