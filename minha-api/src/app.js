const express = require('express');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

app.use(express.json());
app.use('/api', produtoRoutes);

module.exports = app;
