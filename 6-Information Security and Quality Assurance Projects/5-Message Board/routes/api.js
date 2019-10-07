/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const mongoose = require('mongoose');
const BoardHandler = require('../handlers/boardHandler.js');
const ThreadHandler = require('../handlers/threadHandler.js');
const ReplyHandler = require('../handlers/replyHandler.js');
const models = require('../models/allmodels.js');

const CONNECTION_STRING = process.env.DB;

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function () {
  console.log("We're connected! " + mongoose.connection.readyState);
});

module.exports = function (app) {

  const boardHandler = new BoardHandler();
  const threadHandler = new ThreadHandler();
  const replyHandler = new ReplyHandler();

  app.route('/api/threads/:board')
    .get(threadHandler.getThreads)
    .post(threadHandler.newThread)
    .delete(threadHandler.deleteThread)
    .put(threadHandler.reportThread)


  app.route('/api/replies/:board')
    .post(replyHandler.newReply)
    .get(replyHandler.getThreadReplies)
    .delete(replyHandler.deleteReply)
    .put(replyHandler.reportReply)


  app.route('/newboard')
    .post(boardHandler.postNewBoards) // POST - ADD NEW BOARD

  app.route('/api/boards')
    .get(boardHandler.getAllBoards) // GET - ALL BOARDS

};
