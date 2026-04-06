import Link from "next/link";
import styles from "./Sidebar.module.scss";


export default function Sidebar() {
  

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Study Guider</h2>
       <Link href="/mindmap">
      <button className={styles.newCourseBtn}>Start Your Journey</button>
        </Link> 
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
    </aside>
  );
}