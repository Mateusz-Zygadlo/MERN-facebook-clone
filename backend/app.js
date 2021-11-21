const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const session = require("express-session");
const authFacebook = require('./passport-config').facebookAuthenticationUser;
if(typeof localStorage === "undefined" || localStorage === null){
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

require('dotenv').config();

const port = process.env.PORT || 8000;
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const mongoDb = process.env.MONGO_URL;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

authFacebook(passport);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(session({secret: "secret"}));
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, false)
});

app.listen(port, () => console.log('api work'));