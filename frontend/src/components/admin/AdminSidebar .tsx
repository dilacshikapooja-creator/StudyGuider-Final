import styles from "./AdminSidebar.module.scss";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoBox}>
        <div className={styles.logo}>SG</div>
        <div>
          <h2>Study Guider</h2>
          <p>Admin Panel</p>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/admin/dashboard" className={styles.active}>
          Dashboard
        </Link>
        <Link href="/admin/users">Users</Link>
        <Link href="/admin/notes">Notes</Link>
        <Link href="/admin/quizzes">Quizzes</Link>
        <Link href="/admin/reports">Reports</Link>
        <Link href="/admin/settings">Settings</Link>
      </nav>

      <div className={styles.bottomBox}>
        <button>Logout</button>
      </div>
    </aside>
  );
}