"use client";

import { useState } from "react";
import styles from "./quiz.module.scss";

export default function QuizPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Upload file first");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch("http://localhost:5000/api/quiz/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setQuiz(data.quiz);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>AI Quiz Generator 🧠</h1>

      <input
        type="file"
        accept=".pdf,video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleUpload}>
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      <div className={styles.quiz}>
        {quiz.map((q, index) => (
          <div key={index} className={styles.card}>
            <h3>{q.question}</h3>
            {q.options.map((opt: string, i: number) => (
              <p key={i}>• {opt}</p>
            ))}
            <strong>Answer: {q.answer}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}