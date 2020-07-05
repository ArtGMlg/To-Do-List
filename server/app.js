var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var tasksRouter = require('./routes/tasks');
var groupsRouter = require('./routes/groups');
var bodyParser = require('body-parser');
var imageRouter = require('./routes/image');
var weatherRouter = require('./routes/weather');
var citiesRouter = require('./routes/cities');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/tasks', tasksRouter);
app.use('/groups', groupsRouter);
app.use('/image', imageRouter);
app.use('/weather', weatherRouter);
app.use('/cities', citiesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});

module.exports = app;
