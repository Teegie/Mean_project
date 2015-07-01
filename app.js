var express      = require('express');
var app          = express();
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

// require des dbs
var mongo = require('mongodb');
var monk  = require('monk');
var db    = monk('localhost:27017/database');

// require de passport
var passport    = require('passport');

//config pour passport
app.use(passport.initialize());
app.use(passport.session());

var routes    = require('./routes/index');
var users     = require('./routes/users');
var articles  = require('./routes/articles');
var comments  = require('./routes/comments');
var login     = require('./routes/login');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
		req.db = db;
		next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);
app.use('/comments', comments);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err    = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if ("development" === app.get('env')) {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
