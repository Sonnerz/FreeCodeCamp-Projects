//Check if a value is classified as a boolean primitive. 
//Return true or false.

Boolean primitives are true and false.

function booWho(bool) {
    if (typeof bool === 'boolean') {
        return true;
    } else {
        return false;
    }
}

booWho(null);
//booWho(true) // true.
booWho(false) // true.
  //booWho([1, 2, 3]) // false.
  //booWho([].slice) // false.
  //booWho({ "a": 1 }) // false.
  //booWho(1) // false.
  //booWho(NaN) // false.
  //booWho("a") // false.
  //booWho("true") // false.
  //booWho("false") // false.