"use client";

import { useState } from "react";
import styles from "./summary.module.scss";

export default function SmartSummariesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please upload only PDF files.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setMessage("");
  };

  const handleGenerateSummary = async () => {
    if (!selectedFile) {
      setMessage("Please select a PDF file first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSummary("");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("http://localhost:5000/api/notes/upload-summary", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate summary");
      }

      setSummary(data.summary || "No summary received.");
      setMessage("Summary generated successfully!");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.summaryPage}>
      <div className={styles.container}>
        <div className={styles.leftCard}>
          <span className={styles.badge}>AI Study Tool</span>
          <h1>Smart Summaries</h1>
          <p>
            Upload your PDF notes and get quick, easy-to-read AI summaries for
            faster revision and better understanding.
          </p>

          <div className={styles.uploadBox}>
            <label htmlFor="pdfUpload" className={styles.uploadLabel}>
              Choose PDF
            </label>
            <input
              id="pdfUpload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className={styles.fileInput}
            />

            {selectedFile && (
              <div className={styles.fileInfo}>
                <strong>Selected File:</strong> {selectedFile.name}
              </div>
            )}
          </div>

          <button
            className={styles.generateBtn}
            onClick={handleGenerateSummary}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>

          {message && <p className={styles.message}>{message}</p>}
        </div>

        <div className={styles.rightCard}>
          <h2>Summary Output</h2>

          {!summary ? (
            <div className={styles.placeholder}>
              <p>Your AI-generated summary will appear here.</p>
            </div>
          ) : (
            <div className={styles.summaryResult}>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}