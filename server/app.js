const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const mongoose = require('mongoose');
const {
  mongoUser,
  mongoPass,
  authUser,
  authPwd,
} = require('./config/config');

const advertiserRoutes = require('./api/routes/advertiser');

const app = express();

// mongodb connection setup
mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@cluster0.6wnm9.mongodb.net/media?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

// middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(basicAuth({
  users: { [authUser]: authPwd },
}));

// Routes which should handle requests
app.get('/', (req, res) => {
  res.json({
    message: 'API version 1.0.0',
  });
});

// routes
app.use('/api/v1/advertiser', advertiserRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
