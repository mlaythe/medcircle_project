const express = require('express');
const { getArticles, updateArticle, deleteArticle } = require('../Articles/articleController');
const description = require('./description');

const articles = module.exports = express.Router();

articles.get('/', (req, res) => {
  res.send(description);
});
articles.get('/articles', getArticles);
articles.get('/articles/:id', getArticles);
articles.put('/articles/:id', updateArticle);
articles.delete('/articles/:id', deleteArticle);
