# Deployment Guide

Step-by-step guide to deploy your KYC wrapper for $0/month.

## Overview

**Free Tier Stack:**
- **Backend:** Railway (free 500 hours/month)
- **Frontend:** Vercel (unlimited)
- **Database:** Railway PostgreSQL (free tier)
- **Domain:** Namecheap ($12/year)

**Total cost:** ~$1/month until you have customers

---

## Part 1: Database (Railway PostgreSQL)

### 1. Create PostgreSQL Database

1. Go to https://railway.app (sign up with GitHub)
2. Click **New Project**
3. Select **Provision PostgreSQL**
4. Wait for deployment (~30 seconds)

### 2. Get Database Credentials

1. Click on your PostgreSQL service
2. Go to **Variables** tab
3. Copy the `DATABASE_URL` value

Example:
```
postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway
```

### 3. Run Migration

```bash
# In your local terminal
cd backend
DATABASE_URL="<paste_your_railway_url>" npm run db:migrate
```

You should see: `✅ Migration completed successfully`

---

## Part 2: Backend Deployment (Railway)

### 1. Push Code to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/kyc-wrapper.git
git push -u origin main
```

### 2. Deploy to Railway

1. Go to https://railway.app
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `kyc-wrapper` repository
4. Railway will auto-detect and deploy

### 3. Configure Environment Variables

1. Click on your service
2. Go to **Variables** tab
3. Add these variables:

```
SHUFTI_CLIENT_ID=your_client_id
SHUFTI_SECRET_KEY=your_secret_key
DATABASE_URL=<your_postgres_url_from_part1>
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
PORT=3001
JWT_SECRET=<generate_with_openssl_rand_-base64_32>
```

### 4. Set Root Directory

1. Go to **Settings** tab
2. Under **Build & Deploy**
3. Set **Root Directory:** `backend`
4. Set **Start Command:** `npm start`

### 5. Get Backend URL

1. Go to **Settings** tab
2. Under **Networking** → **Public Networking**
3. Click **Generate Domain**
4. Copy the URL (e.g., `kyc-backend-production.up.railway.app`)

---

## Part 3: Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. Go to https://vercel.com (sign up with GitHub)
2. Click **Add New** → **Project**
3. Import your GitHub repo
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 2. Add Environment Variable

1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-railway-backend.up.railway.app`

### 3. Update Frontend Code

Edit `frontend/src/main.jsx` or create `frontend/.env.production`:

```env
VITE_API_URL=https://your-railway-backend.up.railway.app
```

Update axios base URL in frontend:

```javascript
// frontend/src/App.jsx or create a config file
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

### 4. Redeploy

```bash
git add .
git commit -m "Add production API URL"
git push
```

Vercel will auto-redeploy.

---

## Part 4: Connect Backend & Frontend

### 1. Update CORS in Backend

Edit `backend/src/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

Push changes:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Railway will auto-redeploy.

### 2. Update Frontend URL in Railway

Go to Railway → Your Backend Service → Variables:
- Update `FRONTEND_URL` to `https://your-app.vercel.app`

---

## Part 5: Custom Domain (Optional but Recommended)

### For Frontend (Vercel)

1. Buy domain on Namecheap (~$12/year)
2. In Vercel: **Settings** → **Domains**
3. Add your domain (e.g., `globalkyc.com`)
4. Follow Vercel's DNS instructions
5. Wait for SSL certificate (~5 min)

### For Backend (Railway)

1. In Railway: **Settings** → **Networking**
2. Click **Custom Domain**
3. Add subdomain (e.g., `api.globalkyc.com`)
4. Update DNS CNAME to point to Railway
5. Update `BACKEND_URL` in Railway env vars

---

## Part 6: Shufti Pro Webhook

### 1. Get Your Backend URL

Your webhook URL: `https://your-backend.railway.app/api/webhook/shufti`

### 2. Configure in Shufti Pro Dashboard

1. Log in to https://shuftipro.com
2. Go to **Settings** → **Webhooks**
3. Add webhook URL: `https://your-backend.railway.app/api/webhook/shufti`
4. Select events: `verification.accepted`, `verification.declined`

---

## Testing Production Deployment

### 1. Test Backend Health

```bash
curl https://your-backend.railway.app/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### 2. Test Frontend

Visit: `https://your-app.vercel.app`

Should see your landing page.

### 3. Test Full Flow

1. Click "Start Verification"
2. Fill form
3. Should redirect to Shufti Pro
4. Complete verification
5. Check Railway logs for webhook

---

## Monitoring & Logs

### Railway Logs

1. Go to Railway → Your Service
2. Click **Deployments** tab
3. View real-time logs

### Vercel Logs

1. Go to Vercel → Your Project
2. Click **Deployments** tab
3. View logs for each deployment

---

## Cost Breakdown

**Free Tier (0-1,000 verifications/month):**
- Railway: $0 (500 hours free)
- Vercel: $0 (unlimited)
- PostgreSQL: $0 (Railway free tier)
- Shufti Pro: Pay-per-use (~$0.50-$1.00/verification)

**Total:** $0 fixed costs + variable KYC costs

**After 1,000 verifications/month:**
- Railway: ~$5-10/month (usage-based)
- Consider upgrading to Railway Pro ($20/month unlimited)

---

## Troubleshooting

### Frontend can't reach backend

Check:
1. CORS is configured correctly in `backend/src/server.js`
2. `VITE_API_URL` is set in Vercel env vars
3. Backend health endpoint works: `curl https://your-backend.railway.app/health`

### Database connection error

Check:
1. `DATABASE_URL` is correct in Railway env vars
2. PostgreSQL service is running (green dot in Railway)
3. Migration was run successfully

### Shufti webhook not working

Check:
1. Webhook URL is correct in Shufti dashboard
2. Railway logs show incoming webhook requests
3. Your backend is publicly accessible

---

## Next Steps

✅ **Week 1:**
- Deploy to production
- Test full flow end-to-end
- Set up error monitoring (Sentry - free tier)

✅ **Week 2:**
- Start customer research (see `/research` folder)
- Get 3-5 beta testers

✅ **Week 3-4:**
- Add Stripe for billing
- Create API documentation
- Launch publicly

---

## Production Checklist

Before launching to customers:

- [ ] Environment variables set correctly
- [ ] Database migration completed
- [ ] CORS configured for production URLs
- [ ] Shufti webhook configured
- [ ] Custom domain set up
- [ ] SSL certificates active
- [ ] Error monitoring set up (Sentry)
- [ ] Terms & Privacy Policy added
- [ ] Support email configured
- [ ] Backup plan for downtime

---

**Need help?** Check Railway docs (https://docs.railway.app) or Vercel docs (https://vercel.com/docs).
