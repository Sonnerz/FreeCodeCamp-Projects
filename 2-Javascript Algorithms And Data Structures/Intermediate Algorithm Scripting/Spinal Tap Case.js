function spinalCase(str) {
  let regexNonChars = /[\W\_]+/g;
  let regexMixedCase = /[a-z][A-Z]+/g;
  //let regexCaps = /[\W\_]+|[A-Z]+/g;
  let regexAll = /[\W\_]+|[a-z][A-Z]+/g;
  let regexFCC =  /\s+|_+/g;
  let subEl = [];
  let newstr
  //let regexNonChars = /\s+|_+/g;
  let regexCaps = /([a-z])([A-Z])/g;
 
  str = str.replace(regexCaps, '$1 $2');
  return str.replace(regexNonChars, '-').toLowerCase();
}

spinalCase("This Is Spinal Tap") // "this-is-spinal-tap".
spinalCase("thisIsSpinalTap") // "this-is-spinal-tap".
//spinalCase("The_Andy_Griffith_Show") // "the-andy-griffith-show".
//spinalCase("Teletubbies say Eh-oh") // "teletubbies-say-eh-oh".
//spinalCase("AllThe-small Things") // "all-the-small-things"