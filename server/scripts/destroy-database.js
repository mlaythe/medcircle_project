const { bookshelf, knex } = require('../database/database');

bookshelf.knex.schema.dropTable('articles')
.then(() => {
  console.log('Successfully dropped articles table from database!');
  process.exit(0);
})
.catch((err) => {
  throw new Error(err);
});