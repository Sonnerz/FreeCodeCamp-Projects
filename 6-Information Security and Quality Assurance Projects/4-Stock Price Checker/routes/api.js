/*
*
*
*       Complete the API routing below
*
*
*       This is not all my code.
*       I referenced another students code (eoja) as they had
*       implemented a Promise/Await pattern that I wanted to learn
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
const mongoose = require('mongoose');
let request = require('request');
const Stock = require('../models/stock');

const CONNECTION_STRING = process.env.DB;

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function () {
  console.log("We're connected! " + mongoose.connection.readyState);
});

module.exports = function (app) {

  app.route('/api/stock-prices')

    .get(function (req, res, done) {
      let ticker1, ticker2, ip;
      ticker1 = req.query.ticker1 != "" ? req.query.ticker1.toUpperCase() : false;

      if (req.query.ticker2) {
        ticker2 = req.query.ticker2.toUpperCase();
      }
      const like = req.query.like ? true : false; // true or false

      ip = process.env.testIP ? process.env.testIP : req.header("X-Forwarded-For").split(",");
      console.log(ip);
      //const ipInfo = req.header("X-Forwarded-For").split(","); //ipInfo[0]
      const ipaddress = like ? ip : false;
      // FOR TESTING const ipaddress = like ? "1.1.1.40" : false;
      let stockPrice;
      let responseStockData = [];


      const addNewStock = (stock) => {
        return new Promise((resolve, reject) => {
          let newStock = new Stock(
            { symbol: stock, price: stockPrice, likes: like, ip: ipaddress }
          );
          newStock.save((err, doc) => {
            if (err) { console.log(err); }
            else if (!doc) { responseStockData.push({ "message": "There was an error, please try again." }); }
            else {
              responseStockData.push({ "stock": doc.symbol, "price": doc.price, "likes": doc.likes });
              resolve();
            }
          });
        }); //end Promise
      };


      const updateStockLikesAndIP = (stock) => {
        return new Promise((resolve, reject) => {
          Stock.findOneAndUpdate(
            { 'symbol': stock },
            { "price": stockPrice, $push: { "ip": ipaddress }, $inc: { likes: like } },
            { new: true }, function (err, doc) {
              if (err) { console.log(err); }
              else if (!doc) { responseStockData.push({ "message": "There was an error, please try again" }); }
              else {
                responseStockData.push({ "stock": doc.symbol, "price": doc.price, "likes": doc.likes });
                resolve();
              }
            }
          ) // end findOneAndUpdate()
        }); // end Promise
      };


      const mainHandler = (stockSymbol) => {
        return new Promise((resolve, reject) => {
          if (stockSymbol) {
            // like is checked
            if (ipaddress) {
              Stock.findOne({ 'symbol': stockSymbol }, async function (err, doc) {
                if (err) { console.log(err); }
                else if (!doc) {
                  await addNewStock(stockSymbol); //not in db, add new stockSymbol
                  resolve();
                } else if (doc.ip.indexOf(ipaddress) < 0) { // ip not found for that stock symbol
                  await updateStockLikesAndIP(stockSymbol);   // update IP and likes
                  resolve();
                } else {
                  responseStockData.push({ "stock": stockSymbol, "price": stockPrice, "likes": doc.likes });
                  resolve();
                }
              }); // end findOne()
            } else {
              // like not checked
              Stock.findOne({ 'symbol': stockSymbol }, async function (err, doc) {
                if (err) { console.log(err); }
                else if (doc) {
                  responseStockData.push({ "stock": doc.symbol, "price": stockPrice, "likes": doc.likes });
                  resolve();
                } else {
                  responseStockData.push({ "stock": stockSymbol, "price": stockPrice, "likes": 0 });
                  resolve();
                }
              }); // end findOne()
            }
          }
        }); // end Promise
      }


      const getStockValue = stockSymbol => {
        return new Promise((resolve, reject) => {
          request({
            method: 'GET',
            uri: 'https://api.iextrading.com/1.0/tops/last?symbols=' + stockSymbol,
            json: true
          }, async function (error, response, body) {
            if (error) { console.log(error); }
            else if (body.length == 0) {
              responseStockData.push({ "message": "This is not a valid stock ticker" });
              resolve();
            } else {
              stockPrice = body[0].price;
              await mainHandler(stockSymbol);
              resolve();
            }
          })
        }) // end Promise
      }


      const createResponseForFrontEnd = response => {
        if (response[0].hasOwnProperty('message')) {
          res.json(response[0].message)
          // Get single price and total likes
        } else if (response.length == 1) {
          res.json({ "stockData": { "stock": response[0].stock, "price": response[0].price, "likes": response[0].likes } })
          // Compare and get relative likes
        } else if (response.length == 2) {
          let rel_stock1 = response[0].likes - response[1].likes;
          let rel_stock2 = response[1].likes - response[0].likes;
          res.json({ "stockData": [{ "stock": response[0].stock, "price": response[0].price, "rel_likes": rel_stock1 }, { "stock": response[1].stock, "price": response[1].price, "rel_likes": rel_stock2 }] })
        }
      }


      (async () => {
        await getStockValue(ticker1);
        if (ticker2) { await getStockValue(ticker2); }
        createResponseForFrontEnd(responseStockData);
      })();

    }); //get
}; // module exports


/*
https://api.iextrading.com/1.0

https://api.iextrading.com/1.0/tops/last?symbols=msft,fb

https://api.iextrading.com/1.0/ref-data/symbols

Parameter values must be comma-delimited when requesting multiple.
(i.e. ?symbols=SNAP,fb is correct.)
Casing does not matter when passing values to a parameter.
(i.e. Both ?symbols=fb and ?symbols=FB will work.)
Be sure to url-encode the values you pass to your parameter.
(i.e. ?symbols=AIG+ encoded is ?symbols=AIG%2b.)
filter
?filter=symbol,volume,lastSalePrice
*/