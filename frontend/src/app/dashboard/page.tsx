// "use client";

// import Link from "next/link";
// import styles from "./dashboard.module.scss";
// import Sidebar from "@/components/dashboard/Sidebar";
// import { useEffect, useState } from "react";

// export default function DashboardPage() {
//   const stats = [
//     { title: "Total Notes", value: "12" },
//     { title: "Quizzes Attempted", value: "8" },
//     { title: "Average Score", value: "84%" },
//     { title: "Flashcards", value: "36" },
//   ];

//   const activities = [
//     "Uploaded Business Studies note",
//     "Generated Accounting summary",
//     "Completed Marketing quiz",
//     "Created Commerce mind map",
//   ];
//   type Note = {
//     id: number;
//     title: string;
//     subject: string;
//     date: string;
//     summary: string;
//   };

//   const [notes, setNotes] = useState<Note[]>([]);

//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("savedNotes");

//       if (saved) {
//         const parsedNotes: Note[] = JSON.parse(saved);
//         setNotes(parsedNotes);
//       }
//     } catch (error) {
//       console.error("Error loading notes:", error);
//       setNotes([]);
//     }
//   }, []);

//   return (
//     <main className={styles.dashboardPage}>
//       <section className={styles.maincontent}>
//         <header className={styles.header}>
//           <div className={styles.topBanner}>
//             <div>
//               <h1>Welcome back, Student 👋</h1>
//               <p>Ready to continue your studies today?</p>
//             </div>
//           </div>
//         </header>

//         <section className={styles.statsGrid}>
//           {stats.map((item) => (
//             <div key={item.title} className={styles.statCard}>
//               <h3>{item.title}</h3>
//               <p>{item.value}</p>
//             </div>
//           ))}
//         </section>

//         <section className={styles.mainGrid}>
//           <div className={styles.leftColumn}>
//             <div className={styles.card}>
//               <h2>Quick Actions</h2>
//               <div className={styles.actions}>

//                 <Link href="/upload-notes" className={styles.actionBtn}>
//                   View Summary
//                 </Link>
//                 <Link href="quiz/quiz-upload" className={styles.actionBtn}>
//                   Start Quiz
//                 </Link>
//                 <Link href="/mindmap/1" className={styles.actionBtn}>
//                   Open Mind Map
//                 </Link>
//               </div>
//             </div>

//             <div className={styles.card}>
//               <h2>My Notes</h2>
//               <div className={styles.notesList}>
//                 {notes.map((note) => (
//                   <div key={note.id} className={styles.noteItem}>
//                     <div>
//                       <h3>{note.title}</h3>
//                       <p>{note.subject}</p>
//                       <span>{note.date}</span>
//                     </div>

//                     <div className={styles.noteActions}>
//                       <button
//                         onClick={() => {
//                           localStorage.setItem("latestSummary", note.summary);
//                           localStorage.setItem("latestFileName", note.title);
//                           window.location.href = "/viewsummary";
//                         }}
//                       >
//                         Summary
//                       </button>                      <button
//                         onClick={() => {
//                           localStorage.setItem("latestFileName", note.title);
//                           window.location.href = "quiz/quiz-upload";
//                         }}
//                       >
//                         Quiz
//                       </button>
//                       <Link href={`/mindmap/${note.id}`}>Mind Map</Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className={styles.rightColumn}>
//             <div className={styles.card}>
//               <h2>Recent Activity</h2>
//               <ul className={styles.activityList}>
//                 {activities.map((activity, index) => (
//                   <li key={index}>{activity}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className={styles.card}>
//               <h2>Progress Overview</h2>
//               <p className={styles.progressText}>Weekly Goal: 70%</p>
//               <div className={styles.progressBar}>
//                 <div className={styles.progressFill}></div>
//               </div>
//             </div>


//           </div>
//         </section>
//       </section>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Note = {
  id: number;
  title: string;
  subject: string;
  date: string;
  summary: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

