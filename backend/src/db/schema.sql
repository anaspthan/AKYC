-- KYC Verifications Table
CREATE TABLE IF NOT EXISTS kyc_verifications (
  id SERIAL PRIMARY KEY,
  reference VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  country VARCHAR(2) NOT NULL,
  language VARCHAR(10) DEFAULT 'en',
  verification_type VARCHAR(50) DEFAULT 'basic',
  status VARCHAR(50) DEFAULT 'initiated',
  result_data JSONB,
  declined_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_reference ON kyc_verifications(reference);
CREATE INDEX idx_email ON kyc_verifications(email);
CREATE INDEX idx_status ON kyc_verifications(status);
CREATE INDEX idx_created_at ON kyc_verifications(created_at DESC);
CREATE INDEX idx_country ON kyc_verifications(country);

-- Customers/API Keys Table (for future billing)
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  company_name VARCHAR(255),
  api_key VARCHAR(255) UNIQUE NOT NULL,
  plan VARCHAR(50) DEFAULT 'pay-as-you-go',
  monthly_limit INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Usage tracking for billing
CREATE TABLE IF NOT EXISTS usage_logs (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  verification_reference VARCHAR(255) REFERENCES kyc_verifications(reference),
  cost DECIMAL(10, 4),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_customer_usage ON usage_logs(customer_id, created_at DESC);
