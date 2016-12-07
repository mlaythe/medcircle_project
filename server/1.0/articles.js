const express = require('express');
const { getArticles, updateArticle, deleteArticle } = require('../Articles/articleController');

const articles = module.exports = express.Router();

articles.get('/articles', getArticles);
articles.get('/articles/:id', getArticles);
articles.put('/articles/:id', updateArticle);
articles.delete('/articles/:id', deleteArticle);