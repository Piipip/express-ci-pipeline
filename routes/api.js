var express = require('express');
var router = express.Router();

// Define the /api route
router.get('/', function(req, res, next) {
  res.status(200).json({ message: 'API is working!' });
});

module.exports = router;
