"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateOrderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    certificate: "baccalaureate", // baccalaureate | ninth
    branch: "scientific",         // scientific | literary
    curriculum: "idlib",          // idlib | damascus
    serviceType: "regular",       // regular | rechecking
    subjectMode: "single",        // single | all
    subjectName: "",
    fullName: "",
    phone: "",
    telegram: "",
    whatsapp: "",
    notes: ""
  });

  const [orderCreated, setOrderCreated] = useState<string | null>(null);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // توليد رقم طلب فريد يحمل الهوية الرسمية
    const generatedId = `SIKE-2027-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCreated(generatedId);
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

      {/* نموذج تقديم الطلب */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '650px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '2.5rem 2rem'
        }}>
          {!orderCreated ? (
            <>
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 'bold' }}>
                  الخطوة {step} من 4
                </span>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#F8FAFC' }}>
                  تقديم طلب جديد
                </h1>
              </div>

              <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                {/* الخطوة 1: اختيار الشهادة والفرع */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94A3B8', fontSize: '0.95rem' }}>
                        1. اختر الشهادة:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, certificate: 'baccalaureate' })}
                          style={{
                            padding: '14px',
                            borderRadius: '8px',
                            border: formData.certificate === 'baccalaureate' ? '1px solid #F8FAFC' : '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: formData.certificate === 'baccalaureate' ? 'rgba(255, 255, 255, 0.08)' : '#07090E',
                            color: '#F8FAFC',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          البكالوريا
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, certificate: 'ninth' })}
                          style={{
                            padding: '14px',
                            borderRadius: '8px',
                            border: formData.certificate === 'ninth' ? '1px solid #F8FAFC' : '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: formData.certificate === 'ninth' ? 'rgba(255, 255, 255, 0.08)' : '#07090E',
                            color: '#F8FAFC',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          التاسع
                        </button>
                      </div>
                    </div>

                    {formData.certificate === 'baccalaureate' && (
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94A3B8', fontSize: '0.95rem' }}>
                          2. اختر الفرع:
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, branch: 'scientific' })}
                            style={{
                              padding: '12px',
                              borderRadius: '8px',
                              border: formData.branch === 'scientific' ? '1px solid #F8FAFC' : '1px solid rgba(255, 255, 255, 0.1)',
                              backgroundColor: formData.branch === 'scientific' ? 'rgba(255, 255, 255, 0.08)' : '#07090E',
                              color: '#F8FAFC',
                              cursor: 'pointer'
                            }}
                          >
                            الفرع العلمي
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, branch: 'literary' })}
                            style={{
                              padding: '12px',
                              borderRadius: '8px',
                              border: formData.branch === 'literary' ? '1px solid #F8FAFC' : '1px solid rgba(255, 255, 255, 0.1)',
                              backgroundColor: formData.branch === 'literary' ? 'rgba(255, 255, 255, 0.08)' : '#07090E',
                              color: '#F8FAFC',
                              cursor: 'pointer'
                            }}
                          >
                            الفرع الأدبي
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* الخطوة 2: المنهاج والخدمة والمادة */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94A3B8', fontSize: '0.95rem' }}>
                        3. اختر المنهاج:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, curriculum: 'idlib' })}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: formData.curriculum === 'idlib' ? '1px solid #F8FAFC' : '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: formData.curriculum === 'idlib' ? 'rgba(255, 255, 255, 0.08)' : '#07090E',
                            color: '#F8FAFC',
                            cursor: 'pointer'
                          }}
                        >
                          منهاج إدلب
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, curriculum: 'damascus' })}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: formData.curriculum === 'damascus' ? '1px solid #F8FAFC' : '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: formData.curriculum === 'damascus' ? 'rgba(255, 255, 255, 0.08)' : '#07090E',
                            color: '#F8FAFC',
                            cursor: 'pointer'
                          }}
                        >
                          منهاج دمشق
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.8rem', color: '#94A3B8', fontSize: '0.95rem' }}>
                        4. نطاق المواد المطلوب:
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, subjectMode: 'single' })}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: formData.subjectMode === 'single' ? '1px solid #F8FAFC' : '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: formData.subjectMode === 'single' ? 'rgba(255, 255, 255, 0.08)' : '#07090E',
                            color: '#F8FAFC',
                            cursor: 'pointer'
                          }}
                        >
                          مادة واحدة
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, subjectMode: 'all' })}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: formData.subjectMode === 'all' ? '1px solid #F8FAFC' : '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: formData.subjectMode === 'all' ? 'rgba(255, 255, 255, 0.08)' : '#07090E',
                            color: '#F8FAFC',
                            cursor: 'pointer'
                          }}
                        >
                          جميع المواد
                        </button>
                      </div>
                    </div>

                    {formData.subjectMode === 'single' && (
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94A3B8', fontSize: '0.95rem' }}>
                          اسم المادة:
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subjectName}
                          onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                          placeholder="اكتب اسم المادة المطلوب متابعتها"
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            backgroundColor: '#07090E',
                            color: '#F8FAFC',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* الخطوة 3: بيانات التواصل مع الطالب */}
                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94A3B8', fontSize: '0.9rem' }}>الاسم الكامل</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="اسم الطالب الثلاثي"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: '#07090E', color: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94A3B8', fontSize: '0.9rem' }}>رقم الهاتف</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+963..."
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: '#07090E', color: '#fff', boxSizing: 'border-box', direction: 'ltr', textAlign: 'right' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94A3B8', fontSize: '0.9rem' }}>Telegram</label>
                        <input
                          type="text"
                          value={formData.telegram}
                          onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                          placeholder="@username"
                          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: '#07090E', color: '#fff', boxSizing: 'border-box', direction: 'ltr', textAlign: 'right' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94A3B8', fontSize: '0.9rem' }}>WhatsApp</label>
                        <input
                          type="text"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="+963..."
                          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', backgroundColor: '#07090E', color: '#fff', boxSizing: 'border-box', direction: 'ltr', textAlign: 'right' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* الخطوة 4: المراجعة والتأكيد */}
                {step === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ padding: '1.2rem', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>تفاصيل الطلب النهائي:</p>
                      <p><strong>الشهادة:</strong> {formData.certificate === 'baccalaureate' ? 'بكالوريا' : 'تاسع'}</p>
                      {formData.certificate === 'baccalaureate' && <p><strong>الفرع:</strong> {formData.branch === 'scientific' ? 'علمي' : 'أدبي'}</p>}
                      <p><strong>المنهاج:</strong> {formData.curriculum === 'idlib' ? 'إدلب' : 'دمشق'}</p>
                      <p><strong>النطاق:</strong> {formData.subjectMode === 'single' ? `مادة واحدة (${formData.subjectName})` : 'جميع المواد'}</p>
                      <p><strong>الاسم:</strong> {formData.fullName}</p>
                      <p><strong>الهاتف:</strong> {formData.phone}</p>
                    </div>

                    <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: '1.5' }}>
                      * بمجرد إرسال الطلب، سيتم إصدار رقم فريد لتتبع المعالجة من لوحة الإدارة.
                    </p>
                  </div>
                )}

                {/* أزرار التنقل */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'transparent', color: '#F8FAFC', cursor: 'pointer' }}
                    >
                      السابق
                    </button>
                  ) : <div></div>}

                  <button
                    type="submit"
                    style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: '#F8FAFC', color: '#07090E', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                  >
                    {step === 4 ? 'تأكيد وإرسال الطلب' : 'التالي'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* الشاشة النهائية عند إرسال الطلب بنجاح */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#F8FAFC', marginBottom: '0.5rem' }}>
                تم إرسال طلبك بنجاح
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                احتفظ برقم الطلب التالي لمتابعة الحالة أونلاين:
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '1px', color: '#38bdf8', direction: 'ltr', marginBottom: '2rem' }}>
                {orderCreated}
              </div>
              <Link href="/track" style={{ padding: '12px 28px', backgroundColor: '#F8FAFC', color: '#07090E', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
                الانتقال لصفحة تتبع الطلب
              </Link>
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
