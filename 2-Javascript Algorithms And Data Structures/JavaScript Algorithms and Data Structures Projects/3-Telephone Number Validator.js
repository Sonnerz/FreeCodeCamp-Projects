/*
Return true if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as 
it has the format of a valid US number. The following are examples 
of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555

For this challenge you will be presented with a string such as 
800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate 
or reject the US phone number based on any combination of the 
formats provided above. The area code is required. If the country 
code is provided, you must confirm that the country code is 1. 
Return true if the string is a valid US phone number; otherwise return false.
*/

function telephoneCheck(str) {

  let regexPattern334 = /^((\d{3})|(\(\d{3}\)))(\-|\s)*(\d{3})(\-|\s)(\d{4})$/;

  let regexMatchParenthesis = /^(?:.*?\((?!.*?\))[^)]*|[^(\r\n]*\).*?)/;
  let regexAcceptableChars = /[^0-9|\-|(|)|\s]/;
  let regexSurroundingBrackets = /^(\().*\)$/;
  let newStr = "";

  //check for numbers only and count for 10
  newStr = str.replace(/\D/g,''); //remove nonchars

  if (!(regexSurroundingBrackets).test(str)) {
    console.log("no surrounding brackets");
    if (!(/^\-/).test(str)) {
      console.log("no minus to start");
      if (!(regexMatchParenthesis).test(str)) {
        console.log("no broken brackets");
        if (!(regexAcceptableChars).test(str)) {
          console.log("only - or ( ) allowed");
          if (newStr.length === 11 && newStr[0] == 1 || newStr.length === 10) {
            console.log(newStr);
            return true; 
          } else {
            return false;
          }
        } else {
          return false;
        }      
      } else {
        return false;
      } 
    } else {
      return false;
    }
  } else {
    return false;
  }   
}

//  /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

//   console.log();

    //telephoneCheck("555-555-5555") // a boolean.
    //telephoneCheck("1 555-555-5555") // true.
    //telephoneCheck("1 (555) 555-5555") // true.
    //telephoneCheck("5555555555") // true.
    //telephoneCheck("555-555-5555") // true.
    telephoneCheck("(555)555-5555") // true.
    //telephoneCheck("1(555)555-5555") // true.
    //telephoneCheck("555-5555") // false.
    //telephoneCheck("5555555") // false.
    //telephoneCheck("1 555)555-5555") // false.
    //telephoneCheck("1 555 555 5555") // true.
    //telephoneCheck("1 456 789 4444") // true.
    //telephoneCheck("123**&!!asdf#") // false.
    //telephoneCheck("55555555") // false.
    //telephoneCheck("(6054756961)") // false
    //telephoneCheck("2 (757) 622-7382") // false.
    //telephoneCheck("0 (757) 622-7382") // false.
    //telephoneCheck("-1 (757) 622-7382") // false
    //telephoneCheck("2 757 622-7382") // false.
    //telephoneCheck("10 (757) 622-7382") // false.
    //telephoneCheck("27576227382") // false.
    //telephoneCheck("(275)76227382") // false.
    //telephoneCheck("2(757)6227382") // false.
    //telephoneCheck("2(757)622-7382") // false.
    //telephoneCheck("555)-555-5555") // false.
    //telephoneCheck("(555-555-5555") // false.
    //telephoneCheck("(555)5(55?)-5555") // false.