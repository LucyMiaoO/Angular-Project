var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var routes = require('./routes/index');
var users = require('./routes/users');
var coffeemates = require('./routes/coffeemates.js');
var comments = require('./routes/comments.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//Our Custom Routes
app.get('/coffeemates', coffeemates.findAll);
app.get('/coffeemates/:id', coffeemates.findOne);
app.post('/coffeemates/', coffeemates.addCoffeemate);
app.put('/coffeemates/:id/votes', coffeemates.incrementUpvotes);
app.delete('/coffeemates/:id', coffeemates.deleteCoffeemate);
app.put('/coffeemates/:id', coffeemates.updateCoffeemate);
app.post('/register', users.addUser);
app.post('/login/',users.login);
app.post('/comments', comments.addCom);
app.get('/comments', comments.findAll);
app.delete('/comments/delcom/:id',comments.deleteComment);

review = function(req, res) {
  var transporter = nodemailer.createTransport('smtps://lucymiao412%40gmail.com:hermit0412@smtp.gmail.com');
  req.body.review = req.body.review.trim();

  var mail = {
    to: 'lucymiao412@gmail.com',
    subject: 'Coffeemate Review' + req.body.author,
    text: req.body.review
  };

  if (req.body.review)
    transporter.sendMail(mail, function(err, info){
      if(err) res.json("FAIL");
      else res.json("SUCCESS");
    });
  else
    res.json("FAIL");
};
app.post('/contact', review);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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
