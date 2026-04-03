import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import styles from "./courses.module.scss";

export default function CoursesPage() {
  return (
    <>
      <Navbar />

      <main className={styles.coursesPage}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.tag}>OUR COURSES</p>
            <h1>
              Explore Smart Learning With <span>Study Guider</span>
            </h1>
            <p className={styles.desc}>
              Choose the right course materials and study tools to improve your
              understanding, save time, and prepare better for exams.
            </p>
          </div>
        </section>

        <section className={styles.courseSection}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.card}>
                <div className={styles.icon}>📘</div>
                <h3>Commerce Basics</h3>
                <p>
                  Learn core commerce topics with clear notes, summaries, and
                  smart revision support.
                </p>
                <button>View Course</button>
              </div>

              <div className={styles.card}>
                <div className={styles.icon}>🧠</div>
                <h3>AI Quiz Practice</h3>
                <p>
                  Practice auto-generated quizzes from your uploaded notes and
                  test your understanding faster.
                </p>
                <button>View Course</button>
              </div>

              <div className={styles.card}>
                <div className={styles.icon}>📝</div>
                <h3>Smart Summaries</h3>
                <p>
                  Convert long study materials into quick summary points for
                  easy revision before exams.
                </p>
                <button>View Course</button>
              </div>

              <div className={styles.card}>
                <div className={styles.icon}>🌐</div>
                <h3>Tamil Learning Support</h3>
                <p>
                  Understand lessons better with native language support and
                  student-friendly explanations.
                </p>
                <button>View Course</button>
              </div>

              <div className={styles.card}>
                <div className={styles.icon}>📊</div>
                <h3>Mind Map Learning</h3>
                <p>
                  Visualize difficult concepts through AI-generated mind maps
                  and improve memory retention.
                </p>
                <button>View Course</button>
              </div>

              <div className={styles.card}>
                <div className={styles.icon}>🚀</div>
                <h3>Exam Preparation</h3>
                <p>
                  Get ready for exams with better planning, organized content,
                  and smarter revision methods.
                </p>
                <button>View Course</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}