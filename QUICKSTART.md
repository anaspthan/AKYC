# 🚀 QUICK START - Get Running in 15 Minutes

## Step 1: Get Shufti Pro Account (5 min)

1. Go to https://shuftipro.com/partners
2. Sign up as a reseller (100% free)
3. Wait for approval email (1-3 business days)
4. Get your `CLIENT_ID` and `SECRET_KEY`

**Meanwhile, continue with local setup:**

---

## Step 2: Install Dependencies (3 min)

```powershell
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

cd ..
```

---

## Step 3: Set Up Database (3 min)

**Option A: Local PostgreSQL** (if you have it installed)

```powershell
# Create database
createdb kyc_db

# Create .env file
Copy-Item .env.example .env

# Edit .env and set:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/kyc_db
```

**Option B: Railway (Recommended - Free)**

1. Go to https://railway.app
2. New Project → Provision PostgreSQL
3. Copy `DATABASE_URL` from Variables tab
4. Create `.env` file and paste it

Then run migration:

```powershell
cd backend
npm run db:migrate
```

You should see: `✅ Migration completed successfully`

---

## Step 4: Configure Environment (2 min)

Edit `.env` file in the root directory:

```env
# Shufti Pro (use sandbox mode until approved)
SHUFTI_CLIENT_ID=your_client_id_here
SHUFTI_SECRET_KEY=your_secret_key_here
SHUFTI_API_URL=https://api.shuftipro.com

# Database (from Step 3)
DATABASE_URL=postgresql://user:password@localhost:5432/kyc_db

# Local development
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3001

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_random_secret_here
```

---

## Step 5: Run the App (1 min)

```powershell
# From root directory
npm run dev
```

This starts:
- ✅ Backend: http://localhost:3001
- ✅ Frontend: http://localhost:5173

Open browser to http://localhost:5173

---

## Step 6: Test It Works (1 min)

1. Click "Start Verification"
2. Fill in test data:
   - First Name: John
   - Last Name: Doe
   - Email: test@example.com
   - Country: US
   - Language: English

3. Click "Start Verification"

**Note:** Without Shufti credentials, you'll get an error. That's okay - it means your app is working!

---

## ✅ You're Ready!

### What You Have Now

✅ Full-stack KYC app running locally
✅ Landing page at http://localhost:5173
✅ Dashboard at http://localhost:5173/dashboard
✅ Database connected and migrated

### Next Steps

**Option 1: Deploy First (Recommended)**
- Read `DEPLOYMENT.md` (15 min to deploy)
- Deploy to Railway + Vercel (both free)
- Get it live before adding Shufti credentials

**Option 2: Customer Research First**
- Read `research/README.md`
- Start outreach TODAY (don't wait for code)
- Get 5 discovery calls scheduled

**Option 3: Add Shufti & Test**
- Wait for Shufti approval
- Add credentials to `.env`
- Test full verification flow

---

## Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `.env` is correct
- Try Railway instead (easier)

### "Port 3001 already in use"
- Change PORT in `.env` to 3002
- Restart: `npm run dev`

### "Module not found"
- Delete `node_modules`: `Remove-Item -Recurse node_modules`
- Reinstall: `npm install`

### "CORS error in browser"
- Check backend is running on port 3001
- Check `backend/src/server.js` has correct CORS config

---

## Project Structure

```
kyc/
├── backend/               # Node.js API
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Shufti Pro integration
│   │   ├── config/       # Database config
│   │   └── server.js     # Express app
│   └── package.json
├── frontend/             # React app
│   ├── src/
│   │   ├── pages/        # UI pages
│   │   └── App.jsx       # Router
│   └── package.json
├── research/             # Customer research toolkit
│   ├── outreach-scripts.md
│   ├── discovery-questions.md
│   └── customer-tracker.csv
├── README.md            # Main documentation
├── DEPLOYMENT.md        # Deploy to production
├── ROADMAP.md          # 12-week execution plan
└── .env                # Your secrets (DON'T COMMIT)
```

---

## Important Files

- **`.env`** - Your secrets (Shufti keys, database URL)
- **`backend/src/services/shuftiService.js`** - KYC integration logic
- **`frontend/src/pages/KYCForm.jsx`** - Main verification form
- **`frontend/src/pages/Landing.jsx`** - Public landing page
- **`research/outreach-scripts.md`** - Copy-paste sales messages

---

## What to Do Today

1. ✅ Get app running locally (15 min)
2. 📧 Apply for Shufti Pro account
3. 🚀 Deploy to Railway + Vercel (read `DEPLOYMENT.md`)
4. 💬 Join 5 crypto Telegram groups
5. 📨 Send 5 outreach messages (use `research/outreach-scripts.md`)

**Don't wait for perfect. Ship fast, learn fast.**

---

## Need Help?

- **Shufti Pro issues:** support@shuftipro.com
- **Railway issues:** https://railway.app/help
- **Vercel issues:** https://vercel.com/support
- **General questions:** Re-read `README.md` and `DEPLOYMENT.md`

---

**You got this! 🚀**

Now stop reading and start building. Your first customer is waiting.
