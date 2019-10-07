var ObjectId = require('mongodb').ObjectID;
const models = require('../models/allmodels.js');

function ThreadHandler() {

  let currentBoardId;

  this.getThreads = function (req, res) {
    let boardTitle = req.params.board; //get board from url
    try {
      models.Board.findOne({ board_title: boardTitle })
        .populate({
          path: 'threads',
          options: {
            limit: 10,
            sort: { bumped_on: -1 }
          },
          populate: {
            path: 'replies',
            options: {
              limit: 3,
              sort: { created_on: -1 }
            },
          }
        })
        .exec(function (err, docs) {
          if (docs == null) {
            //return res.status(404).json({ error: "Cannot find board" }) // 404 is cannot find something
            return res.json({ message: "Cannot find board named, " + boardTitle });
          } else {
            currentBoardId = docs._id
            res.json(docs.threads);
          }
        });
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  };


  this.newThread = function (req, res) {
    let threadText = req.body.text;
    let passwordText = req.body.delete_password;
    let boardTitle = req.params.board;

    const new_thread = new models.Thread({
      text: threadText,
      delete_password: passwordText,
      board: currentBoardId
    });

    new_thread.save(function (err, data) {
      if (err) { console.log(err); }
      // find the thread parent (board), add id to threads array
      models.Board
        .findOne({
          board_title: boardTitle
        })
        .then(board => {
          if (board == null) {
            res.json({ message: "Cannot find board named, " + boardTitle });
          } else {
            board.threads.push(data._id);
            board.save(function (err) {
              if (err) { console.log(err); }
              res.json(data);
            });
          }
        })
        .catch(err => {
          return res.status(500).json({ message: err.message })
        })
    })
  };


  this.deleteThread = function (req, res) {
    const threadId = req.body.thread_id;
    const threadPassword = req.body.delete_password;
    models.Thread.findById(
      { "_id": threadId }
    )
      .select('+delete_password')
      .then(doc => {
        if (doc.delete_password != threadPassword) {
          res.send("incorrect password")
        } else {
          doc.deleteOne({ "_id": threadId })
            .then(doc => {
              models.Reply.deleteMany({ "thread": threadId }, function (err, data) { if (err) { console.log(err) } })
            })
            .then(doc => {
              models.Board.updateOne
                (
                  { "_id": currentBoardId },
                  { $pull: { "threads": threadId } }, function (err, data) {
                    if (err) {
                      console.log(err)
                    }
                  }
                )
              res.send("success")
            });

        }
      })
      .catch(err => {
        console.log(err);
      });

  }


  this.reportThread = function (req, res) {
    const threadId = req.body.report_id;
    models.Thread.findOneAndUpdate
      (
        { "_id": threadId },
        { "reported": true },
        { new: true }
      )
      .then(doc => {
        if (doc) {
          res.send("success")
        } else {
          res.send("reporting was not successful")
        }
      })
      .catch(err => {
        return res.status(500).json({ message: err.message })
      })
  }


} //ThreadHandler()

module.exports = ThreadHandler;
