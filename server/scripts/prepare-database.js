const request = require('request');
const { bookshelf, knex } = require('../database/database');
const Article = require('../Articles/articleModel');
// const config = require('config');
// const articlesURL = config.get('articles-url');
const Promise = require('bluebird');

knex.schema.createTableIfNotExists('articles', article => {
  article.integer('id').primary();
  article.string('title');
  article.string('summary');
  article.string('media_url');
  article.date('published_at');
  article.integer('likes_count');
  article.string('author_name');
  article.string('author_icon_url');
})
.then(() => {
  request("https://medcircle-coding-project.s3.amazonaws.com/api/articles.json", (err, res, body) => {
    if (err) throw new Error(err);

    const articles = JSON.parse(body);
    const promises = articles.map((article) => {
      const { id, title, summary, media_url, published_at, likes_count, author: { name: author_name, icon_url: author_icon_url } } = article;
      const data = { id, title, summary, media_url, published_at, likes_count, author_name, author_icon_url };

      return Article.forge(data).save(null, { method: 'insert' });
   });

    Promise.all(promises)
    .then(() => {
      console.log('Successfully prepared the database!');
      process.exit(0);
   })
    .catch((err) => {
      throw new Error(err);
   });
 });
})
.catch((err) => {
  throw new Error(err);
});