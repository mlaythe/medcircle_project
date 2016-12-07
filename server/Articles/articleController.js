const {  bookshelf, knex  } = require('../database/database');
const Article = require('./articleModel');

const articleController = {};

articleController.getArticles = (req, res, next) => {
  const id = req.params.id ? req.params.id : false;
  let promise;

  if (id) {
    promise = Article.query({ where: {  id  } }).fetch();
  } else {
    promise = Article.query({ where: req.query }).fetchAll();
  }
  
  promise.then((articles) => {
    if (!articles) {
      return res.status(400).send('No articles found.');
    }

    return res.type('application/json').status(200).send(articles);
  })
  .catch((err) => {
    throw new Error(err);
  }); 
};

articleController.updateArticle = (req, res, next) => {
  const { id } = req.params;

  Article.forge().where({  id  }).save(req.body, {  method: 'update'  })
  .then((results) => {
    return res.type('application/json').send(results);
  })
  .catch((err) => {
    return res.status(400).send('Failed to update article.');
  });
};  

articleController.deleteArticle = (req, res, next) => {
  const { id } = req.params;

  Article.query({  where: {  id  }  }).destroy()
  .then((results) => {
    return res.status(200).send('Successfully deleted article.');
  }) 
  .catch((err) => {
    throw new Error(err);
  });
}; 

module.exports = articleController;