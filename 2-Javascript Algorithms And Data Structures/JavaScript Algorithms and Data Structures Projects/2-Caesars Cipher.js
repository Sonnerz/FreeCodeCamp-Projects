function rot13(str) { // LBH QVQ VG!
  let regexNonChars = /[\W]+/g;
  let array = str.split("");
  let decodedLetter = "";
  let decodedStr = "";

  for (let i = 0; i < array.length; i++) {
    if (!regexNonChars.test(array[i])) {
      debugger;
      let code = str.charCodeAt(i);      
      if(code>=65 && code<= 77){
        decodedLetter = String.fromCharCode(code + 13);
      } else if(code>=78 && code<=90) {
        decodedLetter = String.fromCharCode(code - 13);
      }
    } else {
        decodedLetter = array[i];
    } 
    decodedStr += decodedLetter;  
  }
  return decodedStr;
}
 

rot13("SERR PBQR PNZC") // FREE CODE CAMP
rot13("SERR CVMMN!") // FREE PIZZA!
rot13("SERR YBIR?") // FREE LOVE?
console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")); // THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.