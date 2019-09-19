/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
var ObjectId = require('mongodb').ObjectId;

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
       chai.request(server)
        .post('/api/books')
        .send({
          title: 'Book Test POST /api/books with title'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body, 'title', 'Book in object should contain title');
          assert.property(res.body, '_id', 'Book in object should contain _id');
          done();
        });
      });

      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body, 'message','No title submitted');
          done();
        });
      });

    });


    suite('GET /api/books => array of books', function(){

      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'title', 'Book in array should contain title');
          assert.property(res.body[0], 'commentcount', 'Book in object should contain commentcount');
          done();
        });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function(){

      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/')
        .query({_id: '5d7f885c5d109541fcfaf516', "comment": "good book"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'no book exists');
          done();
        });
      });

      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        // create test data
        .post('/api/books')
        .send({
          title: 'Test GET /api/books/[id] with valid id in db'
        })
        .end(function(err,res){
          let idToCheck = res.body._id;
          chai.request(server)
          .get('/api/books/'+idToCheck)
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'title', 'Test Book - valid id');
            assert.property(res.body, '_id', 'Book in object should contain _id');
            assert.property(res.body, 'comments', 'Book in object should contain array of comments');
            done();
          });
        });
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){

      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .post('/api/books')
        .send({
          title: 'Book about Test POST /api/books/[id] with comment',
          comment: 'a book comment or review'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body, 'title', 'Book in object should contain title');
          assert.property(res.body, '_id', 'Book in object should contain _id');
          done();
        });
      });

    });

  });

});