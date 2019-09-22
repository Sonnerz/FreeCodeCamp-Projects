'use strict';
require('dotenv').config();
var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');

var apiRoutes         = require('./routes/api.js');
//var fccTestingRoutes  = require('./routes/fcctesting.js');
//var runner            = require('./test-runner');

const helmet = require("helmet");

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the content security policies to only allow loading of scripts and css from your server.
app.use(helmet.contentSecurityPolicy({
  directives: {
    "default-src": ["'self'"],
    scriptSrc: ["'self'", 'code.jquery.com',"'unsafe-inline'",'stackpath.bootstrapcdn.com'],
    "img-src":["'self'", 'https://hyperdev.com', 'cdn.glitch.com','code.jquery.com'],
    "style-src": ["'self'","'unsafe-inline'",'fonts.googleapis.com','stackpath.bootstrapcdn.com','code.jquery.com'],
    "font-src":['fonts.googleapis.com','stackpath.bootstrapcdn.com','fonts.gstatic.com']
  }
}));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
//fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        //runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 3500);
  }
});

module.exports = app; //for testing
