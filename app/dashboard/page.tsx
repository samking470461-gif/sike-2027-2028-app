import Link from "next/link";

export default function DashboardPage() {
  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#f8fafc",
      fontFamily: "system-ui, -apple-system, sans-serif",
      direction: "rtl"
    }}>
      {/* الشريط العلوي */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#1e293b",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#38bdf8", margin: 0 }}>
          لوحة التحكم | SIKE
        </h1>
        <Link href="/" style={{
          padding: "8px 16px",
          backgroundColor: "#ef4444",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: "bold"
        }}>
          تسجيل الخروج
        </Link>
      </header>

      {/* المحتوى الرئيسي */}
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", color: "#f8fafc" }}>
          مرحباً بك في المنصة 👋
        </h2>

        {/* كروت الإحصائيات والمعلومات */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}>
          <div style={{
            padding: "1.5rem",
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}>
            <h3 style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "0.5rem" }}>حالة الحساب</h3>
            <p style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#22c55e", margin: 0 }}>نشط ✅</p>
          </div>

          <div style={{
            padding: "1.5rem",
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}>
            <h3 style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "0.5rem" }}>الخدمات المتاحة</h3>
            <p style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#38bdf8", margin: 0 }}>جميع الخصائص</p>
          </div>

          <div style={{
            padding: "1.5rem",
            backgroundColor: "#1e293b",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}>
            <h3 style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: "0.5rem" }}>الإشعارات</h3>
            <p style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#f59e0b", margin: 0 }}>لا يوجد جديد</p>
          </div>
        </div>
      </div>
    </main>
  );
}
