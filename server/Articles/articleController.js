const Article = require('./articleModel');

const articleController = {};

articleController.getArticles = (req, res) => {
  const id = req.params.id ? req.params.id : false;
  let promise;

  if (id) {
    promise = Article.query({ where: { id } }).fetch();
  } else {
    promise = Article.query({ where: req.query }).fetchAll();
  }
  
  promise.then((articles) => {
    if (!articles) {
      return res.status(400).send('No articles found.');
    }

    return res.type('application/json').status(200).send(articles);
  })
  .catch((err) => res.status(400).send(err)); 
};

articleController.updateArticle = (req, res) => {
  const { id } = req.params;

  Article.forge().where({ id }).save(req.body, { method: 'update' })
  .then((results) => res.type('application/json').status(200).send(results))
  .catch((err) => res.status(400).send(err));
};  

articleController.deleteArticle = (req, res) => {
  const { id } = req.params;

  Article.query({ where: { id } }).destroy()
  .then((results) => res.status(200).send('Successfully deleted article.')) 
  .catch((err) => res.status(400).send(err));
};
 
module.exports = articleController;
