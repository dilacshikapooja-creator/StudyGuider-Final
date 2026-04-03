import styles from "./ActivityTable.module.scss";

type Activity = {
  id: number;
  user: string;
  action: string;
  type: string;
  date: string;
  status: string;
};

type ActivityTableProps = {
  activities: Activity[];
};

export default function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Recent Activities</h3>
        <button>View All</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item) => (
              <tr key={item.id}>
                <td>{item.user}</td>
                <td>{item.action}</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      item.status === "Completed"
                        ? styles.completed
                        : styles.pending
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}