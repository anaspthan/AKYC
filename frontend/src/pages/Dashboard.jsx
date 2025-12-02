import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await axios.get('/api/analytics/dashboard')
      if (response.data.success) {
        setStats(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <div className="loading" style={{ width: '60px', height: '60px', margin: '0 auto' }}></div>
        <p style={{ marginTop: '20px', color: 'var(--text-light)' }}>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <h1 style={{ marginBottom: '32px' }}>Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div className="card">
          <h3 style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '8px' }}>
            Total Verifications
          </h3>
          <p style={{ fontSize: '36px', fontWeight: '700', color: 'var(--primary)' }}>
            {stats?.total || 0}
          </p>
        </div>

        <div className="card">
          <h3 style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '8px' }}>
            Success Rate
          </h3>
          <p style={{ fontSize: '36px', fontWeight: '700', color: 'var(--success)' }}>
            {stats?.successRate || 0}%
          </p>
        </div>

        <div className="card">
          <h3 style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '8px' }}>
            Last 24h
          </h3>
          <p style={{ fontSize: '36px', fontWeight: '700' }}>
            {stats?.last24h || 0}
          </p>
        </div>

        <div className="card">
          <h3 style={{ color: 'var(--text-light)', fontSize: '14px', marginBottom: '8px' }}>
            Avg. Time
          </h3>
          <p style={{ fontSize: '36px', fontWeight: '700' }}>
            {stats?.avgCompletionTime || 0}s
          </p>
        </div>
      </div>

      {/* Status Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '40px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--success)', marginBottom: '8px' }}>Accepted</h4>
          <p style={{ fontSize: '28px', fontWeight: '700' }}>{stats?.accepted || 0}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--error)', marginBottom: '8px' }}>Declined</h4>
          <p style={{ fontSize: '28px', fontWeight: '700' }}>{stats?.declined || 0}</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: 'var(--warning)', marginBottom: '8px' }}>Pending</h4>
          <p style={{ fontSize: '28px', fontWeight: '700' }}>{stats?.pending || 0}</p>
        </div>
      </div>

      {/* By Country */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Top Countries</h2>
          {stats?.byCountry && stats.byCountry.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.byCountry.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '8px',
                  background: 'var(--bg)',
                  borderRadius: '4px'
                }}>
                  <span style={{ fontWeight: '500' }}>{item.country}</span>
                  <span style={{ color: 'var(--text-light)' }}>{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)' }}>No data yet</p>
          )}
        </div>

        {/* By Language */}
        <div className="card">
          <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>Languages</h2>
          {stats?.byLanguage && stats.byLanguage.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.byLanguage.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '8px',
                  background: 'var(--bg)',
                  borderRadius: '4px'
                }}>
                  <span style={{ fontWeight: '500' }}>{item.language}</span>
                  <span style={{ color: 'var(--text-light)' }}>{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)' }}>No data yet</p>
          )}
        </div>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={fetchDashboard}
        style={{ marginTop: '24px' }}
      >
        Refresh Data
      </button>
    </div>
  )
}
