/*
Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined.
*/

function fearNotLetter(str) {
  let compare = "abcdefghijklmnopqrstuvwxyz";
  let missingLetter = [];
  // let compareArray = compare.split("");
  // let strArray = str.split("");

  // STEPS TO GET compareSlice USING ARRAYS:
  // let indexStrStart = compareArray.indexOf(strArray[0]) // 18 - index of str in compare
  // let compareSlice = compareArray.slice(compareArray.indexOf(strArray[0])) // [ 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]
  // let sliceLength = compareSlice.slice(0, strArray.length+1) // [ 's', 't', 'u', 'v', 'w', 'x' ]

  // let compareSlice = compareArray.slice(compareArray.indexOf(strArray[0])).slice(0, strArray.length+1) // [ 's', 't', 'u', 'v', 'w', 'x' ]
  
  /*
  USING SPLICE()
  let compareSlice = compareArray.splice(compareArray.indexOf(strArray[0]), strArray.length+1) // [ 's', 't', 'u', 'v', 'w', 'x' ]
  missingLetter = compareSlice.filter(item => {
    if (!strArray.includes(item)) {
      return item;
    }
  }) 
  */

  // USING STRINGS
  let compareSlice = compare.substr(compare.indexOf(str[0]), str.length+1) // stuvwx
  
  missingLetter = compareSlice.split("").filter(item => {
    if (!str.includes(item)) {
      return item;
    }
  })
  
  if (missingLetter.length == 0) {
    return undefined
  } else {
    return missingLetter.toString();
  }
}


//fearNotLetter("abce") // "d".
//fearNotLetter("abcdefghjklmno") // "i".
fearNotLetter("stvwx") // "u".
//fearNotLetter("bcdf") // "e".
//fearNotLetter("abcdefghijklmnopqrstuvwxyz") // undefined.

//   console.log();