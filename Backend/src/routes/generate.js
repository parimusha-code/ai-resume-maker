const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { resumeData, fieldToGenerate, index } = req.body;

    let prompt = '';
    const systemPrompt = `You are an expert resume writer. 
Return ONLY the rewritten content without any conversational filler.`;

    if (fieldToGenerate === 'summary') {
      prompt = `Create a professional 3-4 sentence summary for a resume based on this info:
Name: ${resumeData.fullName || ''}
Skills: ${resumeData.skills || ''}
Experience: ${resumeData.experience?.length || 0} positions
Write it in first person, professional tone, highlighting key strengths.`;
    } else if (fieldToGenerate === 'experience' && index !== undefined) {
      const exp = resumeData.experience[index];
      prompt = `Rewrite this job experience as 3-4 strong resume bullet points:
Job Title: ${exp.jobTitle || ''}
Company: ${exp.company || ''}
Description: ${exp.description || ''}
Make it action-oriented, using strong verbs and quantifiable achievements when possible.`;
    } else if (fieldToGenerate === 'skills') {
      prompt = `Generate 8-10 relevant professional skills based on this experience:
${resumeData.experience?.map(e => e.description).join('\n') || 'General professional skills'}
List them as comma-separated values, most important first.`;
    }

    if (!prompt) {
      return res.status(400).json({ message: 'Invalid field to generate' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({ generatedText: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ message: 'Generation failed', error: error.message });
  }
});

module.exports = router;
