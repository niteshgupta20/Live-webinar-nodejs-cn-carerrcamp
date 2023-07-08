const express = require('express');
const db = require('./config/mongoose');
const PORT = 8000;
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', require('./routes'));

app.listen(PORT, function callback() {
  console.log('Server is running');
});