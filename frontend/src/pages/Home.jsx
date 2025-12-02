import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
        Video KYC That Actually Works
      </h1>
      <p style={{ fontSize: '24px', color: 'var(--text-light)', marginBottom: '40px' }}>
        Fast • Affordable • Global Coverage
      </p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
        <Link to="/kyc" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
          Start Verification
        </Link>
        <Link to="/dashboard" className="btn btn-outline" style={{ fontSize: '18px', padding: '16px 32px' }}>
          View Dashboard
        </Link>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginTop: '60px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌍</div>
          <h3>Global Coverage</h3>
          <p style={{ color: 'var(--text-light)' }}>
            Works in 200+ countries with 15+ languages
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📱</div>
          <h3>Low Bandwidth</h3>
          <p style={{ color: 'var(--text-light)' }}>
            Optimized for 2G networks - works anywhere
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>💰</div>
          <h3>Affordable</h3>
          <p style={{ color: 'var(--text-light)' }}>
            Starting at $0.99 per verification
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚡</div>
          <h3>45s Average</h3>
          <p style={{ color: 'var(--text-light)' }}>
            Complete verification in under a minute
          </p>
        </div>
      </div>
    </div>
  )
}
