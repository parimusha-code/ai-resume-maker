const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const usersFile = path.join(dataDir, 'users.json');
const resumesFile = path.join(dataDir, 'resumes.json');

// Initialize files if they don't exist
function initializeFiles() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(resumesFile)) {
    fs.writeFileSync(resumesFile, JSON.stringify([], null, 2));
  }
}

initializeFiles();

// User operations
function getUsers() {
  return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function findUser(email) {
  const users = getUsers();
  return users.find(u => u.email === email);
}

function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return user;
}

// Resume operations
function getResumes() {
  return JSON.parse(fs.readFileSync(resumesFile, 'utf8'));
}

function saveResumes(resumes) {
  fs.writeFileSync(resumesFile, JSON.stringify(resumes, null, 2));
}

function findResumeById(id) {
  const resumes = getResumes();
  return resumes.find(r => r.id === id);
}

function getUserResumes(userId) {
  const resumes = getResumes();
  return resumes.filter(r => r.userId === userId);
}

function addResume(resume) {
  const resumes = getResumes();
  resumes.push(resume);
  saveResumes(resumes);
  return resume;
}

function updateResume(id, updatedData) {
  const resumes = getResumes();
  const index = resumes.findIndex(r => r.id === id);
  if (index !== -1) {
    resumes[index] = { ...resumes[index], ...updatedData };
    saveResumes(resumes);
    return resumes[index];
  }
  return null;
}

function deleteResume(id) {
  const resumes = getResumes();
  const index = resumes.findIndex(r => r.id === id);
  if (index !== -1) {
    resumes.splice(index, 1);
    saveResumes(resumes);
    return true;
  }
  return false;
}

module.exports = {
  getUsers,
  saveUsers,
  findUser,
  addUser,
  getResumes,
  saveResumes,
  findResumeById,
  getUserResumes,
  addResume,
  updateResume,
  deleteResume,
};
