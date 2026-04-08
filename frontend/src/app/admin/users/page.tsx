"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/adminsidebar";
import { API_URL } from "@/lib/api";
import styles from "./users.module.scss";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data);
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

    fetchUsers();
  }, [router]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <AdminSidebar />

      <main className={styles.main}>
        <h1 className={styles.title}>Manage Users</h1>

        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
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