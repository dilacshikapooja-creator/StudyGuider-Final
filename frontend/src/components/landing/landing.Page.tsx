import Image from "next/image";
import styles from "./LandingPage.module.scss";

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Top Offer Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <span>Limited time offer, Build your digital product with style</span>
          <button>Get Started</button>
        </div>
      </div>

      {/* Navbar */}
      <header className={styles.header}>
        <div className={styles.logoWrap}>
          <div className={styles.logoIcon}>SG</div>
          <h2 className={styles.logoText}>Study Guider</h2>
        </div>

        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Courses</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </nav>

        <button className={styles.consultBtn}>Get Started</button>
      </header>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.left}>
          
          <h1>
            It’s Time <br />
            To <span>Boost Up</span> <br />
            Your Studies!
          </h1>

          <p>
            Upload your notes and let AI generate summaries, quizzes, and mind
            maps to make learning easier and smarter.
          </p>

      

          <div className={styles.card}>
            <div>
              <h4>Quiz Progress</h4>
              <p>+125%</p>
            </div>
            <div className={styles.graph}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.shapeOrange}></div>
          <div className={styles.shapeGreen}></div>
          <div className={styles.shapeYellow}></div>
          <div className={styles.arcOne}></div>
          <div className={styles.arcTwo}></div>

          <div className={styles.imageWrap}>
            <Image
              src="/hero-girl.png"
              alt="Student Hero"
              width={520}
              height={700}
              priority
            />
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className={styles.dotCircle}></div>
        <div className={styles.triangle}></div>
        <div className={styles.cross}></div>
        <div className={styles.striped}></div>
      </main>
    </div>
  );
}