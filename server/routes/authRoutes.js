const express = require('express');
const apiRoutes = require('./apiRoutes');
const config = require('config');

const authRoutes = module.exports = express.Router();

authRoutes.use((req, res, next) => {
  return req.get('Authorization') === config.get('bearer-token') ? next() : res.status(401).send('Missing proper authentication.');
});

authRoutes.use('/api', apiRoutes);