# AI Resume Maker - Backend API

This is the backend API for the AI Resume Maker application.

## Setup

```bash
cd Backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000`

## API Endpoints

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login user
- **GET /api/resumes** - Get all resumes
- **POST /api/resumes** - Create new resume
- **GET /api/resumes/:id** - Get specific resume
- **POST /api/generate** - Generate AI content
