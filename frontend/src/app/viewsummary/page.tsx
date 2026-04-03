"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./view-summary.module.scss";

export default function ViewSummaryPage() {
  const router = useRouter();
  const [summary, setSummary] = useState("");
  const [fileName, setFileName] = useState("");
 const handleSave = () => {
  const savedNotes = JSON.parse(localStorage.getItem("savedNotes") || "[]");

  const newNote = {
    id: Date.now(),
    title: fileName || "Untitled Note",
    subject: "Generated Summary",
    date: new Date().toISOString().split("T")[0],
    summary,
  };

  const updatedNotes = [newNote, ...savedNotes];

  localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));

  router.push("/dashboard");
};

  useEffect(() => {
    const savedSummary = localStorage.getItem("latestSummary");
    const savedFileName = localStorage.getItem("latestFileName");

    if (savedSummary) {
      setSummary(savedSummary);
    }

    if (savedFileName) {
      setFileName(savedFileName);
    }
  }, []);


  return (
    <main className={styles.summaryPage}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>View Summary</h1>
          <button onClick={() => router.push("/upload-notes")}>
            Upload New Note
          </button>
        </div>

        {fileName && (
          <div className={styles.fileBox}>
            <strong>File Name:</strong> {fileName}
          </div>
        )}

        {summary ? (
          <div className={styles.summaryBox}>
            <h2>Generated Summary</h2>
            <p>{summary}</p>
            <button className={styles.saveBtn} onClick={handleSave}>
              Save Summary
            </button>
          </div>

        ) : (
          <div className={styles.emptyState}>
            <p>No summary available yet.</p>
            <button onClick={() => router.push("/upload-notes")}>
              Go to Upload Notes
            </button>
          </div>
        )}
      </div>
    </main>
  );
}