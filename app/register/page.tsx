"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`تم إنشاء الحساب بنجاح لـ: ${name}`);
  };

  return (
    <main style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#f8fafc",
      fontFamily: "system-ui, -apple-system, sans-serif",
      direction: "rtl",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "2.5rem 2rem",
        backgroundColor: "#1e293b",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)"
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#38bdf8",
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "1.5rem"
        }}>
          إنشاء حساب جديد
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#94a3b8" }}>
              الاسم الكامل
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اسمك الكامل"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #334155",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#94a3b8" }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #334155",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", color: "#94a3b8" }}>
              كلمة المرور
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #334155",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#0284c7",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: "0.5rem"
            }}
          >
            تأكيد التسجيل
          </button>
        </form>
      </div>
    </main>
  );
}
