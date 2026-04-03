import Link from "next/link";
import styles from "./Footer.module.scss";
import { FaPinterest, FaTiktok, FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksGrid}>
          <div className={styles.column}>
            <Link href="/">Home</Link>
            <Link href="/students">Students</Link>
            <Link href="/blog">Blog</Link>
            <section>
            <Link href="/resources">Resources</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            </section>
          </div>
        </div>

        <div className={styles.socials}>
          <a href="#"><FaPinterest /></a>
          <a href="#"><FaTiktok /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
        </div>

      </div>
    </footer>
  );
}