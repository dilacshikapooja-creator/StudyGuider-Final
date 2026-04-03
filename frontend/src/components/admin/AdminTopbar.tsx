import styles from "./AdminTopbar.module.scss";

export default function AdminTopbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search users, notes, reports..." />
      </div>

      <div className={styles.profileBox}>
        <div className={styles.notification}>🔔</div>
        <div className={styles.profile}>
          <div className={styles.avatar}>A</div>
          <div>
            <h4>Admin</h4>
            <p>admin@studyguider.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}