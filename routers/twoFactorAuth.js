const express = require('express');
const router = express.Router();
const {
  verify,
  getNewSecret,
  getNewToken,
} = require('../controller/twoFactorAuth');

// define the home page route
router.post('/token', getNewToken);
router.post('/secret', getNewSecret);
router.post('/verify', verify);

//

module.exports = router;
