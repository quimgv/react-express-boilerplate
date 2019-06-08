const express = require('express');
var cors = require('cors')
require('./db/mongoose');
const userRouter = require('./routers/user');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', userRouter);

module.exports = app;
