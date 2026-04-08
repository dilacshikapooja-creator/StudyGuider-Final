"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./login.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function LoginPage() {
    const router = useRouter();
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Login successful");
          toast.success("Login successful!");

                router.push("/dashboard");

      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
          <div className={styles.socialButtons}>
        <button
          type="button"
          className={styles.socialBtn}
          onClick={() =>
            (window.location.href = "http://localhost:5000/api/auth/google")
          }
        >
          <span className={styles.icon}>G</span>
          Continue with Google
        </button>

          <button type="button" className={styles.socialBtn}>
          <span className={styles.icon}></span>
          Continue with Apple
        </button>
      </div>

      <div className={styles.divider}>
        <span>OR</span>
      </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <p className={styles.bottomText}>
          Don’t have an account? <Link href="/register">Sign Up</Link>
        </p>
      </section>
    </main>
  );
}