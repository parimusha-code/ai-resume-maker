# AI Resume Maker - Backend Deployment Guide

## Quick Deploy to Railway

### Step 1: Go to Railway
1. Visit https://railway.app
2. Click **"Start a New Project"**
3. Click **"Deploy from GitHub"**
4. Authorize Railway with GitHub
5. Select repository: `ai-resume-maker`

### Step 2: Configure Deployment
1. Select the repo and click **Import**
2. Railway will auto-detect `railway.toml`
3. Choose root directory: `Backend`

### Step 3: Add Environment Variables
Click **"Variables"** and add:
```
OPENAI_API_KEY=sk-proj-your-key-here
JWT_SECRET=parimusha-jwt-secret-secure-key-2024
PORT=5000
NODE_ENV=production
```

### Step 4: Deploy
Click **"Deploy"** and wait for completion!

You'll get a URL like: `https://your-app-railway.up.railway.app`

---

## What This Backend Provides

- ✅ User Authentication (Register/Login)
- ✅ Resume CRUD Operations
- ✅ AI Content Generation (OpenAI)
- ✅ File-based Storage (No database needed)

## API Endpoints

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/resumes` - Create resume
- `GET /api/resumes` - Get all resumes
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/generate` - Generate AI content
- `GET /health` - Health check

---

## Production Environment Variables

```env
OPENAI_API_KEY = your-openai-api-key
JWT_SECRET = secure-random-secret-key
PORT = 5000
NODE_ENV = production
```
