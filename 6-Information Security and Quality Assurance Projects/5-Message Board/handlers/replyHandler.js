var ObjectId = require('mongodb').ObjectID;
const models = require('../models/allmodels.js');

function ReplyHandler() {

  this.newReply = function (req, res) {
    let replyText = req.body.text;
    let passwordText = req.body.delete_password;
    let boardTitle = req.params.board;
    let threadId = req.body.thread_id;

    const new_reply = new models.Reply({
      text: replyText,
      delete_password: passwordText,
      thread: threadId
    });

    new_reply.save(function (err, data) {
      if (err) { console.log(err); }
      // find the reply parent (thread), add id to replies array
      models.Thread
        .findOneAndUpdate(
          { _id: threadId },
          { 'bumped_on': new Date(), $push: { 'replies': data._id }, $inc: { replycount: 1 } }
        )
        .then(thread => {
          if (thread == null) {
            res.json({ message: "Cannot find this thread." });
          } else {
            //thread.replies.push(data._id);
            //thread.save(function (err){
            //if (err) {console.log(err);}
            res.redirect('/b/' + boardTitle + '/' + threadId);
            //});
          }
        })
        .catch(err => {
          return res.status(500).json({ message: err.message })
        })
    })

  }


  this.getThreadReplies = function (req, res) {
    let threadId = req.query.thread_id;
    models.Thread.findOne({ _id: threadId })
      .populate({
        path: 'replies',
        options: {
          sort: { "created_on": 1 },
        }
      })
      .then(doc => {
        if (doc == null) {
          res.json({ message: "Cannot find this thread." });
        } else {
          res.json(doc);
        }
      })
      .catch(err => {
        console.error(err)
      })


  }


  this.deleteReply = function (req, res) {
    const threadId = req.body.thread_id;
    const replyPassword = req.body.delete_password;
    const replyId = req.body.reply_id;
    models.Reply.findById(
      { "_id": replyId }
    )
      .select('+delete_password')
      .then(doc => {
        if (doc.delete_password != replyPassword) {
          res.send("incorrect password")
        } else {
          models.Reply.findOneAndUpdate(
            { "_id": replyId },
            { "text": "[deleted]" }, function (err, data) {
              if (err) { console.log(err) };
            }
          )
          res.send("success");
        }

      })
      .catch(err => {
        console.log(err);
      });
  }


  this.reportReply = function (req, res) {
    const threadId = req.body.thread_id;
    const replyId = req.body.reply_id;
    models.Reply.findOneAndUpdate
      (
        { "_id": replyId },
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


} //ReplyHandler()

module.exports = ReplyHandler;
