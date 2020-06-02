const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views'),
  helpers: {
    selectedIfEqual: (value, option) => (value === option ? 'selected' : ''),
    increment: (value) => parseInt(value, 10) + 1,
  },
  allowProtoMethodsByDefault: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dependencies/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/dependencies/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/dependencies/ckeditor', express.static(path.join(__dirname, 'node_modules/@ckeditor/ckeditor5-build-classic/build')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  }
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
