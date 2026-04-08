"use client";

import { useEffect, useState } from "react";

type SavedItem = {
  id: number;
  title: string;
  date: string;
  type: "summary" | "quiz";
};

export default function MemoryPage() {
  const [savedSummaries, setSavedSummaries] = useState<SavedItem[]>([]);
  const [savedQuizzes, setSavedQuizzes] = useState<SavedItem[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const summaries = JSON.parse(localStorage.getItem("savedNotes") || "[]");
    const quizzes = JSON.parse(localStorage.getItem("savedQuizzes") || "[]");

    setSavedSummaries(
      summaries.map((item: any) => ({
        ...item,
        type: "summary",
      }))
    );

    setSavedQuizzes(
      quizzes.map((item: any) => ({
        ...item,
        type: "quiz",
      }))
    );
  }, []);

  const allItems = [...savedSummaries, ...savedQuizzes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredItems =
    filter === "all"
      ? allItems
      : allItems.filter((item) => item.type === filter);

  return (
    <main style={{ padding: "30px" }}>
      <h1>Memory Page</h1>
      <h2>My Saved Content</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("summary")}>Summaries</button>
        <button onClick={() => setFilter("quiz")}>Quizzes</button>
      </div>

      {filteredItems.length === 0 ? (
        <p>No saved content found.</p>
      ) : (
        filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "16px",
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.type === "summary" ? "Generated Summary" : "Generated Quiz"}</p>
            <p>{item.date}</p>
          </div>
        ))
      )}
    </main>
  );
}