'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const dns = require('dns');

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

// check db connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log("We're connected! " + mongoose.connection.readyState); //0: disconnected, 1: connected, 2: connecting, 3: disconnecting
});

// create Schema
const Schema = mongoose.Schema;

const convertUrlSchema = new Schema({
  original_url: String,
  short_url: Number
});

const UrlConverter = mongoose.model('UrlConverter', convertUrlSchema);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/api/shorturl/new', urlencodedParser, function (req, res, next) {
  // regex to match http or https
  const regex = /^\http*s?\:\/\//g;

  // user input
  const inputUrl = req.body.url;
  console.log("inputUrl:   " + inputUrl);

  // slice url: from https://www.google.com to www.google.com for dns.lookup
  const urlToValidate = createUrlToValidate(inputUrl, regex);
  console.log("validateUrl:   " + urlToValidate);

  // check validity of url
  dns.lookup(urlToValidate, function (err, address, family) {
    let invalidError = {};
    // if not valid, respond { "error": "invalid url" }
    if (err) {
      invalidError = handleError(err);
      res.json({ "error": invalidError.error });
      // if url is valid, first check if it exists in database
    } else {
      UrlConverter.findOne({ "original_url": inputUrl }, function (err, data) {
        if (err) return handleError(err);
        // it exists
        if (data) {
          res.json({ "original_url": data.original_url, "short_url": data.short_url });
          // it does not exist, create new entry
        } else {
          // find most recent entry in database
          UrlConverter.countDocuments(function (err, count) {
            if (!err && count === 0) {
              const new_url = new UrlConverter({
                original_url: inputUrl,
                short_url: 1
              });
              new_url.save(function (err, data) {
                if (err) return handleError(err);
                return next(null, data);
              });
              res.json({
                "original_url": inputUrl,
                "short_url": 1
              });
            } else {
              UrlConverter.find({}, function (err, data) {
                let mostRecentNumber = 0;
                if (err) return handleError(err);
                if (data) {
                  mostRecentNumber = data[0].short_url;
                }
                const new_url = new UrlConverter({
                  original_url: inputUrl,
                  short_url: ++mostRecentNumber
                });
                new_url.save(function (err, data) {
                  if (err) return handleError(err);
                  return next(null, data);
                });

                res.json({
                  "original_url": inputUrl,
                  "short_url": mostRecentNumber
                });
              }).sort({ '_id': -1 }).limit(1);
            }
          })
        }
      });
    }
  });
});

app.get('/api/shorturl/:short_url?', function (req, res) {
  const shortUrl = req.params.short_url;
  if (shortUrl == undefined) {
    res.json({ "error": "no shorturl supplied" })
  } else {
    UrlConverter.findOne({ "short_url": shortUrl }, function (err, data) {
      res.redirect(data.original_url);
    });
  }
});


// create url to validate, remove http or https
function createUrlToValidate(url, r) {
  return url.replace(r, '');
}

// handle errors
function handleError(error) {
  if (error.code == "ENOTFOUND") {
    return { "error": "invalid URL" };
  }
}


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});