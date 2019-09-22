/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

/*
MAKE SURE TO UPDATE IPADDRESS FOR TESTING - api.js, 43
*/

suite('Functional Tests', function() {

    suite('GET /api/stock-prices => stockData object', function() {
      let numberOfLikes = 0;

      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({ticker1: 'goog'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          done();
        });
      });

      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ticker1: 'goog'})
        .end(function(err, res){
          let numberOfLikes = res.body.stockData.likes;
          chai.request(server)
          .get('/api/stock-prices')
          .query({ticker1: 'goog', like: true})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.equal(res.body.stockData.stock, "GOOG");
            assert.equal(res.body.stockData.likes, numberOfLikes+1);
            done();
          });
        });
      });

      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ticker1: 'goog', like:true})
        .end(function(err, res){
          let numberOfLikes = res.body.stockData.likes;
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body.stockData, "price");
          assert.property(res.body.stockData, "likes");
          assert.equal(res.body.stockData.likes, numberOfLikes);
          done();
        });
      });

      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ticker1: 'goog', ticker2:'msft'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.equal(res.body.stockData[0].stock, "GOOG");
          assert.equal(res.body.stockData[1].stock, "MSFT");
          assert.property(res.body.stockData[0], "price");
          assert.property(res.body.stockData[1], "price");
          assert.property(res.body.stockData[0], "rel_likes");
          assert.property(res.body.stockData[1], "rel_likes");
          done();
        });
      });

      test('2 stocks with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ticker1: 'goog', ticker2:'msft', like:true})
        .end(function(err, res){
          assert.equal(res.status, 200);
          let numberOfLikes1 = res.body.stockData[0].likes;
          let numberOfLikes2 = res.body.stockData[1].likes;
          assert.isObject(res.body, 'response should be an object');
          assert.equal(res.body.stockData[0].stock, "GOOG");
          assert.equal(res.body.stockData[1].stock, "MSFT");
          assert.property(res.body.stockData[0], "price");
          assert.property(res.body.stockData[1], "price");
          assert.property(res.body.stockData[0], "rel_likes");
          assert.property(res.body.stockData[1], "rel_likes");
          assert.equal(res.body.stockData[0].likes, numberOfLikes1);
          assert.equal(res.body.stockData[1].likes, numberOfLikes2);
          done();
        });
      });

    });

});
