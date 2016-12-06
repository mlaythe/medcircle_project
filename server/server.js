const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'test') {
  app.use(logger('dev'));
} 

app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;