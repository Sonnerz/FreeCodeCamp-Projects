function palindrome(str) {
  let regexNonChars = /\W|\_/g;
  let newStr = str;
  let reverseStr = "";

  if(regexNonChars.test(str)){
    debugger;
    newStr = str.replace(regexNonChars, '').toLowerCase();

  }
  reverseStr = newStr.split('').reverse().join('');
  
 /*  if(reverseStr == newStr){
    return true;
  } else {
    return false;
  } */

  return reverseStr == newStr
}

palindrome("eye") //a boolean.
palindrome("eye") //true.
palindrome("_eye") //true.
palindrome("race car") //true.
palindrome("not a palindrome") //false.
palindrome("A man, a plan, a canal. Panama") //true.
palindrome("never odd or even") //true.
palindrome("nope") //false.
palindrome("almostomla") //false.
palindrome("My age is 0, 0 si ega ym.") //true.
//palindrome("1 eye for of 1 eye.") //false.
//palindrome("0_0 (: /-\ :) 0-0") //true.
//palindrome("five|\_/|four") //false.