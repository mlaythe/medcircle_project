const express = require('express');

const apiRoutes = module.exports = express.Router();

apiRoutes.get('/', (req, res) => {
  console.log('inside of /')
  res.status(200).send('Successful');
});
