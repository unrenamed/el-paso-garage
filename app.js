const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');
const ordersRouter = require('./routes/orders');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/services', servicesRouter);
app.use('/api/orders', ordersRouter);

app.get('/*', (req, res, next) => {
	if (isProductionEnv && !isApiUrl(req.url)) {
		sendIndexHtmlToClient(res);
	} else {
		next();
	}
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

const isProductionEnv = process.env.NODE_ENV === 'production';

const isApiUrl = url => url.startsWith('/api');

const sendIndexHtmlToClient = res => {
	res.sendFile(path.join(__dirname, 'client/dist/index.html'), (err) => {
		if (err) {
			res.status(500).send(err);
		}
	});
};

module.exports = app;
