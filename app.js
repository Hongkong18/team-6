var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var expressValidator = require("express-validator");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var indexRouter = require('./api/routes/index');
var usersRouter = require('./api/routes/users');
var messengerRouter = require('./api/routes/messenger');
var forumRouter = require('./api/routes/forum');




//connect to MongoDB
var database = require('./config/database.js');
var mongoose = require('mongoose');
mongoose.connect(database.url,{
  useCreateIndex: true
});


//handle Mongo error
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
  console.log("DB connected!")
})

var app = express();


//use sessions for tracking logins
app.use(session({
    secret: 'wotmalswjddnjsdud',
    resave: true,
    saveUninitialized: false,
    // session save on MongoDB
    store: new MongoStore({
      mongooseConnection: db
    })
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messenger', messengerRouter);
app.use('/forum', forumRouter);



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

module.exports = app;
