/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;

module.exports = function (app) {


  app.route('/api/books')

    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        let db = client.db('fcc-personal-library');
        db.collection('books').find({}).toArray((err, docs) => {
          if (docs) {
            let obj;
            obj = docs.map(i => {
              return {
                title: i.title,
                _id: i._id,
                commentcount: i.comments.length
              }
            })
            return res.json(obj);
          } else {
            res.send("no books")
          }
          db.close();
        });
      });
    })

    .post(function (req, res) {
      var title = req.body.title;
      if (!title) {
        res.json({ "message": "No title submitted" })
      } else {
        //response will contain new book object including atleast _id and title
        MongoClient.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
          let db = client.db('fcc-personal-library');
          db.collection('books').insertOne(
            {
              title: title,
              comments: []
            }, (err, doc) => {
              if (err) {
                res.send(err);
              } else {
                res.json({ _id: doc.insertedId, title: doc.ops[0].title });
              }
            });
        });
      }
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        let db = client.db('fcc-personal-library');
        db.collection('books').deleteMany({}, (err, doc) => {
          if (err) {
            res.send(err)
          } else {
            res.json("complete delete successful")
          }
        })
      });
    });



  app.route('/api/books/:id')

    .get(function (req, res) {
      var bookid = req.params.id;
      if (ObjectId.isValid(bookid)) {
        bookid = ObjectId(bookid);
      } else {
        res.send("not found")
        return res.end();
      }
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        let db = client.db('fcc-personal-library');
        db.collection('books').find({ "_id": bookid }).toArray((err, doc) => {
          if (!doc.length == 0) {
            return res.send(doc[0]);
          } else {
            res.send("no book exists")
          }
        });
      });

    })

    .post(function (req, res) {
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
      if (comment == "") {
        res.json("No comment sent")
      } else {
        MongoClient.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
          let db = client.db('fcc-personal-library');
          if (ObjectId.isValid(bookid)) {
            db.collection('books').find({ "_id": ObjectId(bookid) }).toArray((err, doc) => {
              if (doc == "") {
                res.send("no book exists");
              } else {
                db.collection('books').updateOne({ _id: ObjectId(bookid) }, { $push: { "comments": comment } });
                db.collection('books').find({ "_id": ObjectId(bookid) }).toArray((err, doc) => {
                  res.send(doc[0]);
                });
              }
            });
          } else {
            res.send("no book exists");
          }



        });
      }
    })

    .delete(function (req, res) {
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      MongoClient.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        let db = client.db('fcc-personal-library');
        try {
          db.collection('books').deleteOne({ "_id": ObjectId(bookid) }, (err, doc) => {
            doc.deletedCount === 1 ? res.json("Delete successful") : res.json("Delete unsuccessful");
          });
        } catch (err) {
          res.json(err);
        }
      });
    });

};

