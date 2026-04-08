"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/adminsidebar";
import { API_URL } from "@/lib/api";
import styles from "./notes.module.scss";

type Note = {
  _id: string;
  title: string;
  subject: string;
  content: string;
  user?: {
    name: string;
    email: string;
  };
};

export default function AdminNotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/admin/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch notes");
      }

      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

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

    fetchNotes();
  }, [router]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/admin/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        fetchNotes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />

      <main className={styles.main}>
        <h1 className={styles.title}>Manage Notes</h1>

        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>User</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {notes.map((note) => (
                <tr key={note._id}>
                  <td>{note.title}</td>
                  <td>{note.subject}</td>
                  <td>{note.user?.name || "N/A"}</td>
                  <td>{note.user?.email || "N/A"}</td>
                  <td>
                    <button onClick={() => handleDelete(note._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}