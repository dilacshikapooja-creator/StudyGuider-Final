"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import styles from "./admin.module.scss";

type StatsType = {
  totalUsers: number;
  totalNotes: number;
  totalQuizzes: number;
  activeStudents: number;
};

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type NoteType = {
  _id: string;
  title: string;
  subject: string;
  createdAt: string;
  userId?: {
    name?: string;
    email?: string;
  };
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsType>({
    totalUsers: 0,
    totalNotes: 0,
    totalQuizzes: 0,
    activeStudents: 0,
  });

  const [recentUsers, setRecentUsers] = useState<UserType[]>([]);
  const [recentNotes, setRecentNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("TOKEN:", token);

        const [statsRes, usersRes, notesRes] = await Promise.all([
          api.get("/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/admin/recent-users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/admin/recent-notes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log("Admin Stats:", statsRes.data);
        console.log("Recent Users:", usersRes.data);
        console.log("Recent Notes:", notesRes.data);

        setStats(statsRes.data);
        setRecentUsers(usersRes.data);
        setRecentNotes(notesRes.data);
      } catch (err: any) {
        console.log("FULL ERROR:", err);
        console.log("STATUS:", err?.response?.status);
        console.log("DATA:", err?.response?.data);
        
        setError(err?.response?.data?.message || "Failed to load admin dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <main className={styles.adminDashboard}>
        <div className="container">
          <p>Loading admin dashboard...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.adminDashboard}>
        <div className="container">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.adminDashboard}>
      <div className="container">
        <section className={styles.topbar}>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage students, notes, and Study Guider analytics.</p>
          </div>

          <div className={styles.topActions}>
            <Link href="/admin/users" className={styles.primaryBtn}>
              Manage Users
            </Link>
            <Link href="/admin/notes" className={styles.secondaryBtn}>
              Manage Notes
            </Link>
          </div>
        </section>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Notes</h3>
            <p>{stats.totalNotes}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Quizzes</h3>
            <p>{stats.totalQuizzes}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Active Students</h3>
            <p>{stats.activeStudents}</p>
          </div>
        </section>

        <section className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Recent Users</h2>
                <Link href="/admin/users">View All</Link>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={
                              user.role === "admin"
                                ? styles.adminBadge
                                : styles.studentBadge
                            }
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Recent Notes</h2>
                <Link href="/admin/notes">View All</Link>
              </div>

              <div className={styles.notesList}>
                {recentNotes.map((note) => (
                  <div key={note._id} className={styles.noteItem}>
                    <div>
                      <h3>{note.title}</h3>
                      <p>{note.subject}</p>
                      <span>
                        Uploaded by {note.userId?.name || "Unknown"} •{" "}
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.card}>
              <h2>Quick Actions</h2>
              <div className={styles.actions}>
                <Link href="/admin/users" className={styles.actionBtn}>
                  View Users
                </Link>
                <Link href="/admin/notes" className={styles.actionBtn}>
                  View Notes
                </Link>
                <Link href="/admin/analytics" className={styles.actionBtn}>
                  Analytics
                </Link>
                <button className={styles.actionBtn}>Export Report</button>
              </div>
            </div>

            <div className={styles.card}>
              <h2>Analytics Overview</h2>
              <div className={styles.analyticsBox}>
                <div className={styles.analyticsItem}>
                  <span>Total Users</span>
                  <strong>{stats.totalUsers}</strong>
                </div>
                <div className={styles.analyticsItem}>
                  <span>Total Notes</span>
                  <strong>{stats.totalNotes}</strong>
                </div>
                <div className={styles.analyticsItem}>
                  <span>Total Quizzes</span>
                  <strong>{stats.totalQuizzes}</strong>
                </div>
                <div className={styles.analyticsItem}>
                  <span>Active Students</span>
                  <strong>{stats.activeStudents}</strong>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2>System Status</h2>
              <ul className={styles.statusList}>
                <li>AI Summary API: Active</li>
                <li>Quiz Generator: Active</li>
                <li>Mind Map Generator: Active</li>
                <li>Database: Connected</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}