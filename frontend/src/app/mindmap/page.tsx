"use client";

import { useState } from "react";
import TreeNode, { MindMapNode } from "@/components/mindmap/TreeNode";
import styles from "./mindmap.module.scss";
import { useRouter } from "next/navigation";

type GenerateResponse = {
  message: string;
  title: string;
  sourceText: string;
  originalFileName: string;
  mindMapData: MindMapNode;
};

export default function MindMapPage() {
  const [file, setFile] = useState<File | null>(null);
  const [mindMap, setMindMap] = useState<MindMapNode | null>(null);
  const [sourceText, setSourceText] = useState("");
  const [title, setTitle] = useState("");
  const [originalFileName, setOriginalFileName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleGenerate = async () => {
    if (!file) {
      setMessage("Please choose a PDF file");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5000/api/mindmap/generate", {
        method: "POST",
        body: formData,
      });

      const data: GenerateResponse & { error?: string } = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Generate failed");
        return;
      }

      setMindMap(data.mindMapData);
      setSourceText(data.sourceText);
      setTitle(data.title);
      setOriginalFileName(data.originalFileName);
      setMessage("Mind map generated successfully");
    } catch (error) {
      setMessage("Something went wrong while generating");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!mindMap) {
      setMessage("No generated mind map to save");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/mindmap/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          sourceText,
          originalFileName,
          mindMapData: mindMap,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Save failed");
        return;
      }

      setMessage("Mind map saved successfully");
    } catch (error) {
      setMessage("Something went wrong while saving");
    }
  };

  const goToSummaryPage = () => {
  if (!sourceText) {
    setMessage("Please generate mind map first");
    return;
  }

  localStorage.setItem("summarySourceText", sourceText);
  localStorage.setItem("summarySourceTitle", title || "Mind Map Content");

  router.push("/courses/summary");
};

  const handleRegenerate = async () => {
    if (!sourceText) {
      setMessage("No source text found");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/mindmap/regenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceText,
          mode: "exam",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Regenerate failed");
        return;
      }

      setMindMap(data.mindMapData);
      setTitle(data.title);
      setMessage("Mind map regenerated successfully");
    } catch (error) {
      setMessage("Something went wrong while regenerating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Generate Mind Map</h1>
        <p className={styles.subtitle}>
          Upload a PDF, generate a Gemini mind map, save it, and regenerate it.
        </p>

        <div className={styles.uploadBox}>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Mind Map"}
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={handleSave}
            disabled={!mindMap || loading}
          >
            Save Mind Map
          </button>

          <button
            className={styles.outlineBtn}
            onClick={handleRegenerate}
            disabled={!sourceText || loading}
          >
            Regenerate Mind Map
          </button>
        </div>


<div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
  
  {/* Back Button */}
  <button
    onClick={() => router.back()}
    className="btn backBtn"
  >
    ← Back
  </button>

  {/* Summarize Button */}
 <button
  onClick={goToSummaryPage}
  className="btn summarizeBtn"
>
  Summarize
</button>

<button
  onClick={goToSummaryPage}
  className="btn nextBtn"
>
  Next →
</button>

</div>


        {message && <p className={styles.message}>{message}</p>}

        {mindMap && (
          <div className={styles.treeWrapper}>
            <h2 className={styles.mapTitle}>{title || mindMap.title}</h2>
            {originalFileName && (
              <p className={styles.fileName}>Source file: {originalFileName}</p>
            )}

            <div className={styles.treeArea}>
              <ul className={styles.rootList}>
                <TreeNode node={mindMap} />
              </ul>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}