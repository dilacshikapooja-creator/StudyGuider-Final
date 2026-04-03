import styles from "./QuickActions.module.scss";

export default function QuickActions() {
  return (
    <div className={styles.wrapper}>
      <h3>Quick Actions</h3>

      <div className={styles.actions}>
        <button>Add Admin</button>
        <button>View Reports</button>
        <button>Manage Users</button>
        <button>Review Notes</button>
      </div>

      <div className={styles.infoCard}>
        <h4>System Status</h4>
        <p>All AI tools and uploads are working normally.</p>
      </div>
    </div>
  );
}