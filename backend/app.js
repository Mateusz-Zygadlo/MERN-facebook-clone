const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const session = require("express-session");

require('dotenv').config();

const port = process.env.PORT || 8000;

const mongoDb = process.env.MONGO_URL;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

const facebookStrategy = require('passport-facebook').Strategy;

app.use(cookieParser());
app.use(cors({
  origin: 'https://localhost:3000',
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded());

app.use(session({secret: "secret"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new facebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'first_name', 'last_name', 'email', 'picture'],
}, (token, refreshToken, profile, done) => {
  console.log(profile);

  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  return done(null, id)
});

app.get('/', (req, res) => {
  return res.json({
    title: 'success [index page]',
  })
})

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/profile',
  failureRedirect : '/failed'
}))

app.get('/profile', (req, res) => {
  return res.json({
    title: 'you are valid user',
  })
})

app.get('/failed', (req, res) => {
  return res.json({
    title: 'you are not valid user',
  })
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

app.listen(port, () => console.log('api work'));