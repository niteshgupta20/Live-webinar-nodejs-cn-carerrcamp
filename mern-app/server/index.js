const express = require('express');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const passport = require('./config/passportLocalStrategy');

const PORT = 8000;
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes'));

app.listen(PORT, function callback() {
  console.log('Server is running');
});
