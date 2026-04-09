
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./quiz-review.module.scss";

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
  const [quizData, setQuizData] = useState<SavedQuiz | null>(null);

  useEffect(() => {
    const savedQuiz = localStorage.getItem("reviewQuiz");

    if (savedQuiz) {
      setQuizData(JSON.parse(savedQuiz));
    }
  }, []);

  if (!quizData) {
    return (
      <main className={styles.page}>
        <div className={styles.emptyCard}>
          <h2>No quiz review found</h2>
          <p>Please complete a quiz first.</p>
          <Link href="/dashboard" className={styles.backBtn}>
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header Card */}
        <div className={styles.headerCard}>
          <div>
            <h1>Quiz Review</h1>
            <p className={styles.subText}>
              Review your answers and learn from explanations
            </p>
          </div>

          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>Final Score</span>
            <h2>
              {quizData.score} / {quizData.totalQuestions}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href="/dashboard" className={styles.backBtn}>
            Back to Dashboard
          </Link>

          <Link href="/dashboard" className={styles.nextBtn}>
            Next
          </Link>
        </div>

        {/* Questions */}
        <div className={styles.questionList}>
          {quizData.questions.map((q, index) => {
            const userAnswer = quizData.userAnswers[index];
            const isCorrect =
              userAnswer?.trim().toLowerCase() === q.answer?.trim().toLowerCase();

            return (
              <div key={index} className={styles.questionCard}>
                <div className={styles.questionTop}>
                  <h3>
                    {index + 1}. {q.question}
                  </h3>

                  <span
                    className={`${styles.badge} ${
                      isCorrect ? styles.correctBadge : styles.wrongBadge
                    }`}
                  >
                    {isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>

                <div className={styles.answerBlock}>
                  <p>
                    <strong>Your Answer:</strong> {userAnswer || "No answer"}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {q.answer}
                  </p>
                  <p>
                    <strong>Result:</strong>{" "}
                    <span className={isCorrect ? styles.correctText : styles.wrongText}>
                      {isCorrect ? "Correct" : "Wrong"}
                    </span>
                  </p>
                  {q.explanation && (
                    <p className={styles.explanation}>
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}