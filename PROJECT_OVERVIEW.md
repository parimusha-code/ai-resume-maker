# AI Resume Maker - Project Overview

## Project Description
AI-powered resume builder application that helps users create professional resumes with AI assistance.

## Tech Stack
- **Frontend**: Next.js 14+, React, TypeScript, Tailwind CSS
- **Backend**: Node.js/Express (in Backend folder)
- **Database**: PostgreSQL (via railway.toml)
- **Authentication**: NextAuth.js
- **AI Integration**: AI-powered content generation for resume sections
- **Deployment**: Vercel (main), Railway (backend)

## Project Structure

### Main Application (`d:/ai-resume-maker/`)
- **`app/`** - NextJS app directory with pages and API routes
  - `builder/` - Resume builder interface
  - `dashboard/` - User resume management
  - `login/` - Authentication
  - `register/` - User registration
  - `api/` - Backend API endpoints
    - `auth/` - Authentication endpoints
    - `generate/` - AI content generation
    - `resumes/` - Resume CRUD operations

- **`components/`** - React components
  - `AuthProvider.tsx` - Authentication provider wrapper

- **`public/`** - Static assets

- **`data/`** - Local data storage
  - `resumes.json` - Resume data
  - `users.json` - User data

### Frontend Folder (`Frontend/`)
- Duplicate/alternative frontend setup with similar structure

### Backend (`Backend/`)
- Express.js server
- Database models and controllers
- API routes for resume and user management
- Railway deployment configuration

### Sub-Projects
- **`ai-job-search/`** - Related project for job search assistance
- **`ai-resume/`** - Alternative resume app
- **`ai-youtube-summariser/`** - Related project for summarizing YouTube videos

## Core Features

### Resume Builder
- Template-based resume creation with predefined schema:
  - Personal Information (name, email, phone)
  - Professional Summary
  - Experience (company, position, description, dates)
  - Education (institution, degree, field, graduation date)
  - Skills
  - Projects

### AI Integration
- AI-powered content generation for resume sections
- Suggestions for bullet points and improvements
- Context-aware content generation

### User Management
- User registration and authentication
- Resume storage and retrieval
- Resume editing and deletion

### Resume Management
- View all created resumes on dashboard
- Edit existing resumes
- Generate PDF/export functionality
- Share resumes

## Key Files
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `.env.local` - Environment variables

## Environment Setup
See `.env.local` for required environment variables:
- Database connection string
- NextAuth configuration
- API endpoints
- AI service credentials

## Deployment
- **Frontend**: Vercel (configured in `vercel.json`)
- **Backend**: Railway (configured in `railway.toml`)
- See `DEPLOYMENT_COMPLETE.md` and `FINAL_DEPLOYMENT_GUIDE.md` for details
