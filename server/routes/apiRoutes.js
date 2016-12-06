const express = require('express');
const { getArticles } = require('../Articles/articleController');

const apiRoutes = module.exports = express.Router();

apiRoutes.get('/:version', (req, res) => {
  res.status(200).send('Successful');
});

apiRoutes.get('/:version/articles', getArticles);
