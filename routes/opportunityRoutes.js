const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');

router.get('/edit/:id', async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);
  if (!opportunity) return res.status(404).send('Opportunity not found');
  res.render('editOpportunity', { opportunity });
});

router.post('/edit/:id', async (req, res) => {
  const { title, description, required_skills, duration, location, status } = req.body;
  await Opportunity.findByIdAndUpdate(req.params.id, {
    title,
    description,
    required_skills: required_skills.split(',').map(s => s.trim()),
    duration,
    location,
    status
  });
  res.redirect('/opportunities');
});

module.exports = router;
