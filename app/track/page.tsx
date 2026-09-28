"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearched(true);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#07090E',
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      direction: 'rtl',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* الهيدر */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#F8FAFC' }}>SIKE</span>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 'bold' }}>2027–2028</span>
        </Link>
        <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>الرئيسية</Link>
      </header>

      {/* نموذج البحث وتتبع الطلب */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '550px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '2.5rem 2rem'
        }}>
          <h1 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#F8FAFC' }}>
            تتبع حالة الطلب
          </h1>
          <p style={{ textAlign: 'center', color: '#64748B', fontSize: '0.95rem', marginBottom: '2rem' }}>
            أدخل رقم الطلب الخاص بك لمتابعة التحديثات وحالة المعالجة
          </p>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="مثال: SIKE-2027-000001"
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#07090E',
                color: '#F8FAFC',
                fontSize: '0.95rem',
                direction: 'ltr',
                textAlign: 'center'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#F8FAFC',
                color: '#07090E',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              بحث
            </button>
          </form>

          {/* نتيجة تجريبية تظهر عند البحث */}
          {searched && (
            <div style={{
              padding: '1.5rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#64748B', fontSize: '0.85rem' }}>رقم الطلب:</span>
                <span style={{ fontWeight: 'bold', color: '#F8FAFC', direction: 'ltr' }}>{orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#64748B', fontSize: '0.85rem' }}>حالة الطلب:</span>
                <span style={{ color: '#eab308', fontWeight: 'bold', fontSize: '0.9rem' }}>● قيد المراجعة</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: '0.85rem' }}>تاريخ الطلب:</span>
                <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>اليوم</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', color: '#64748B', fontSize: '0.85rem' }}>
        © SIKE 2027–2028 | جميع الحقوق محفوظة
      </footer>
    </main>
  );
}
