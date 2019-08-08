const mongoose = require('mongoose');
const validator = require('validator');
const shortid = require('shortid');

// create Schema
const Schema = mongoose.Schema;

// user Schema
const userSchema = new Schema({
  username: {
    'type': String,
    'required': true,
    validate: (value) => {
      return validator.isAlphanumeric(value)
    }
  },
  _id: {
    'type': String,
    'default': shortid.generate
  },
  count: {
    'type': Number,
    'default': 0
  },
  log: [
    {
      description: {
        'type': String,
        'required': true
      },
      duration: {
        'type': Number,
        'default': 0
      },
      date: {
        'type': Date,
        'default': 0
      }
    }
  ]
});

module.exports = mongoose.model('UserLog', userSchema)