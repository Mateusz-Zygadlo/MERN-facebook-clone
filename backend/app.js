const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 8000;

const mongoDb = process.env.MONGO_URL;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const indexRoutes = require('./routes/index');

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'https://localhost:3000',
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded());

app.use('/', indexRoutes);

app.listen(port, () => console.log('api work'));