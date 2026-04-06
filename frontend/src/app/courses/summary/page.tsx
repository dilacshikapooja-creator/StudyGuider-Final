// "use client";

// import { useState } from "react";
// import styles from "./summary.module.scss";
// import { useRouter } from "next/navigation";
  
// export default function SmartSummariesPage() {
//   const router = useRouter();

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [translatedText, setTranslatedText] = useState("");
//   const [targetLanguage, setTargetLanguage] = useState("Tamil");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       setMessage("Please upload only PDF files.");
//       setSelectedFile(null);
//       return;
//     }

//     setSelectedFile(file);
//     setMessage("");
//   };

//   const handleGenerateSummary = async () => {
//     if (!selectedFile) {
//       setMessage("Please select a PDF file first.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");
//       setSummary("");

//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       const res = await fetch("http://localhost:5000/api/notes/upload-summary", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to generate summary");
//       }

//       setSummary(data.summary || "No summary received.");
//       setMessage("Summary generated successfully!");
//     } catch (error: any) {
//       setMessage(error.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//    const translateNow = async (language: string) => {
//   try {
//     if (!summary) {
//       alert("No summary available");
//       return;
//     }

//     setLoading(true);

//     const res = await fetch("http://localhost:5000/api/translate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         text: summary,
//         targetLanguage: language,
//       }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setTranslatedText(data.translatedText);
//     } else {
//       alert(data.message || "Translation failed");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };
     

//   return (
//     <section className={styles.summaryPage}>
//       <div className={styles.container}>
//         <div className={styles.leftCard}>
//           <span className={styles.badge}>AI Study Tool</span>
//           <h1>Smart Summaries</h1>
//           <p>
//             Upload your PDF notes and get quick, easy-to-read AI summaries for
//             faster revision and better understanding.
//           </p>

//           <div className={styles.uploadBox}>
//             <label htmlFor="pdfUpload" className={styles.uploadLabel}>
//               Choose PDF
//             </label>
//             <input
//               id="pdfUpload"
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               className={styles.fileInput}
//             />

//             {selectedFile && (
//               <div className={styles.fileInfo}>
//                 <strong>Selected File:</strong> {selectedFile.name}
//               </div>
//             )}
//           </div>

//           <button
//             className={styles.generateBtn}
//             onClick={handleGenerateSummary}
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Generate Summary"}
//           </button>

//           {message && <p className={styles.message}>{message}</p>}
//         </div>

//       <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//   <button
//     onClick={() => translateNow("Tamil")}
//     disabled={loading}
//     style={{
//       padding: "10px 20px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//     }}
//   >
//     Tamil
//   </button>

//   <button
//     onClick={() => translateNow("Sinhala")}
//     disabled={loading}
//     style={{
//       padding: "10px 20px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//     }}
//   >
//     Sinhala
//   </button>

//   <button
//     onClick={() => translateNow("English")}
//     disabled={loading}
//     style={{
//       padding: "10px 20px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//     }}
//   >
//     English
//   </button>

//   <button
//     onClick={() => router.back()}
//     style={{
//       padding: "10px 20px",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer",
//     }}
//   >
//     Back
//   </button>
// </div>
    

//         <div className={styles.rightCard}>
//           <h2>Summary Output</h2>

//           {!summary ? (
//             <div className={styles.placeholder}>
//               <p>Your AI-generated summary will appear here.</p>
//             </div>
//           ) : (
//             <div className={styles.summaryResult}>
//               <p>{summary}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import styles from "./summary.module.scss";
import { useRouter } from "next/navigation";

export default function SmartSummariesPage() {
  const router = useRouter();

  const [sourceText, setSourceText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");

  useEffect(() => {
    const savedSourceText = localStorage.getItem("summarySourceText");
    const savedSourceTitle = localStorage.getItem("summarySourceTitle");

    if (savedSourceText) {
      setSourceText(savedSourceText);
    }

    if (savedSourceTitle) {
      setSourceTitle(savedSourceTitle);
    }
  }, []);

  const handleGenerateSummary = async () => {
    if (!sourceText) {
      setMessage("No content found. Please generate mind map first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setSummary("");
      setTranslatedText("");

      const res = await fetch("http://localhost:5000/api/text-summary/text-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
        }),
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

  const translateNow = async (language: string) => {
    try {
      const textToTranslate = translatedText || summary;

      if (!textToTranslate) {
        alert("No summary available");
        return;
      }

      setLoading(true);

      const res = await fetch("http://localhost:5000/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: summary,
          targetLanguage: language,
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
    <section className={styles.summaryPage}>
      <div className={styles.container}>
        <div className={styles.leftCard}>
          <span className={styles.badge}>AI Study Tool</span>
          <h1>Smart Summaries</h1>
          <p>
            Generate summary from your already-created mind map content without
            uploading the PDF again.
          </p>

          {sourceTitle && (
            <div className={styles.fileInfo}>
              <strong>Source:</strong> {sourceTitle}
            </div>
          )}

          <button
            className={styles.generateBtn}
            onClick={handleGenerateSummary}
            disabled={loading || !sourceText}
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>

          {message && <p className={styles.message}>{message}</p>}

          <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
            <button
              onClick={() => translateNow("Tamil")}
              disabled={loading || !summary}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Tamil
            </button>

            <button
              onClick={() => translateNow("Sinhala")}
              disabled={loading || !summary}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sinhala
            </button>

            <button
              onClick={() => translateNow("English")}
              disabled={loading || !summary}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              English
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
        </div>

        <div className={styles.rightCard}>
          <h2>Summary Output</h2>

          {!summary && !translatedText ? (
            <div className={styles.placeholder}>
              <p>Your AI-generated summary will appear here.</p>
            </div>
          ) : (
            <div className={styles.summaryResult}>
              <p>{translatedText || summary}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}