const express = require('express');
const router = express.Router();
const { dashboard } = require('../../controllers/dashboardController');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

// Protect with auth and admin role
router.get('/', auth, role('admin'), dashboard);

module.exports = router;
