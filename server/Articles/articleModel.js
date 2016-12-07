const { bookshelf } = require('../database/database');

const Article = bookshelf.Model.extend({
  tableName: 'articles',
});

module.exports = Article;
