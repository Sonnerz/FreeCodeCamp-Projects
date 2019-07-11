function myReplace(str, before, after) {
  let newStr = "";

  if(before.charAt(0) === before.charAt(0).toUpperCase()) { // if first char of before is a cap
    after = after.charAt(0).toUpperCase() + after.slice(1);
  } 
    newStr = str.replace(before, after);

  return newStr;
}

====================================

function myReplace(str, before, after) {
  let newStr = "";
  let indexOfBefore = str.indexOf(before); //6
  
  if(before.charAt(0) === before.charAt(0).toUpperCase()) {
    after = after.charAt(0).toUpperCase() + after.slice(1);
    before = str.substr(indexOfBefore, before.length)
    //console.log(locationOfBefore);
  } 
  newStr = str.replace(before, after);

  return newStr;
}

===========================================

function myReplace(str, before, after) {
  let regexCaps = new RegExp(before,"gi");
  let regexCapsCheck = /^[A-Z]/g;
  let newStr = "";

  if(before.match(regexCapsCheck)) { // if first char of before is a cap
    after = after.charAt(0).toUpperCase() + after.slice(1);
  } 
    newStr = str.replace(regexCaps, after);

  return newStr;
}


//myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
//myReplace("Let us go to the store", "store", "mall") // "Let us go to the mall".
//myReplace("He is Sleeping on the couch", "Sleeping", "sitting") // "He is Sitting on the couch".
//myReplace("This has a spellngi error", "spellngi", "spelling") // "This has a spelling error".
//myReplace("His name is Tom", "Tom", "john") // "His name is John".
myReplace("Let us get back to more Coding", "Coding", "algorithms") // "Let us get back to more Algorithms".

