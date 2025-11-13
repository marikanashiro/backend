var express = require('express');
var apidocsRouter = require('./routes/apidocsRouter');

var app = express();

app.use(express.json());
app.use('/api-docs', apidocsRouter);

module.exports = app;
