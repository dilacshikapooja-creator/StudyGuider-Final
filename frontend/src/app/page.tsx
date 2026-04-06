"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import AboutSection from "@/components/landing/AboutSection";
import { useEffect, useState } from "react";
import LoginPage from "./login/page";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={styles.page}>
      {/* Navbar */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>SG</div>
          <span>Study Guider</span>
        </div>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/login" className={styles.loginBtn}>
            Login
          </Link>
          <Link href="/register" className={styles.consultBtn}>
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Decorative shapes */}
        <span className={`${styles.shape} ${styles.shapeCross}`}></span>
        <span className={`${styles.shape} ${styles.shapeTriangle}`}></span>
        <span className={`${styles.shape} ${styles.shapeCircle}`}></span>
        <span className={`${styles.shape} ${styles.shapeDots}`}></span>

        <div className={styles.heroContent}>

          <h1>
            It’s Time <br />
            To <span>Boost Up</span> <br />
            Your Studies!
          </h1>

          <p className={styles.description}>
            Study Guider helps students learn smarter by turning notes into
            summaries, quizzes, and mind maps. Save time, improve understanding,
            and prepare better for exams.
          </p>

          <div className={styles.heroButtons}>
            <Link href="/register" className={styles.primaryBtn}>
              Get Started
            </Link>

            <div className={styles.callBox}>
              <span>FOR STUDENTS</span>
              <strong>Learn Smarter Every Day</strong>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.orangeRing}></div>
          <div className={styles.yellowArc}></div>
          <div className={styles.greenCircle}></div>
          <div className={styles.whiteCard}>
            <h4>Study Progress</h4>
            <div className={styles.chartLine}>
              <span></span>
            </div>
            <p>+85% better revision flow</p>
          </div>

          <div className={styles.studentCard}>
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80"
              alt="Student using Study Guider"
            />
          </div>
        </div>
      </section>
      <AboutSection />
    </main>
  );
}