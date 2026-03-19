# 🚀 Complete Deployment Guide - AI Resume Maker

## Summary
- **GitHub:** https://github.com/parimusha-code/ai-resume-maker ✅ 
- **Backend:** Deploy to Render.com
- **Frontend:** Deploy to Vercel.com

---

## Part 1: Deploy Backend to Render ✅

### Step 1: Go to Render
👉 https://render.com

### Step 2: Sign In
- Click **"Sign up"** (use GitHub)
- Authorize Render with GitHub

### Step 3: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Select repository: `parimusha-code/ai-resume-maker`
3. Click **"Connect"**

### Step 4: Configure
- **Name:** `ai-resume-maker-backend`
- **Environment:** `Node`
- **Region:** `Oregon` (or your closest)
- **Branch:** `main`
- **Build Command:** `cd Backend && npm ci`
- **Start Command:** `cd Backend && node src/server.js`
- **Plan:** `Free` ✅

### Step 5: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these:
```
OPENAI_API_KEY = sk-proj-YOUR-ACTUAL-API-KEY-HERE

JWT_SECRET = parimusha-jwt-secret-key-2024-secure

NODE_ENV = production

PORT = 5000
```

👉 **Get your OPENAI_API_KEY from:** https://platform.openai.com/api-keys

### Step 6: Deploy
- Click **"Create Web Service"**
- Wait 3-5 minutes for deployment
- ✅ You'll get a URL like: `https://ai-resume-maker-backend-xxxx.onrender.com`

**Copy this URL!** You'll need it for Vercel.

---

## Part 2: Deploy Frontend to Vercel ✅

### Step 1: Go to Vercel
👉 https://vercel.com/dashboard

### Step 2: Add New Project
1. Click **"Add New"** → **"Project"**
2. Search and select: `ai-resume-maker`
3. Click **"Import"**

### Step 3: Configure
- **Framework Preset:** `Next.js`
- **Root Directory:** `Frontend` ✅ (IMPORTANT!)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm ci`

### Step 4: Environment Variables
Add these before deploying:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL (from Part 1) → `https://ai-resume-maker-backend-xxxx.onrender.com` |
| `NEXTAUTH_SECRET` | `parimusha-nextauth-secret-2024` |
| `NEXTAUTH_URL` | `https://ai-resume-maker-git-main-parimusha-codes-projects.vercel.app` |

### Step 5: Deploy
- Click **"Deploy"**
- Wait 2-3 minutes
- ✅ Your frontend will be live!

---

## Part 3: Test Everything ✅

1. **Go to your Vercel URL**
2. **Register a new account** or login with: `parimusha2005@gmail.com` / `Usha@0616`
3. **Try creating a resume**
4. **Test AI generation** button
5. **Save resume**

---

## Deployment URLs

After both deployments:

```
Frontend: https://ai-resume-maker-git-main-parimusha-codes-projects.vercel.app
Backend:  https://ai-resume-maker-backend-xxxx.onrender.com
GitHub:   https://github.com/parimusha-code/ai-resume-maker
```

---

## Troubleshooting

### Backend not connecting?
- Check `NEXT_PUBLIC_API_URL` in Vercel matches your Render URL
- Make sure you added `/api/...` paths are correct
- Check browser console for CORS errors

### Build fails on Vercel?
- Verify **Root Directory** is set to `Frontend`
- Check environment variables are added
- Try redeploying with **"Redeploy"** button

### AI Generation not working?
- Check OPENAI_API_KEY is valid in Render
- Check remaining API credits on OpenAI

---

## Next Steps

- ✅ Monitor deployments
- ✅ Get custom domain (optional)
- ✅ Add more features (PDF download, templates, etc.)

**Your AI Resume Maker is now LIVE! 🎉**
