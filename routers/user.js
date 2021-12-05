const express = require('express');
const router = express.Router();
const {
  addNewUser,
  login,
  logout,
  getNewAccessToken,
} = require('../controller/user');

// define the home page route
router.post('/register', addNewUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/token', getNewAccessToken);
//

module.exports = router;
