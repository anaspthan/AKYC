import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function Result() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('reference')
  
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)

  useEffect(() => {
    if (reference) {
      checkStatus()
    }
  }, [reference])

  const checkStatus = async () => {
    try {
      const response = await axios.get(`/api/kyc/status/${reference}`)
      
      if (response.data.success) {
        setStatus(response.data.status)
        setData(response.data.data)
      }
    } catch (error) {
      setStatus('error')
    }
  }

  if (!reference) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Invalid Request</h1>
        <p>No verification reference provided</p>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '40px auto' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        {status === 'loading' && (
          <>
            <div className="loading" style={{ width: '60px', height: '60px', margin: '0 auto 20px' }}></div>
            <h2>Checking verification status...</h2>
          </>
        )}

        {status === 'accepted' && (
          <>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>✅</div>
            <h1 style={{ color: 'var(--success)', marginBottom: '8px' }}>Verification Successful!</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '18px' }}>
              Your identity has been verified successfully.
            </p>
            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              background: 'var(--bg)', 
              borderRadius: 'var(--radius)',
              textAlign: 'left'
            }}>
              <p><strong>Reference:</strong> {reference}</p>
              {data?.email && <p><strong>Email:</strong> {data.email}</p>}
              {data?.country && <p><strong>Country:</strong> {data.country}</p>}
            </div>
          </>
        )}

        {status === 'declined' && (
          <>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>❌</div>
            <h1 style={{ color: 'var(--error)', marginBottom: '8px' }}>Verification Failed</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '18px', marginBottom: '16px' }}>
              We couldn't verify your identity.
            </p>
            {data?.declined_reason && (
              <div style={{ 
                padding: '16px', 
                background: '#fee2e2', 
                color: '#991b1b',
                borderRadius: 'var(--radius)',
                marginBottom: '16px'
              }}>
                <strong>Reason:</strong> {data.declined_reason}
              </div>
            )}
            <button className="btn btn-primary" onClick={() => window.location.href = '/kyc'}>
              Try Again
            </button>
          </>
        )}

        {status === 'pending' && (
          <>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>⏳</div>
            <h1 style={{ color: 'var(--warning)', marginBottom: '8px' }}>Verification Pending</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '18px' }}>
              Your verification is being processed. This usually takes a few minutes.
            </p>
            <button 
              className="btn btn-outline" 
              onClick={checkStatus}
              style={{ marginTop: '24px' }}
            >
              Check Again
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>⚠️</div>
            <h1 style={{ marginBottom: '8px' }}>Something Went Wrong</h1>
            <p style={{ color: 'var(--text-light)' }}>
              Please contact support with reference: <code>{reference}</code>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
