"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./adminsidebar.module.scss";

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Study Guider</h2>
      <p className={styles.adminText}>Admin Panel</p>

      <nav className={styles.nav}>
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/users">Users</Link>
        <Link href="/admin/notes">Notes</Link>
      </nav>

      <button onClick={handleLogout} className={styles.logoutBtn}>
        Logout
      </button>
    </aside>
  );
}