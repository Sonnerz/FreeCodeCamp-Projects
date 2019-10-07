const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  board_title: {
    'type': String
  },
  threads: [{
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'Thread'
  }]
});


const ThreadSchema = new Schema({
  "text": {
    'type': String
  },
  "delete_password": {
    'type': String,
    'select': false
  },
  "created_on": {
    'type': Date,
    'default': new Date()
  },
  "bumped_on": {
    'type': Date,
    'default': new Date()
  },
  "reported": {
    'type': Boolean,
    'select': false,
    'default': false
  },
  "replycount": {
    'type': Number,
    'default': 0
  },
  "board": {
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'Board'
  },
  replies: [{
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'Reply'
  }]
});


const ReplySchema = new Schema({
  "text": {
    'type': String
  },
  "delete_password": {
    'type': String,
    'select': false
  },
  "created_on": {
    'type': Date,
    'default': new Date()
  },
  "reported": {
    "type": Boolean,
    "select": false,
    "default": false
  },
  "thread": {
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'Thread'
  }
});


const Board = mongoose.model('Board', BoardSchema);
const Thread = mongoose.model('Thread', ThreadSchema);
const Reply = mongoose.model('Reply', ReplySchema);

module.exports = {
  Board: Board,
  Thread: Thread,
  Reply: Reply
};