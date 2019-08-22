/*
*
*
*       Complete the handler logic below
*
*
*/

function ConvertHandler() {

  this.getNum = function(input) {
    const numberArray = input.slice(0, input.search(/[a-z]/i));
    // if there are no numbers set the input to 1 else set the input to the numbers
    input = numberArray == "" ? 1 : numberArray;
    // if input is != 1 or if it's a fraction then eval the fraction else return the input
    input = input!=1 && input.indexOf('/') > -1 ? +(input.substr(0, input.indexOf('/'))) / +(input.substr(input.indexOf('/') + 1)) : +input;
    // if the input is not a number then convert it and return else 'Invalid number'
    return !isNaN(+input) ? +input : 'Invalid number';

  };

  this.getUnit = function(input) {
    var unitRegex = /^gal$|^[l]*l[l]*$|^lbs$|^kg$|^mi$|^km$/i// match: gal,lbs,kg,mi,km,l
    input = input.match(/[a-z]/gi).join(""); // ["m", "i"] to mi
    return unitRegex.test(input) ? input : 'Invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    var result;
    if(initUnit != 'Invalid unit'){
       switch (initUnit.toLowerCase()) {
        case "gal":
          return result = "l";
        case "l":
          return result = "gal";
        case "lbs":
          return result = "kg";
        case "kg":
          return result = "lbs";
        case "mi":
          return result = "km";
        case "km":
          return result = "mi";
        default:
          return result = "";
      }
    }  else {
      result = "";
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    const fullUnitName = {
      gal: "gallons",
      l: "litres",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometres"
    }
    return fullUnitName[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    if(initNum != 'Invalid number' && initUnit != 'Invalid unit') {
       switch (initUnit.toLowerCase()) {
        case "gal":
          //convert 'gal' to 'L'
          result = (initNum * galToL).toFixed(5);
          return +result;
        case "l":
          //convert 'L' to 'gal'
          result = (initNum / galToL).toFixed(5);
          return +result;
        case "lbs":
          //convert 'lbs' to 'kg'
          result = (initNum * lbsToKg).toFixed(5);
          return +result;
        case "kg":
          //convert 'kg' to 'lbs'
          result = (initNum / lbsToKg).toFixed(5);
          return +result;
        case "mi":
          //convert 'mi' to 'km'
          result = (initNum * miToKm).toFixed(5);
          return +result;
        case "km":
          //convert 'km' to 'mi'
          result = (initNum / miToKm).toFixed(5);
          return +result;
      }
    } else {
      result = "";
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;

    if(initUnit == 'Invalid unit' && initNum == 'Invalid number') {
      result = "Invalid number and unit"
    } else if(initUnit == 'Invalid unit' && initNum != 'Invalid number') {
      result = `${initUnit}`
    } else if(initNum == 'Invalid number' && initUnit != 'Invalid unit') {
      result = `${initNum}`
    } else {
      result = `${initNum} ${this.spellOutUnit(initUnit)} convert to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }
    return result;
  };

}

module.exports = ConvertHandler;


