# AI Resume Maker - Project Details & Documentation

**Project Name**: AI Resume Maker  
**Type**: Full-stack Web Application  
**Status**: Deployed

---

## 🎯 Project Purpose
An AI-powered resume builder application that helps users create professional, industry-standard resumes with artificial intelligence suggestions and content generation.

---

## 📊 Project Structure

```
ai-resume-maker/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]      - NextAuth authentication
│   │   ├── auth/register/          - User registration endpoint
│   │   ├── generate/               - AI content generation
│   │   └── resumes/                - Resume CRUD operations
│   ├── builder/                    - Resume builder interface
│   ├── dashboard/                  - User resume management
│   ├── login/                      - Login page
│   ├── register/                   - Registration page
│   └── page.tsx                    - Home page
├── components/
│   └── AuthProvider.tsx            - Authentication wrapper
├── Backend/                        - Express.js backend
├── Frontend/                       - Alternative frontend setup
├── data/
│   ├── resumes.json               - Resume storage
│   └── users.json                 - User data storage
├── public/                        - Static files
└── Configuration files:
    ├── next.config.ts
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── .env.local                 - Environment variables
    ├── vercel.json                - Vercel deployment config
    └── render.yaml/railway.toml   - Backend deployment
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Authentication** | NextAuth.js |
| **Database** | PostgreSQL (via Railway) |
| **AI Services** | OpenAI API |
| **Deployment** | Vercel (Frontend), Railway (Backend) |
| **Package Manager** | npm |

---

## 🎨 Core Features

### 1. **Resume Builder**
- Template-based resume creation with structured form
- Sections: Personal Info, Professional Summary, Experience, Education, Skills, Projects
- Real-time form validation
- Auto-save capabilities

### 2. **AI-Powered Content Generation**
- Generate professional bullet points
- Suggest experience descriptions
- Improve existing content
- Context-aware suggestions

### 3. **User Authentication**
- Secure user registration
- Login/logout functionality
- Session management with NextAuth.js
- JWT token-based authentication

### 4. **Resume Management Dashboard**
- View all created resumes
- Edit existing resumes
- Delete resumes
- Track update dates
- Quick access to builder

### 5. **Export & Sharing**
- Download as PDF/HTML
- Share resume links
- View resume in different templates

---

## 📋 Resume Data Schema

```javascript
{
  name: string,
  email: string,
  phone: string,
  summary: string,
  experience: [
    {
      company: string,
      position: string,
      description: string,
      startDate: string,
      endDate: string
    }
  ],
  education: [
    {
      institution: string,
      degree: string,
      field: string,
      graduationDate: string
    }
  ],
  skills: [string],
  projects: [
    {
      name: string,
      description: string
    }
  ]
}
```

---

## 🔐 Environment Variables

```
# Backend
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/signout` - Logout

### Resumes
- `GET /api/resumes` - Get all user resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### AI Generation
- `POST /api/generate` - Generate AI content
  - Parameters: `resumeData`, `fieldToGenerate`, `index` (optional)

---

## 🚀 Deployment

### Frontend (Vercel)
- Automatic deployments on git push
- Environment variables configured in Vercel dashboard
- See `vercel.json` for config

### Backend (Railway)
- Deployed on Railway platform
- Database: PostgreSQL on Railway
- See `railway.toml` for config

---

## 📦 Related Projects in Workspace

1. **ai-job-search/** - Job search assistance tool
2. **ai-resume/** - Alternative resume application
3. **ai-youtube-summariser/** - YouTube video summarization tool
4. **employeemgt/** - Employee management system (Java)

---

## 📖 Documentation Files

- `README.md` - Project setup and usage
- `DEPLOYMENT_COMPLETE.md` - Deployment status and info
- `FINAL_DEPLOYMENT_GUIDE.md` - Step-by-step deployment guide
- `QUICK_START.md` - Quick start guide
- `PROJECT_LINKS.txt` - Important URLs

---

## ✅ Current Status
✅ Project deployed and live  
✅ Authentication working  
✅ Resume builder functional  
✅ AI generation integrated  
✅ Dashboard operational  

---

## 📝 Notes
- This is the main production project for AI Resume generation
- Uses industry-standard practices
- Fully responsive design
- Production-ready code
