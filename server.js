'use strict';
/** =================================
                Packages
**==================================*/
const express = require('express');
const path    = require('path');
const cors    = require('cors');

var passport         = require('passport');
var expressValidator = require('express-validator');
var session          = require('express-session');
var exphbs           = require('express-handlebars');
var flash            = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');


/** import routers */
// Admin
var HomePage = require('./routes/users/homepage');
var Team = require('./routes/users/team-page');


/** =================================
                Body
**==================================*/

var app = express();
var port = process.env.PORT || 8080;
app.use(cors());


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: false
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// connect flash
app.use(flash());

// global variable
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});


app.use('/',HomePage);
app.use('/',Team);

app.listen(port, () => console.log(`connect to ${port}`));