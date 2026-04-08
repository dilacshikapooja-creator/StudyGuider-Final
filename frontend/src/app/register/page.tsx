"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { toast } from "react-toastify";


export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
console.log("Register response:", data);

if (res.ok) {
  toast.success("🎉 Registration successful!");

  setMessage("Registration successful!");

  setForm({
    name: "",
    email: "",
    password: "",
  });

  setTimeout(() => {
    router.push("/dashboard");
  }, 1500);
} else {
  toast.error(data.message || "Registration failed");
  setMessage(data.message || "Registration failed");
}
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again later.");
      alert("Server error. Please try again later.");
    }
};
  return (
    <main className={styles.page}>
      <div className={styles.gridBg}></div>

      <section className={styles.card}>
        <div className={styles.tabs}>
          <Link href="/login" className={styles.tab}>
            Login
          </Link>
          <button className={`${styles.tab} ${styles.active}`} type="button">
            Sign Up
          </button>
        </div>

       <div className={styles.socialButtons}>
  <button
    type="button"
    className={styles.socialBtn}
    onClick={() => {
      window.location.href = "http://localhost:5000/api/auth/google";
    }}
  >
    <FcGoogle size={18} />
    <span>Continue with Google</span>
  </button>

  <button type="button" className={styles.socialBtn}>
    <FaApple size={18} />
    <span>Continue with Apple</span>
  </button>
</div>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
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
            Create an account
          </button>

          <label className={styles.checkboxRow}>
            <input type="checkbox" />
            <span>
              Please keep me updated by email with the latest news, research
              findings, reward programs, event updates.
            </span>
          </label>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <p className={styles.bottomText}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}