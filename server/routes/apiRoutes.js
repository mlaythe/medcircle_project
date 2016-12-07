const express = require('express');
const articles1 = require('../1.0/articles');

const apiRoutes = module.exports = express.Router();

apiRoutes.use('/1.0', articles1);
