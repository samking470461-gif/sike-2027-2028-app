export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      backgroundColor: '#0f172a', 
      color: '#f8fafc', 
      direction: 'rtl',
      padding: '20px'
    }}>
      <div style={{ 
        textAlign: 'center', 
        maxWidth: '650px',
        padding: '3rem 2rem', 
        border: '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '20px', 
        background: '#1e293b',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
      }}>
        <h1 style={{ 
          color: '#38bdf8', 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          marginBottom: '1.2rem' 
        }}>
          أهلاً بكم في منصة SIKE 2027–2028
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#94a3b8',
          lineHeight: '1.7',
          marginBottom: '2.5rem'
        }}>
          الموقع الرسمي للمنصة يعمل الآن بنجاح ومربوط بالكامل. نسعد بوجودكم معنا ونعمل على تقديم أفضل الخدمات لكم.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            تصفح الخدمات
          </button>
          
          <button style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#38bdf8',
            border: '1px solid #0284c7',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            تواصل معنا
          </button>
        </div>
      </div>
    </main>
  );
}
