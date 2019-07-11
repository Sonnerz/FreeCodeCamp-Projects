function binaryAgent(str) {
  let array = str.split(" ");
  let code = "";
  let newStr = "";
  array.forEach(function (number) {
    code = String.fromCharCode("0" + parseInt((number), 2)); // 73 number
    newStr += code;
  });
  return newStr;
}

// EXPLAIN
//code = String.fromCharCode("0" + parseInt((number), 2)); 
// convert each binary 01001001 to a decimal (parseInt(number, base)), add a leading 0
// convert that decimal back to its string value: 073 to I
// build up string



/* ATTEMPT 1 ----------------------------------
function binaryAgent(str) {
  let array = str.split(" ");
  let binToDec = 0;
  let regex = /[^\s]+/g;
  let characterCode = "";
  let newStr = "";

  for (let i = 0; i < array.length; i++) {
    binToDec = array[i].match(regex).toString(); // 01001001 string
    characterCode = parseInt((binToDec), 2);  // 73 number

    if (characterCode.toString().length === 2) { //leading zero ... 73 should be 073
      characterCode = "0" + characterCode;
    } else {
      characterCode.toString();
    }
    characterCode = String.fromCharCode(characterCode); // code back to its string value
    newStr += characterCode; // build up new string
  }
  return newStr;
} 
--------------------------------------*/



console.log(binaryAgent("01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001"));
// "I love FreeCodeCamp!"


//console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"));
// "Aren't bonfires fun!?"

//   console.log();


