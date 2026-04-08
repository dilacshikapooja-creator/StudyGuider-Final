"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function QuizReviewPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<SavedQuiz | null>(null);

  useEffect(() => {
    const savedQuiz = localStorage.getItem("reviewQuiz");

    if (savedQuiz) {
      setQuizData(JSON.parse(savedQuiz));
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  if (!quizData) {
    return <p style={{ padding: "40px" }}>Loading review...</p>;
  }

  return (
    <main style={{ padding: "40px", background: "#efe4cf", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "42px", marginBottom: "8px", color: "#0f2544" }}>
        Quiz Review
      </h1>

      <h2 style={{ fontSize: "24px", marginBottom: "30px", color: "#0f2544" }}>
        Final Score: {quizData.score} / {quizData.totalQuestions}
      </h2>

      <div style={{ display: "flex", gap: "14px", marginBottom: "30px" }}>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "14px 24px",
            border: "none",
            borderRadius: "10px",
            background: "#f3f4f6",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Back to Dashboard
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

      <div style={{ marginTop: "20px" }}>
        {quizData.questions.map((q, index) => {
          const userAnswer = quizData.userAnswers[index];
          const isCorrect = userAnswer === q.answer;

          return (
            <div
              key={index}
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "14px",
                padding: "22px",
                marginBottom: "24px",
                background: "transparent",
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "12px", color: "#111827" }}>
                {index + 1}. {q.question}
              </h3>

              <p style={{ marginBottom: "6px", fontSize: "16px" }}>
                <strong>Your Answer:</strong> {userAnswer || "Not answered"}
              </p>

              <p style={{ marginBottom: "6px", fontSize: "16px" }}>
                <strong>Correct Answer:</strong> {q.answer}
              </p>

              <p style={{ marginBottom: "6px", fontSize: "16px" }}>
                <strong>Result:</strong> {isCorrect ? "Correct" : "Wrong"}
              </p>

              {q.explanation && (
                <p style={{ fontSize: "16px" }}>
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