# Global Video KYC Wrapper

Fast, affordable, low-bandwidth Video KYC solution built for global markets.

## 🚀 Features

- **Low-Bandwidth Mode** - Works on 2G networks (<100kb/s)
- **Multi-Language** - 15 languages (English, Arabic, Spanish, Hindi, Tagalog, French, Swahili, Portuguese, Chinese)
- **Crypto-Ready** - ID + liveness + proof of address in <45 seconds
- **Real-Time Analytics** - Dashboard with success rates, countries, languages
- **Affordable** - Starting at $0.99/verification (vs $3-5 from enterprise providers)

## 📋 Tech Stack

**Backend:**
- Node.js + Express
- PostgreSQL
- Shufti Pro API (KYC provider)

**Frontend:**
- React + Vite
- React Router
- Axios

## 🛠️ Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Shufti Pro account (sign up at https://shuftipro.com/partners)

### 1. Clone & Install

```bash
cd kyc
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Shufti Pro (get from https://shuftipro.com/partners)
SHUFTI_CLIENT_ID=your_client_id
SHUFTI_SECRET_KEY=your_secret_key

# Database (local or Railway)
DATABASE_URL=postgresql://user:password@localhost:5432/kyc_db

# URLs
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup

**Option A: Local PostgreSQL**

```bash
# Create database
createdb kyc_db

# Run migration
cd backend
npm run db:migrate
```

**Option B: Railway (Free)**

1. Go to https://railway.app
2. Create new project → PostgreSQL
3. Copy `DATABASE_URL` to your `.env`
4. Run migration: `npm run db:migrate`

### 4. Run Development Servers

```bash
# From root directory
npm run dev
```

This starts:
- Backend on http://localhost:3001
- Frontend on http://localhost:5173

## 📦 Deployment

### Backend (Railway - Free Tier)

1. Push code to GitHub
2. Go to https://railway.app
3. New Project → Deploy from GitHub
4. Select your repo → Deploy `backend` folder
5. Add environment variables from `.env`
6. Railway will auto-deploy on push

### Frontend (Vercel - Free Tier)

1. Go to https://vercel.com
2. New Project → Import from GitHub
3. Root Directory: `frontend`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy!

Update `FRONTEND_URL` and `BACKEND_URL` in Railway env vars.

## 🎯 Usage

### API Endpoints

**POST /api/kyc/initiate**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "country": "US",
  "language": "en",
  "verificationType": "crypto"
}
```

**GET /api/kyc/status/:reference**
Returns verification status.

**GET /api/analytics/dashboard**
Returns real-time stats.

### Webhook

Shufti Pro will POST to `/api/webhook/shufti` with results:
- `verification.accepted`
- `verification.declined`

## 💰 Pricing Model

**Pay-as-you-go:**
- Basic: $0.99/verification
- Crypto: $1.49/verification
- Remittance: $1.29/verification

**Agency Plan:**
- $999/month unlimited

## 📊 Customer Research

See `/research` folder for:
- Outreach scripts
- Discovery call questions
- Customer tracker spreadsheet
- Target lists (crypto, remittance, low-bandwidth)

## 🔐 Security Notes

- All data encrypted in transit (HTTPS)
- PII stored encrypted in database
- SOC 2 compliance inherited from Shufti Pro
- GDPR-compliant data handling

**Before production:**
- [ ] Add rate limiting
- [ ] Add API authentication
- [ ] Get legal review of Terms & Privacy Policy
- [ ] Set up error monitoring (Sentry)
- [ ] Add backup KYC provider (HyperVerge)

## 🐛 Troubleshooting

**Database connection fails:**
```bash
# Test connection
psql $DATABASE_URL
```

**Shufti API returns 401:**
- Check `SHUFTI_CLIENT_ID` and `SHUFTI_SECRET_KEY`
- Verify account is approved (not sandbox)

**Frontend can't reach backend:**
- Check CORS settings in `backend/src/server.js`
- Verify `FRONTEND_URL` matches your frontend URL

## 📈 Roadmap

**Week 1-4 (MVP):**
- [x] Core KYC flow
- [x] Dashboard
- [x] Landing page
- [ ] Beta testing with 3-5 customers

**Month 2-3 (Scale):**
- [ ] Stripe billing integration
- [ ] White-label mode
- [ ] WhatsApp fallback (Twilio)
- [ ] Multi-provider support (HyperVerge backup)

**Month 4-6 ($20k MRR):**
- [ ] Agency reseller program
- [ ] API documentation site
- [ ] Compliance certifications (SOC 2)
- [ ] 24/7 support

## 🤝 Support

**Email:** your-email@example.com
**Twitter:** @yourusername

## 📄 License

MIT License - feel free to fork and modify.

---

Built with ❤️ using GitHub Copilot
