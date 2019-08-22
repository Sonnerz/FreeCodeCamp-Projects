/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      var input = req.query.input; // get user input
      if (input == "") {
        res.send("Please add a value to convert")
      } else {
        var initNum = convertHandler.getNum(input); // get the number without unit
        var initUnit = convertHandler.getUnit(input); // get the unit: gal, lbs, mi
        var returnNum = convertHandler.convert(initNum, initUnit); // get the converted number
        var returnUnit = convertHandler.getReturnUnit(initUnit); // get the converted unit | invalid unit
        var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

        res.json({
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          string: toString
        })
      }

    });

};
