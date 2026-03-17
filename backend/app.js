const cors = require('cors');
const express = require('express');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

module.exports = app;
