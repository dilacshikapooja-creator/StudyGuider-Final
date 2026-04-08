"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/adminsidebar";
import { API_URL } from "@/lib/api";
import styles from "./dashboard.module.scss";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Note = {
  _id: string;
  title: string;
  subject: string;
  user?: {
    name: string;
    email: string;
  };
};

type AdminStats = {
  totalUsers: number;
  totalAdmins: number;
  totalStudents: number;
  totalNotes: number;
  recentUsers: User[];
  recentNotes: Note[];
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(user);

    if (parsedUser.role !== "admin") {
      router.push("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch stats");
        }

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />

      <main className={styles.main}>
        <h1 className={styles.title}>Admin Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : stats ? (
          <>
            <div className={styles.cardGrid}>
              <div className={styles.card}>
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>

              <div className={styles.card}>
                <h3>Total Students</h3>
                <p>{stats.totalStudents}</p>
              </div>

              <div className={styles.card}>
                <h3>Total Admins</h3>
                <p>{stats.totalAdmins}</p>
              </div>

              <div className={styles.card}>
                <h3>Total Notes</h3>
                <p>{stats.totalNotes}</p>
              </div>
            </div>

            <div className={styles.sectionGrid}>
              <div className={styles.section}>
                <h2>Recent Users</h2>
                <div className={styles.tableWrap}>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentUsers.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.section}>
                <h2>Recent Notes</h2>
                <div className={styles.tableWrap}>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentNotes.map((note) => (
                        <tr key={note._id}>
                          <td>{note.title}</td>
                          <td>{note.subject}</td>
                          <td>{note.user?.name || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No dashboard data found.</p>
        )}
      </main>
    </div>
  );
}