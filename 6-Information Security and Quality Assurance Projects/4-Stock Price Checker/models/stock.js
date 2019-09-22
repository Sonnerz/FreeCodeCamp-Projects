const mongoose = require('mongoose');


const stockSchema = new mongoose.Schema({
  symbol: String,
  price: String,
  ip: [String], default: [],
  likes:  Number, default: 0
});

module.exports = mongoose.model('Stock', stockSchema)
