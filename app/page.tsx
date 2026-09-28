import Link from "next/link";

export default function DashboardPage() {
  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#07090E",
      color: "#F8FAFC",
      fontFamily: "system-ui, -apple-system, sans-serif",
      direction: "rtl"
    }}>
      {/* الشريط العلوي */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 2rem",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "#F8FAFC" }}>SIKE</span>
          <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: "bold" }}>لوحة التحكم | 2027–2028</span>
        </div>

        <Link href="/" style={{
          padding: "8px 18px",
          backgroundColor: "#ef4444",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontWeight: "bold"
        }}>
          تسجيل الخروج
        </Link>
      </header>

      {/* المحتوى الرئيسي */}
      <div style={{ padding: "2.5rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#F8FAFC", margin: 0 }}>
            مرحباً بك، المالك (Owner) 👋
          </h2>
          <span style={{ padding: "6px 14px", borderRadius: "20px", backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e", fontSize: "0.85rem", fontWeight: "bold" }}>
            ● النظام متصل حي (Realtime)
          </span>
        </div>

        {/* إحصائيات العدادات */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          <div style={{ padding: "1.5rem", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <h3 style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "0.5rem" }}>إجمالي الطلاب المشتركين</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#F8FAFC", margin: 0 }}>1,250</p>
          </div>

          <div style={{ padding: "1.5rem", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <h3 style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "0.5rem" }}>الطلاب المتصلون الآن</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#22c55e", margin: 0 }}>37</p>
          </div>

          <div style={{ padding: "1.5rem", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <h3 style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "0.5rem" }}>الطلبات الجديدة</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#eab308", margin: 0 }}>12</p>
          </div>

          <div style={{ padding: "1.5rem", backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <h3 style={{ color: "#64748B", fontSize: "0.85rem", marginBottom: "0.5rem" }}>الطلبات المكتملة</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#38bdf8", margin: 0 }}>480</p>
          </div>
        </div>

        {/* جدول الطلبات الأخيرة */}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1.2rem", color: "#F8FAFC" }}>
            آخر الطلبات الواردة
          </h3>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#64748B" }}>
                  <th style={{ padding: "12px" }}>رقم الطلب</th>
                  <th style={{ padding: "12px" }}>الشهادة / الفرع</th>
                  <th style={{ padding: "12px" }}>اسم الطالب</th>
                  <th style={{ padding: "12px" }}>الحالة</th>
                  <th style={{ padding: "12px" }}>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                  <td style={{ padding: "12px", fontWeight: "bold", color: "#38bdf8", direction: "ltr", textAlign: "right" }}>SIKE-2027-000001</td>
                  <td style={{ padding: "12px" }}>بكالوريا - علمي (إدلب)</td>
                  <td style={{ padding: "12px" }}>أحمد المحمد</td>
                  <td style={{ padding: "12px", color: "#eab308", fontWeight: "bold" }}>جديد</td>
                  <td style={{ padding: "12px" }}>
                    <button style={{ padding: "6px 12px", backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}>معالجة</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
