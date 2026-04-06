"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TranslatePage() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Tamil");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          targetLanguage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTranslatedText(data.translatedText);
      } else {
        alert(data.message || "Translation failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Translate Notes</h1>

      <textarea
        rows={10}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginTop: "10px",
        }}
        placeholder="Enter or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: "16px" }}>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="Tamil">Tamil</option>
          <option value="Sinhala">Sinhala</option>
          <option value="English">English</option>
        </select>
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
        <button
          onClick={handleTranslate}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        <button
          onClick={() => router.back()}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>

      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          background: "#f8f8f8",
          borderRadius: "12px",
          whiteSpace: "pre-wrap",
        }}
      >
        <h2>Translated Output</h2>
        <p>{translatedText || "No translation yet"}</p>
      </div>
    </main>
  );
}