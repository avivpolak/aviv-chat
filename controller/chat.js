const { EventEmitter } = require('events');
const User = require('../models/user');

const em = new EventEmitter();

const MESSAGES = [];

exports.sendMessage = (req, res) => {
  const { user, message } = req.body;

  MESSAGES.push(`${user}:  ${message}`);

  em.emit('message');

  res.send('message sent');
};

exports.chatStream = (req, res) => {
  const { username } = req.query;

  res.writeHead(200, { 'Content-Type': 'text/event-stream' });

  em.addListener('message', () => {
    const data = JSON.stringify({ MESSAGES });
    res.write(`data: ${data} \n\n`);
  });

  em.addListener('login/logout', async () => {
    try {
      const users = await User.find({ isConnected: true });
      const usersList = users.map((user) => user.username);

      res.write(`data: ${JSON.stringify({ usersList })} \n\n`);
    } catch (error) {
      console.log(error);
    }
  });

  em.emit('login/logout');
  em.emit('message');

  req.on('close', async () => {
    try {
      console.log(`${username} disconnected`);
      await User.findOneAndUpdate(
        { username: username },
        { isConnected: false }
      );

      em.emit('login/logout');
    } catch (error) {
      console.log(error);
    }
  });
};
