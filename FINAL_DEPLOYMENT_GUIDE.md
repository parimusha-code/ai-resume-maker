# 🚀 AI Resume Maker - Final Deployment Guide

## **FINAL LINKS FOR HR SUBMISSION**

### **1. Live Application (Frontend)**
```
https://ai-resume-builder-iota-peach.vercel.app
```

### **2. Source Code (GitHub)**
```
https://github.com/parimusha-code/ai-resume-maker
```

### **3. Backend API (Render)** 
```
https://[YOUR-RENDER-URL].onrender.com
```

### **4. Test Credentials**
```
Email: parimusha2005@gmail.com
Password: Usha@0616
```

---

## **STEP 1: Render Backend - Environment Variables**

Go to: https://dashboard.render.com/

**Add EXACTLY these variables (plain values, NO $ symbols):**

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | `sk-proj-YOUR-OPENAI-KEY-HERE` |
| `JWT_SECRET` | `parimusha-jwt-secret-2024` |
| `PORT` | `5000` |

**How to add:**
1. Click your service
2. Click "Environment"
3. Click "Add Environment Variable"
4. Enter Key and Value (plain text only)
5. Click "Save"
6. Re-deploy

---

## **STEP 2: Vercel Frontend - Environment Variables**

Go to: https://vercel.com/

**Add EXACTLY these variables:**

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://[YOUR-RENDER-URL].onrender.com` |
| `NEXTAUTH_SECRET` | `parimusha-nextauth-secret-2024` |
| `NEXTAUTH_URL` | `https://ai-resume-builder-iota-peach.vercel.app` |

**After adding, click "Save and Deploy"**

---

## **STEP 3: Get Your Render URL**

After deploying, you'll see your Render URL. Format:
```
https://ai-resume-maker-backend-abc123.onrender.com
```

**Replace `[YOUR-RENDER-URL]` with this in Vercel's `NEXT_PUBLIC_API_URL`**

---

## **STEP 4: Test the App**

1. Go to: https://ai-resume-builder-iota-peach.vercel.app
2. Login with:
   - Email: `parimusha2005@gmail.com`
   - Password: `Usha@0616`
3. Try creating a resume
4. Try AI generation

---

## **Project Summary**

```
Full-Stack AI Resume Maker

Frontend:
- Next.js 14 + React 18 + TypeScript
- Tailwind CSS styling
- NextAuth authentication
- Deployed on Vercel

Backend:
- Node.js + Express
- File-based JSON database
- JWT authentication
- OpenAI API integration
- Deployed on Render

Features:
✅ User authentication
✅ Resume CRUD operations
✅ AI-powered content generation
✅ Real-time resume saving
✅ Responsive design
```

---

## **What to Send HR**

Copy this:

---

### **AI Resume Maker - Project Submission**

**Live Application:** https://ai-resume-builder-iota-peach.vercel.app

**GitHub Repository:** https://github.com/parimusha-code/ai-resume-maker

**Test Credentials:**
- Email: parimusha2005@gmail.com
- Password: Usha@0616

**Technology Stack:**
- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, NextAuth
- Backend: Node.js, Express, File-based Database
- AI: OpenAI API (GPT-4O Mini)
- Deployment: Vercel (Frontend), Render (Backend)

**Features:**
- User registration and authentication
- Resume builder with CRUD operations
- AI-powered resume content generation
- Real-time data persistence
- Responsive design for all devices

---
