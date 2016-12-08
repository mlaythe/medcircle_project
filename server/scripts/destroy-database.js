const { knex } = require('../database/database');

knex.schema.hasTable('articles').then((exists) => {
  if (exists) {
    knex.schema.dropTable('articles')
    .then(() => {
      console.log('Successfully dropped articles table from database!');
      return knex.destroy();
    })
    .then(() => {
      console.log('Pool successfully cleared.');
      process.exit(0);
    })
    .catch((err) => {
      throw new Error(err);
    });
  } else {
    knex.destroy()
    .then(() => {
      console.log('Pool successfully cleared. Articles table does not exist.');
      process.exit(0);
    })
    .catch((err) => {
      throw new Error(err);
    });
  }
});

