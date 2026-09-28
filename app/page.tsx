import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#07090E', // اللون الأساسي المعتمد في الهوية
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      direction: 'rtl',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header / الهيدر الرسمي */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(7, 9, 14, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '1px', color: '#F8FAFC' }}>
            SIKE
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 'bold' }}>
            2027–2028
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '20px', fontSize: '0.95rem' }}>
          <Link href="/services" style={{ color: '#94A3B8', textDecoration: 'none' }}>الخدمات</Link>
          <Link href="/track" style={{ color: '#94A3B8', textDecoration: 'none' }}>تتبع الطلب</Link>
          <Link href="/prices" style={{ color: '#94A3B8', textDecoration: 'none' }}>الأسعار</Link>
        </nav>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/login" style={{
            padding: '8px 18px',
            borderRadius: '8px',
            border: '1px solid #334155',
            color: '#F8FAFC',
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}>
            دخول
          </Link>
        </div>
      </header>

      {/* Hero Section / الواجهة الرئيسية */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem'
      }}>
        <div style={{
          padding: '6px 16px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          color: '#64748B',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          fontWeight: 'bold'
        }}>
          SIKE 2027–2028
        </div>

        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          lineHeight: '1.3',
          maxWidth: '800px',
          color: '#F8FAFC',
          marginBottom: '1.5rem'
        }}>
          منصة مساعدة للطلاب بشكل آمن ورسمي 100%
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: '#64748B',
          maxWidth: '600px',
          lineHeight: '1.7',
          marginBottom: '2.5rem'
        }}>
          خدمات مخصصة لطلاب البكالوريا والتاسع لتسهيل تقديم الطلبات ومتابعتها عبر نظام رقمي مشفر ومباشر.
        </p>

        {/* أزرار العمليات الرئيسية */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/register" style={{
            padding: '14px 32px',
            borderRadius: '10px',
            backgroundColor: '#F8FAFC',
            color: '#07090E',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1rem'
          }}>
            ابدأ طلبك الآن
          </Link>

          <Link href="/track" style={{
            padding: '14px 32px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#F8FAFC',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}>
            تتبع طلبك
          </Link>
        </div>

        {/* العدادات الحقيقية المبسطة */}
        <div style={{
          display: 'flex',
          gap: '40px',
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#F8FAFC' }}>+1,250</div>
            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>طالب مشترك</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
              37
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>متصل الآن</div>
          </div>
        </div>
      </section>

      {/* Footer / الفوتر */}
      <footer style={{
        padding: '1.5rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#64748B',
        fontSize: '0.85rem'
      }}>
        © SIKE 2027–2028 | جميع الحقوق محفوظة
      </footer>
    </main>
  );
}
