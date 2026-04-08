"use client";

import { useRouter } from "next/navigation";
import styles from "./success.module.scss";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>

        <h1>Success!</h1>
        <p>Your registration is complete</p>

        <button onClick={() => router.push("/login")}>
          Go to Login
        </button>
      </div>
    </div>
  );
}