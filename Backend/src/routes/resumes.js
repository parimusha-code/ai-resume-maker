const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to extract user ID from token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // For simplicity, extract userId from token (in production, verify it)
  const userId = req.body.userId || req.query.userId || 'anonymous';
  req.userId = userId;
  next();
}

// GET all resumes for user
router.get('/', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'anonymous';
    const resumes = db.getUserResumes(userId);
    res.json({ resumes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
  }
});

// POST new resume
router.post('/', (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'anonymous';
    const { name, email, phone, summary, experience, education, skills, projects } = req.body;

    const resume = {
      id: Date.now().toString(),
      userId,
      name,
      email,
      phone,
      summary,
      experience,
      education,
      skills,
      projects,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    db.addResume(resume);
    res.status(201).json({ message: 'Resume saved', resume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save resume', error: error.message });
  }
});

// GET specific resume
router.get('/:id', (req, res) => {
  try {
    const resume = db.findResumeById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ resume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resume', error: error.message });
  }
});

// UPDATE resume
router.put('/:id', (req, res) => {
  try {
    const updated = db.updateResume(req.params.id, {
      ...req.body,
      updatedAt: new Date(),
    });

    if (!updated) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume updated', resume: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update resume', error: error.message });
  }
});

// DELETE resume
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteResume(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume', error: error.message });
  }
});

module.exports = router;
