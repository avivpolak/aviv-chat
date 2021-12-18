const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
require('dotenv').config();
const userRouter = require('./routers/user');
const chatRouter = require('./routers/chat');

const { morganBodyLogger } = require('./morgan');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const unknownEndpoint = require('./middlewares/unknownEndpoint');
const path = require('path');

const port = process.env.PORT || 8080;

const mongo = process.env.DATABASE;

//connecting to database
mongoose
  .connect(mongo)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(morganBodyLogger);

app.use(express.static(path.resolve('./view/build/')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./views/build/index.html'));
});

app.use('/chat', jsonParser, chatRouter);
app.use('/user', jsonParser, userRouter);

// unknownEndpoint handling middleware
app.use(unknownEndpoint);

// error handling middleware
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`litsening in port ${port}`);
});
module.exports = { app };
