import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
]

const VERIFICATION_TYPES = [
  { value: 'basic', label: 'Basic Verification', price: '$0.99' },
  { value: 'crypto', label: 'Crypto Onboarding', price: '$1.49', recommended: true },
  { value: 'remittance', label: 'Remittance KYC', price: '$1.29' },
]

export default function KYCForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'US',
    language: 'en',
    verificationType: 'crypto'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/kyc/initiate', formData)
      
      if (response.data.success) {
        // Redirect to Shufti Pro verification URL
        window.location.href = response.data.verificationUrl
      } else {
        setError(response.data.message || 'Failed to initiate verification')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '40px auto' }}>
      <div className="card">
        <h1 style={{ marginBottom: '8px' }}>Start Your Verification</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
          Fast, secure, works on any network speed
        </p>

        {error && (
          <div style={{ 
            padding: '12px', 
            background: '#fee2e2', 
            color: '#991b1b', 
            borderRadius: 'var(--radius)',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Verification Type */}
          <div style={{ marginBottom: '20px' }}>
            <label className="label">Verification Type</label>
            <div style={{ display: 'grid', gap: '12px' }}>
              {VERIFICATION_TYPES.map(type => (
                <label 
                  key={type.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    border: formData.verificationType === type.value 
                      ? '2px solid var(--primary)' 
                      : '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <input
                    type="radio"
                    name="verificationType"
                    value={type.value}
                    checked={formData.verificationType === type.value}
                    onChange={handleChange}
                    style={{ marginRight: '12px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong>{type.label}</strong>
                    {type.recommended && (
                      <span style={{
                        marginLeft: '8px',
                        padding: '2px 8px',
                        background: 'var(--primary)',
                        color: 'white',
                        fontSize: '12px',
                        borderRadius: '4px'
                      }}>
                        Recommended
                      </span>
                    )}
                  </div>
                  <span style={{ fontWeight: '600' }}>{type.price}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="input"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label">Phone (optional)</label>
            <input
              type="tel"
              name="phone"
              className="input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="label">Country</label>
            <input
              type="text"
              name="country"
              className="input"
              value={formData.country}
              onChange={handleChange}
              placeholder="US"
              maxLength={2}
              required
            />
            <small style={{ color: 'var(--text-light)' }}>2-letter country code</small>
          </div>

          {/* Language Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label className="label">Preferred Language</label>
            <select
              name="language"
              className="input"
              value={formData.language}
              onChange={handleChange}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', fontSize: '18px' }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span className="loading"></span>
                Initiating...
              </span>
            ) : (
              'Start Verification'
            )}
          </button>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--text-light)' }}>
            🔒 Your data is encrypted and secure
          </p>
        </form>
      </div>
    </div>
  )
}
