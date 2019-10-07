var ObjectId = require('mongodb').ObjectID;
const models = require('../models/allmodels.js');

function BoardHandler() {

  this.postNewBoards = function(req, res) {
    const boardTitle = req.body.boardtitle;
    const new_board = new models.Board({
      board_title: boardTitle
    });
    // check for duplicate board
    models.Board
    .findOne({
      board_title: boardTitle
    })
    .then(doc => {
      if (doc) {
        res.json({'message':"This board already exists, try again."});
      } else {
        new_board.save(function (err, data) {
          res.json({
            "board_title": data.board_title,
            "_id": data._id
          });
        });
      }
    })
    .catch(err => {
      console.error(err)
    })
  }


    this.getAllBoards = function (req, res) {
    try {
      models.Board.find({})
        .populate({
          path: 'threads',
          options: {
            limit: 1,
            sort: { bumped_on: -1 }
          }
        })
        .sort({ 'threads': -1 })
        .exec(function (err, docs) {
          if (docs == null) {
            return res.json({ message: "Cannot find any boards " });
          } else {
            res.json(docs);
          }
        });
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

}

module.exports = BoardHandler;