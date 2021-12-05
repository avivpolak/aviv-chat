const express = require('express');
const { sendMessage, chatStream } = require('../controller/chat');

const router = express.Router();

// send message to server
router.post('/', sendMessage);

// send massage to all
router.get('/', chatStream);

module.exports = router;
