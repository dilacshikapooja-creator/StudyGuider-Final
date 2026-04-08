// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./short-notes.module.scss";

// export default function ShortNotesPage() {
//   const router = useRouter();
//   const [summary, setSummary] = useState("");


//   const handleDownload = () => {
//   const content = summary;

//   const blob = new Blob([content], { type: "text/plain" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "short-notes.txt";
//   a.click();

//   URL.revokeObjectURL(url);
// };
//   useEffect(() => {
//     const savedSummary = localStorage.getItem("latestSummary");
//     if (savedSummary) {
//       setSummary(savedSummary);
//     }
    
//   }, []);

  

//   return (
//     <div className={styles.page}>
//       <div className={styles.header}>
//         <h1>Short Notes</h1>
//         <p>Your AI generated short notes will appear here.</p>
//       </div>

//       <div className={styles.card}>
//         {summary ? (
//           <p>{summary}</p>
//         ) : (
//           <p className={styles.empty}>
//             No short notes found. Please generate short notes first.
//           </p>
//         )}
//       </div>

//       <div className={styles.actions}>
//         <button
//           className={styles.backBtn}
//           onClick={() => router.back()}
//         >
//           Back
//         </button>

//         <button
//           className={styles.homeBtn}
//           onClick={() => router.push("/dashboard")}
//         >
//           Go Dashboard
//         </button>
//          <button className={styles.downloadBtn} onClick={handleDownload}>
//     Download
//   </button>

//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./short-notes.module.scss";

export default function ShortNotesPage() {
  const router = useRouter();
  const [shortNotes, setShortNotes] = useState("");

  useEffect(() => {
    const savedSummary =
      localStorage.getItem("latestSummary") ||
      localStorage.getItem("summary") ||
      localStorage.getItem("generatedSummary");

    if (savedSummary) {
      setShortNotes(convertToShortNotes(savedSummary));
    }
  }, []);

  const handleDownload = () => {
    if (!shortNotes) return;

    const blob = new Blob([shortNotes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "short-notes.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const convertToShortNotes = (text: string) => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .filter((line) => line !== "---")
      .map((line) => {
        const cleanLine = line
          .replace(/\*\*/g, "")
          .replace(/^-\s*/, "")
          .trim();

        return `• ${cleanLine}`;
      })
      .join("\n");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Short Notes</h1>
        <p>Your AI generated short notes will appear here.</p>
      </div>

      <div className={styles.card}>
        {shortNotes ? (
          <pre className={styles.notesText}>{shortNotes}</pre>
        ) : (
          <p className={styles.empty}>
            No short notes found. Please generate short notes first.
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          Back
        </button>

        <button
          className={styles.homeBtn}
          onClick={() => router.push("/dashboard")}
        >
          Go Dashboard
        </button>

        <button
          className={styles.downloadBtn}
          onClick={handleDownload}
          disabled={!shortNotes}
        >
          Download
        </button>
      </div>
    </div>
  );
}