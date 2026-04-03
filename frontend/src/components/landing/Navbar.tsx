"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}></div>
        <span>Study Guider</span>
      </div>

      {/* Desktop Nav */}
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/courses">Courses</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      
      {/* Buttons */}
      <div className={styles.actions}>
        <Link href="/login" className={styles.loginBtn}>
          Login
        </Link>
        <Link href="/register" className={styles.signupBtn}>
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div
        className={`${styles.menuIcon} ${menuOpen ? styles.active : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}