type SavedQuiz = {
  id: number;
  title: string;
  date: string;
  score: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  userAnswers: string[];
};

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [quizzes, setQuizzes] = useState<SavedQuiz[]>([]);
  const [filter, setFilter] = useState<"all" | "summary" | "quiz">("all");


  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("savedNotes");
      const savedQuizzes = localStorage.getItem("savedQuizzes");

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }

      if (savedQuizzes) {
        setQuizzes(JSON.parse(savedQuizzes));
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setNotes([]);
      setQuizzes([]);
    }
  }, []);

  const stats = [
    { title: "Total Notes", value: String(notes.length) },
    { title: "Quizzes Attempted", value: String(quizzes.length) },
    { title: "Average Score", value: quizzes.length ? "Good" : "0" },
    { title: "Flashcards", value: "36" },
  ];

  const activities = [
    "Uploaded Business Studies note",
    "Generated Accounting summary",
    "Completed Marketing quiz",
    "Created Commerce mind map",
  ];


  return (
    <main className={styles.dashboardPage}>
      <section className={styles.maincontent}>
        <header className={styles.header}>
          <div className={styles.topBanner}>
            <div>
              <h1>Welcome back, Student 👋</h1>
              <p>Ready to continue your studies today?</p>
            </div>
          </div>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((item) => (
            <div key={item.title} className={styles.statCard}>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </section>

        <section className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.card}>
              <h2>Quick Actions</h2>
              <div className={styles.actions}>
                <Link href="/upload-notes" className={styles.actionBtn}>
                  View Summary
                </Link>

                <Link href="/quiz/quiz-upload" className={styles.actionBtn}>
                  Start Quiz
                </Link>
              </div>
            </div>
            

            <div className={styles.card}>
              <h2>My Saved Content</h2>

              <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button type="button" onClick={() => setFilter("all")}>
                  All
                </button>
                <button type="button" onClick={() => setFilter("summary")}>
                  Summaries
                </button>
                <button type="button" onClick={() => setFilter("quiz")}>
                  Quizzes
                </button>
              </div>

              <div className={styles.notesList}>
                {(filter === "all" || filter === "summary") &&
                  notes.map((note) => (
                    <div key={`note-${note.id}`} className={styles.noteItem}>
                      <div>
                        <h3>{note.title}</h3>
                        <p>{note.subject}</p>
                        <span>{note.date}</span>
                      </div>

                      <div className={styles.noteActions}>
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.setItem("latestSummary", note.summary);
                            localStorage.setItem("latestFileName", note.title);
                            window.location.href = "/viewsummary";
                          }}
                        >
                          Summary
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            localStorage.setItem("latestFileName", note.title);
                            window.location.href = "/quiz/quiz-play";
                          }}
                        >
                          Quiz
                        </button>

                      </div>
                    </div>
                  ))}

                {(filter === "all" || filter === "quiz") &&
                
                  quizzes.map((quiz) => (
                    <div key={quiz.id} className={styles.noteItem}>
                      <div>
                        <h3>{quiz.title}</h3>
                        <p>
                          Quiz Score: {quiz.score}/{quiz.totalQuestions}
                        </p>
                        <span>{quiz.date}</span>
                      </div>

                      <div className={styles.noteActions}>
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.setItem("reviewQuiz", JSON.stringify(quiz));
                            window.location.href = "/quiz/quiz-review";
                          }}
                        >
                          View Quiz
                        </button>
                      </div>
                    </div>
                  ))
                }

                {filter === "summary" && notes.length === 0 && <p>No saved summaries found.</p>}
                {filter === "quiz" && quizzes.length === 0 && <p>No saved quizzes found.</p>}
                {filter === "all" && notes.length === 0 && quizzes.length === 0 && (
                  <p>No saved summaries or quizzes yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.card}>
              <h2>Recent Activity</h2>
              <ul className={styles.activityList}>
                {activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>

            <div className={styles.card}>
              <h2>Progress Overview</h2>
              <p className={styles.progressText}>Weekly Goal: 70%</p>
              <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}