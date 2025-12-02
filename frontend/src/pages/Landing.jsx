import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '56px', marginBottom: '16px', fontWeight: '800' }}>
            Video KYC for $0.99
          </h1>
          <p style={{ fontSize: '24px', marginBottom: '8px', opacity: 0.95 }}>
            Works on 2G • 15 Languages • Crypto & Remittance Ready
          </p>
          <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.85 }}>
            Global coverage. Lightning fast. Built for the real world.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/kyc" 
              className="btn" 
              style={{ 
                background: 'white', 
                color: '#667eea', 
                fontSize: '18px', 
                padding: '16px 40px',
                fontWeight: '700'
              }}
            >
              Start Free Trial
            </Link>
            <a 
              href="#pricing" 
              className="btn btn-outline"
              style={{ 
                borderColor: 'white', 
                color: 'white',
                fontSize: '18px', 
                padding: '16px 40px'
              }}
            >
              View Pricing
            </a>
          </div>

          <p style={{ marginTop: '24px', fontSize: '14px', opacity: 0.8 }}>
            ✓ No credit card required  ✓ 500 free verifications  ✓ Setup in 5 minutes
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="container" style={{ padding: '80px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '40px', marginBottom: '48px' }}>
          Why Choose Us?
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌍</div>
            <h3 style={{ marginBottom: '12px' }}>Global Coverage</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
              Supports 200+ countries with localized flows for USA, UK, Saudi Arabia, Nigeria, Philippines, India, and LATAM.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📶</div>
            <h3 style={{ marginBottom: '12px' }}>Works on 2G</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
              Extreme low-bandwidth mode uses <100kb/s. Perfect for emerging markets and remote areas.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>💰</div>
            <h3 style={{ marginBottom: '12px' }}>1/3 the Price</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
              Starting at $0.99 per verification. Enterprise competitors charge $3-$5. Same quality, better price.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔐</div>
            <h3 style={{ marginBottom: '12px' }}>Crypto Ready</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
              ID + utility bill + liveness detection in under 45 seconds. Perfect for crypto exchanges.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌐</div>
            <h3 style={{ marginBottom: '12px' }}>15 Languages</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
              English, Arabic, Spanish, Hindi, Tagalog, French, Swahili, Portuguese, and more.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚡</div>
            <h3 style={{ marginBottom: '12px' }}>Lightning Fast</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.8' }}>
              Average verification time: 45 seconds. API response time: <200ms. Built for speed.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ background: 'var(--bg)', padding: '80px 20px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '40px', marginBottom: '16px' }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '48px', fontSize: '18px' }}>
            No hidden fees. Cancel anytime.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Pay-as-you-go */}
            <div className="card" style={{ textAlign: 'center', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Pay-as-you-go</h3>
              <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>
                $0.99
              </div>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>per verification</p>
              <ul style={{ textAlign: 'left', listStyle: 'none', marginBottom: '24px' }}>
                <li style={{ padding: '8px 0' }}>✓ Basic verification</li>
                <li style={{ padding: '8px 0' }}>✓ All languages</li>
                <li style={{ padding: '8px 0' }}>✓ Low-bandwidth mode</li>
                <li style={{ padding: '8px 0' }}>✓ API access</li>
              </ul>
              <Link to="/kyc" className="btn btn-outline" style={{ width: '100%' }}>
                Get Started
              </Link>
            </div>

            {/* Crypto Plan */}
            <div className="card" style={{ 
              textAlign: 'center', 
              border: '3px solid var(--primary)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--primary)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                MOST POPULAR
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Crypto Pro</h3>
              <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>
                $1.49
              </div>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>per verification</p>
              <ul style={{ textAlign: 'left', listStyle: 'none', marginBottom: '24px' }}>
                <li style={{ padding: '8px 0' }}>✓ Everything in Basic</li>
                <li style={{ padding: '8px 0' }}>✓ Liveness detection</li>
                <li style={{ padding: '8px 0' }}>✓ Proof of address</li>
                <li style={{ padding: '8px 0' }}>✓ Priority support</li>
              </ul>
              <Link to="/kyc" className="btn btn-primary" style={{ width: '100%' }}>
                Get Started
              </Link>
            </div>

            {/* Agency */}
            <div className="card" style={{ textAlign: 'center', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Agency</h3>
              <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>
                $999
              </div>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>per month</p>
              <ul style={{ textAlign: 'left', listStyle: 'none', marginBottom: '24px' }}>
                <li style={{ padding: '8px 0' }}>✓ Unlimited verifications</li>
                <li style={{ padding: '8px 0' }}>✓ White-label option</li>
                <li style={{ padding: '8px 0' }}>✓ Custom webhooks</li>
                <li style={{ padding: '8px 0' }}>✓ Dedicated support</li>
              </ul>
              <a href="mailto:sales@example.com" className="btn btn-outline" style={{ width: '100%' }}>
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '40px', marginBottom: '16px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '20px', marginBottom: '32px', opacity: 0.9 }}>
            Join 100+ companies using our KYC solution
          </p>
          <Link 
            to="/kyc" 
            className="btn"
            style={{ 
              background: 'white', 
              color: '#667eea',
              fontSize: '18px',
              padding: '16px 48px',
              fontWeight: '700'
            }}
          >
            Start Free Trial →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1f2937', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ opacity: 0.8 }}>
          © 2025 Global KYC. Built with ❤️ for the world.
        </p>
        <p style={{ opacity: 0.6, marginTop: '8px', fontSize: '14px' }}>
          Contact: hello@globalkyc.com
        </p>
      </div>
    </div>
  )
}
