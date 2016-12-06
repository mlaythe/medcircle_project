const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());

app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;