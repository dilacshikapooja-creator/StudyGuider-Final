import styles from "./AboutSection.module.scss";

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.tag}>ABOUT STUDY GUIDER</p>
          <h2>
            Learn Smarter With <span>AI Support</span>
          </h2>
          <p className={styles.text}>
            Study Guider is an AI-powered learning platform designed to help
            students study in a smarter and more effective way. Students can
            upload notes and instantly get summaries, quizzes, and mind maps
            for better understanding and faster revision.
          </p>
          <p className={styles.text}>
            Our goal is to make learning simple, engaging, and accessible for
            every student, especially those who need support in organizing their
            study materials and preparing confidently for exams.
          </p>

          <div className={styles.features}>
            <div className={styles.featureCard}>
              <h4>Smart Summaries</h4>
              <p>Convert long notes into short and clear study points.</p>
            </div>

            <div className={styles.featureCard}>
              <h4>Quiz Generation</h4>
              <p>Practice with auto-generated questions from your notes.</p>
            </div>

            <div className={styles.featureCard}>
              <h4>Mind Maps</h4>
              <p>Visualize concepts easily and improve memory retention.</p>
            </div>

            <div className={styles.featureCard}>
              <h4>Better Revision</h4>
              <p>Save time and prepare effectively for exams.</p>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <div className={styles.bgShape}></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Students learning together"
            />
            <div className={styles.infoCard}>
              <h4>Why Students Love It</h4>
              <p>Easy note revision with summaries, quizzes, and mind maps.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}