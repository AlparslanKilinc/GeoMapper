const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
require('./setupCloud');
const Port = process.env.PORT;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://geomapper-c6jr.onrender.com' : true,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
// Routes
const authRouter = require('./routes/auth-router');
app.use('/auth', authRouter);

const apiRouter = require('./routes/api-router');
app.use('/api', apiRouter);

// Database
const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(Port, () => {
    console.log('Listening on port: ', Port);
  });
}


module.exports = { app, server };
