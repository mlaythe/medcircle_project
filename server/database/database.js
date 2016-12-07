const config = require('config');
const dbKey = config.get('db-key');

const knex = require('knex')({
  client: 'pg',
  connection: dbKey,
  pool: {
    min: 1,
    max: 7
 }
});

const bookshelf = require('bookshelf')(knex);

module.exports = { knex, bookshelf };