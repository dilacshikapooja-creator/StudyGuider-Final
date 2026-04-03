import Link from "next/link";
import styles from "./emailVerification.module.scss";

export default function EmailVerificationPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <div className={styles.logoIcon}>SG</div>
          <h2>Study Guider</h2>
        </div>

        <h3>We sent a link to your email.</h3>
        <p>Please verify your email to continue.</p>

        <Link href="/login" className={styles.loginLink}>
          Didn&apos;t receive a link? Please log in again
        </Link>
      </div>

      <div className={styles.topShapes}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}