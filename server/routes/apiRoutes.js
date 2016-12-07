const express = require('express');
const { getArticles, updateArticle } = require('../Articles/articleController');

const apiRoutes = module.exports = express.Router();

apiRoutes.get('/:version', (req, res) => {
  res.status(200).send('Successful');
});

apiRoutes.get('/:version/articles/', getArticles);
apiRoutes.get('/:version/articles/:id', getArticles);
apiRoutes.put('/:version/articles/:id', updateArticle);
