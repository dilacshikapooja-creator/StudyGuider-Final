"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./upload-notes.module.scss";

export default function UploadNotesPage() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("note", selectedFile);

      const res = await fetch("http://localhost:5000/api/notes/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      localStorage.setItem("latestSummary", data.summary);
      localStorage.setItem("latestFileName", data.fileName || selectedFile.name);

      setMessage("File uploaded and summary generated successfully");

      setTimeout(() => {
        router.push("/viewsummary");
      }, 1000);
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.uploadPage}>
      <div className={styles.card}>
        <h1>Upload Notes</h1>
        <p>Upload your PDF or image note to generate a smart summary.</p>

        <input
          type="file"
          accept=".pdf,image/*,.txt"
          onChange={handleFileChange}
          className={styles.fileInput}
        />

        {selectedFile && (
          <p className={styles.fileName}>Selected: {selectedFile.name}</p>
        )}

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Generate Summary"}
        </button>

<div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        
        {/* 🔙 Back Button */}
        <button onClick={() => router.back()}>
          Back
        </button>

        {/* ➡️ Summarize Button */}
        <button onClick={() => router.push("/summary")}>
          Summarize
        </button>

      </div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </main>
  );
}