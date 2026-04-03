"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function GoogleSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    }
  }, []);

  return <p>Logging in...</p>;
}