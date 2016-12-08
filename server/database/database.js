const config = require('config');
const dbKey = config.get('db-key');

const knex = require('knex')({
  client: 'pg',
  connection: dbKey,
  acquireConnectionTimeout: 10000,
});

const bookshelf = require('bookshelf')(knex);

module.exports = { knex, bookshelf };
