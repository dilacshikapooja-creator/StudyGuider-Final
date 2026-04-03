import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <span className={styles.tag}>Smart Learning Platform</span>

        <h1>
          It’s Time To <span>Boost Up</span> Your Study Skills!
        </h1>

        <p>
          Study Guider helps students upload notes, generate summaries,
          create quizzes, and build mind maps for faster learning and
          better exam preparation.
        </p>

        <div className={styles.buttons}>
          <button className={styles.primaryBtn}>Get Started</button>
          <button className={styles.secondaryBtn}>Watch Demo</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.card}>
            <h3>10K+</h3>
            <p>Notes Analyzed</p>
          </div>
          <div className={styles.card}>
            <h3>95%</h3>
            <p>Student Satisfaction</p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.bgCircle}></div>
        <div className={styles.orangeShape}></div>
        <div className={styles.yellowShape}></div>

        <div className={styles.imageCard}>
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop"
            alt="Student learning"
          />
        </div>
      </div>  
    </section>
  );
}