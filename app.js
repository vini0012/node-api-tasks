const express = require('express');
const app = express();
const morgan = require('morgan');
const tasksRoutes = require('./routes/tasks');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/tasks', tasksRoutes);

module.exports = app;