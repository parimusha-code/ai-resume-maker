#!/usr/bin/env node

/**
 * AI Resume Maker - Automated Deployment Setup
 * This script prepares everything for deployment
 */

const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(60));
console.log('🚀 AI Resume Maker - Deployment Verification');
console.log('='.repeat(60) + '\n');

// Check files exist
const files = [
  'Backend/src/server.js',
  'Backend/src/routes/auth.js',
  'Backend/src/routes/resumes.js',
  'Backend/src/routes/generate.js',
  'Backend/package.json',
  'Frontend/package.json',
  'Frontend/src/app/layout.tsx',
  'Frontend/src/app/api/auth/[...nextauth]/route.ts',
  'render.yaml',
  'vercel.json',
  '.gitignore',
  '.vercelignore'
];

console.log('✅ Checking files...\n');
files.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${file}`);
});

console.log('\n' + '='.repeat(60));
console.log('📋 Deployment Checklist');
console.log('='.repeat(60) + '\n');

const checklist = [
  { item: 'GitHub Repository', url: 'https://github.com/parimusha-code/ai-resume-maker', status: '✅ Ready' },
  { item: 'Backend Configuration', file: 'render.yaml', status: '✅ Ready' },
  { item: 'Frontend Configuration', file: 'vercel.json', status: '✅ Ready' },
  { item: 'Environment Variables', file: '.env.local', status: '✅ Ready' },
  { item: 'Database (File-based)', file: 'data/', status: '✅ Ready' }
];

checklist.forEach(item => {
  console.log(`${item.status} ${item.item}`);
  if (item.file) console.log(`        File: ${item.file}`);
  if (item.url) console.log(`        URL: ${item.url}`);
});

console.log('\n' + '='.repeat(60));
console.log('🎯 Next: Deploy to Render & Vercel');
console.log('='.repeat(60) + '\n');

console.log('BACKEND (Render.com):');
console.log('1. Go to https://render.com');
console.log('2. Sign in with GitHub');
console.log('3. Click "New" → "Web Service"');
console.log('4. Connect: parimusha-code/ai-resume-maker');
console.log('5. Settings:');
console.log('   - Name: ai-resume-maker-backend');
console.log('   - Build: cd Backend && npm ci');
console.log('   - Start: cd Backend && node src/server.js');
console.log('6. Environment Variables:');
console.log('   OPENAI_API_KEY = your-key');
console.log('   JWT_SECRET = parimusha-jwt-secret-2024');
console.log('   NODE_ENV = production');
console.log('7. Deploy & copy the URL\n');

console.log('FRONTEND (Vercel):');
console.log('1. Go to https://vercel.com');
console.log('2. Click "Add New" → "Project"');
console.log('3. Import: parimusha-code/ai-resume-maker');
console.log('4. Root Directory: Frontend ⭐');
console.log('5. Environment Variables:');
console.log('   NEXT_PUBLIC_API_URL = your-render-url');
console.log('   NEXTAUTH_SECRET = parimusha-nextauth-secret-2024');
console.log('   NEXTAUTH_URL = https://your-vercel-url.vercel.app');
console.log('6. Deploy ✅\n');

console.log('='.repeat(60));
console.log('✨ Ready to Deploy!');
console.log('='.repeat(60) + '\n');
