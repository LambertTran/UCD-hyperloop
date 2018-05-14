'use strict';

/** =================================
                Packages
**==================================*/
const express = require('express');
const path    = require('path');
const cors    = require('cors');

var passport         = require('passport');
var session          = require('express-session');
var exphbs           = require('express-handlebars');
var flash            = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

/** import routers */
var ClientSite = require('./routes/clients/client-site');
var Admin = require('./routes/admins/admin');
var Login = require('./routes/admins/login');
var Apis  = require('./routes/api/apis');
var CreateDb = require('./routes/database/create-db');

/** =================================
                Body
**==================================*/

/** set up server **/
var app = express();
var port = process.env.PORT || 8080;
app.use(cors());

// View Engine
app.set('views', path.join(__dirname, '/views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());


app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

// global variable
app.use(function (req, res, next) {
  // res.locals.user = req.user;
  next();
});


app.use('/',ClientSite);
app.use('/',Login);
app.use('/admin',Admin);
app.use('/api',Apis);
app.use('/database',CreateDb);


app.listen(port, () => console.log(`connect to ${port}`));
