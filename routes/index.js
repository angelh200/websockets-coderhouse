const express = require('express');
const router = express.Router();

// Main route
router.get('/', (req, res) => {
  res.render('main');
});

module.exports = router;