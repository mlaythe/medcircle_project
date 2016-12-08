const request = require('request');
const { knex } = require('../database/database');
const Article = require('../Articles/articleModel');
const config = require('config');
const articlesURL = config.get('articles-url');
const Promise = require('bluebird');

knex.schema.hasTable('articles').then((exists) => { 
  if (exists) {
    knex.schema.dropTable('articles').then((exists) => {

      knex.schema.createTable('articles', article => {
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
        request(articlesURL, (err, res, body) => {
          if (err) throw new Error(err);

          const articles = JSON.parse(body);
          const promises = articles.map((article) => {
            // destructure article object and add each property to data object
            // use data object to write new Article to db
            const { id, title, summary, media_url, published_at, likes_count, author: { name: author_name, icon_url: author_icon_url } } = article;
            const data = { id, title, summary, media_url, published_at, likes_count, author_name, author_icon_url };

            return Article.forge(data).save(null, { method: 'insert' });
          });

          // need Promise.all, because bookshelf doesn't expose a bulk write method, so we have to resolve every write to the db ourselves
          Promise.all(promises)
          .then(() => {
            console.log('Successfully prepared the database!');
            return knex.destroy();
          })
          .then(() => {
            console.log('Pool successfully cleared');
            process.exit(0);
          })
          .catch((error) => {
            throw new Error(error);
          });
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
    });
  } else {
    knex.schema.createTable('articles', article => {
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
      request(articlesURL, (err, res, body) => {
        if (err) throw new Error(err);

        const articles = JSON.parse(body);
        const promises = articles.map((article) => {
          // destructure article object and add each property to data object
          // use data object to write new Article to db
          const { id, title, summary, media_url, published_at, likes_count, author: { name: author_name, icon_url: author_icon_url } } = article;
          const data = { id, title, summary, media_url, published_at, likes_count, author_name, author_icon_url };

          return Article.forge(data).save(null, { method: 'insert' });
        });

        // need Promise.all, because bookshelf doesn't expose a bulk write method, so we have to resolve every write to the db ourselves
        Promise.all(promises)
        .then(() => {
          console.log('Successfully prepared the database!');
          return knex.destroy();
        })
        .then(() => {
          console.log('Pool successfully cleared');
          process.exit(0);
        })
        .catch((error) => {
          throw new Error(error);
        });
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
  }
}); 
