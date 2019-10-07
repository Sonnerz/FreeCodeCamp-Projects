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
var expect = chai.expect;
var server = require('../server');
var ObjectId = require('mongodb').ObjectID;
const models = require('../models/allmodels.js');
var request = require('supertest')
var should = require('should')

chai.use(chaiHttp);

chai.use(require('chai-as-promised'));

let boardId = "5d9a41be671eb600c4609782";
let threadId;
let replyId;


suite('Functional Tests', function () {

  suite('API ROUTING FOR /api/threads/:board', function () {

    suite('POST /api/threads/:board  post new thread', function () {
      test('Create Thread', function (done) {
        chai.request(server)
          .post('/api/threads/test')
          .send(
            {
              boardTitle: 'test',
              text: 'POST - New thread - thread text',
              delete_password: '1234',
              board: boardId,
            })
          .end(function (err, res) {
            expect(err).to.be.null;
            threadId = res.body._id;
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an Object');
            assert.property(res.body, 'text');
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'bumped_on');
            assert.property(res.body, 'replycount');
            assert.property(res.body, '_id');
            done();
          });
      });

    });


    suite('GET /api/threads/:board  get all threads', function () {
      test('All threads', function (done) {
        chai.request(server)
          .get('/api/threads/test')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'text', 'Thread should contain title');
            assert.property(res.body[0], 'bumped_on', 'Thread object should contain bumped_on');
            assert.property(res.body[0], 'created_on', 'Thread object should contain created_on');
            assert.property(res.body[0], 'replycount', 'Thread object should contain replycount');
            assert.notProperty(res.body[0], 'reported', 'Thread object should not contain reported');
            assert.notProperty(res.body[0], 'delete_password', 'Thread object should not contain delete_password');
            done();
          });
      });
    });


    suite('DELETE /api/threads/:board  delete a thread', function () {
      test('Delete a thread', function (done) {
        chai.request(server)
          //create test thread
          .post('/api/threads/test')
          .send(
            {
              boardTitle: 'test',
              text: 'POST - New thread to delete',
              delete_password: '1234',
              board: boardId,
            })
          .end(function (err, res) {
            let idToDelete = res.body._id;
            chai.request(server)
              .delete('/api/threads/test')
              .send({ thread_id: idToDelete, delete_password: '1234' })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "success");
                done();
              })
          });
      });
    });


    suite('PUT /api/threads/:board  update a thread', function () {
      test('Report a thread', function (done) {
        chai.request(server)
          //create test thread
          .post('/api/threads/test')
          .send({ boardTitle: 'test', text: 'PUT - New thread to report', delete_password: '1234', board: boardId })
          .end(function (err, res) {
            let idToUpdate = res.body._id;
            chai.request(server)
              .put('/api/threads/test')
              .send({
                report_id: idToUpdate,
                reported: true,
                new: true
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "success");
                done();
              });
          });
      });
    });



    suite('API ROUTING FOR /api/replies/:board', function () {

      suite('POST /api/replies/:board  create a new reply', function () {
        test('Create new Reply', function (done) {
          chai.request(server)
            .post('/api/replies/test')
            .send({
              text: 'POST - This is a functional test reply',
              delete_password: '1234',
              thread_id: threadId
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'response should be an object');
              expect(res).to.redirect;
              expect(res).to.redirectTo(res.request.url);
              done();
            });
        });

      });


      suite('GET /api/replies/:board  get all replies', function () {
        test('All replies', function (done) {
          chai.request(server)
            .get('/api/replies/test?thread_id=' + threadId)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'response should be an object');
              assert.property(res.body.replies[0], 'created_on', 'Reply should have a property: created_on');
              assert.property(res.body.replies[0], 'text', 'Reply should have a property: text');
              assert.property(res.body.replies[0], 'thread', 'Reply should have a property: thread');
              assert.notProperty(res.body.replies[0], 'reported', 'Reply should not contain property: reported');
              assert.notProperty(res.body.replies[0], 'delete_password', 'Reply should not contain property: delete_password');
              done();
            });
        });
      });


      suite('PUT /api/replies/:board  update a reply', function () {
        test('Report Reply', function (done) {
          chai.request(server)
            .put('/api/replies/test')
            .send({
              reply_id: '5d9aff9d65cb6637029ee894',
              reported: true
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.text, "success");
              done();
            });
        });
      });


      suite('DELETE', function () {
        test('Delete a reply', function (done) {
          chai.request(server)
            .delete('/api/replies/test')
            .send({ reply_id: '5d9affe6b6c31837e24ca7c1', delete_password: '1234' })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.text, "success");
              done();
            })
        });
      });

    });
  });
});
