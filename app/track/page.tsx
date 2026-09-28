"use client";
import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    // نتيجة تجريبية للبحث
    if (orderId.trim()) {
      setSearchResult({
        id: orderId,
        status: "قيد المعالجة",
        studentName: "أحمد المحمد",
        type: "بكالوريا - الفرع العلمي",
        date: "2026/09/28"
      });
    } else {
      setSearchResult(null);
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#07090E",
      color: "#F8FAFC",
      fontFamily: "system-ui, -apple-system, sans-serif",
      direction: "rtl",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* الهيدر */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 2rem",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        backgroundColor: "rgba(7, 9, 14, 0.8)",
        backdropFilter: "blur(10px)"
      }}>
        <Link href="/" style={{ fontSize: "1.6rem", fontWeight: "900", color: "#F8FAFC", textDecoration: "none" }}>
          SIKE
        </Link>
        <Link href="/" style={{
          padding: "8px 16px",
          borderRadius: "8px",
          border: "1px solid #334155",
          color: "#F8FAFC",
          textDecoration: "none",
          fontSize: "0.85rem"
        }}>
          الرئيسية
        </Link>
      </header>

      {/* نموذج البحث */}
      <section style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "2rem"
        }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: "bold", textAlign: "center", marginBottom: "0.5rem" }}>
            تتبع حالة الطلب 🔍
          </h1>
          <p style={{ color: "#64748B", fontSize: "0.85rem", textAlign: "center", marginBottom: "1.8rem" }}>
            أدخل رقم الطلب الخاص بك لمتابعة مستجدات المعالجة مباشرة.
          </p>

          <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              placeholder="رقم الطلب (مثال: SIKE-2027-000001)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#F8FAFC",
                fontSize: "0.9rem",
                boxSizing: "border-box",
                direction: "ltr",
                textAlign: "right"
              }}
            />

            <button type="submit" style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#F8FAFC",
              color: "#07090E",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              fontSize: "0.95rem"
            }}>
              استعلام
            </button>
          </form>

          {/* نتيجة البحث */}
          {searched && searchResult && (
            <div style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
              fontSize: "0.9rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748B" }}>اسم الطالب:</span>
                <span style={{ fontWeight: "bold" }}>{searchResult.studentName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748B" }}>نوع الطلب:</span>
                <span>{searchResult.type}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748B" }}>تاريخ التقديم:</span>
                <span>{searchResult.date}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                <span style={{ color: "#64748B" }}>الحالة الحالية:</span>
                <span style={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(234, 179, 8, 0.15)",
                  color: "#eab308",
                  fontWeight: "bold",
                  fontSize: "0.85rem"
                }}>
                  ● {searchResult.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer style={{ padding: "1.5rem", textAlign: "center", color: "#64748B", fontSize: "0.8rem" }}>
        © SIKE 2027–2028 | جميع الحقوق محفوظة
      </footer>
    </main>
  );
}
