import Link from "next/link";
import styles from "./Sidebar.module.scss";


export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Study Guider</h2>

      <button className={styles.newCourseBtn}>Start Your Journey</button>

      <nav className={styles.nav}>
        <Link href="/dashboard" className={`${styles.navLink} ${styles.active}`}>
          Dashboard
        </Link>
        <Link href="/memory" className={styles.navLink}>
          Memory
        </Link>
        <Link href="/community" className={styles.navLink}>
          Community
        </Link>
        <Link href="/notifications" className={styles.navLink}>
          Notifications
        </Link>
        <Link href="/settings" className={styles.navLink}>
          Plan & Settings
        </Link>
      </nav>

      
      <div className={styles.profileBox}>
        <div className={styles.avatar}>N</div>
        <div>
          <p className={styles.name}></p>
          <p className={styles.email}>student@gmail.com</p>
        </div>
      </div>
    </aside>
  );
}