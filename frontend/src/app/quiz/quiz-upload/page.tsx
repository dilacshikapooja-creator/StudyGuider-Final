"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizUploadPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUploadQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("questionCount", String(questionCount));

      const res = await fetch("http://localhost:5000/api/quiz/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Quiz generation failed");
      }

      localStorage.setItem("quizData", JSON.stringify(data.quiz));
      localStorage.setItem("quizFileName", file.name);

      router.push("/quiz/quiz-play");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Upload PDF for Quiz</h1>
      <p>Upload your study material and generate quiz questions using AI.</p>

      <form onSubmit={handleUploadQuiz} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label>Choose PDF:</label>
          <br />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>How many questions do you want?</label>
          <br />
          <input
            type="number"
            min={1}
            max={20}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </form>

      {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}
    </main>
  );
}