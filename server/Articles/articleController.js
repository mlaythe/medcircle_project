const {  bookshelf, knex  } = require('../database/database');
const Article = require('./articleModel');

const articleController = {};

articleController.getArticles = (req, res, next) => {
  const articleID = req.params.id ? req.params.id : false;

  Article.fetchAll()
  .then((articles) => {
    if (!articles) {
      return res.status(400).send('No articles found.');
    }

    return res.status(200).send(articles);
  })
  .catch((err) => {
    throw new Error(err);
  }); 
};

module.exports = articleController;