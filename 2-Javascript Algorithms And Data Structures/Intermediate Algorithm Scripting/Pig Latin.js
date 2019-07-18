  /*
Translate the provided string to pig latin.

Pig Latin takes the first consonant (or consonant cluster) of an English word, 
moves it to the end of the word and suffixes an "ay".

If a word begins with a vowel you just add "way" to the end.

Input strings are guaranteed to be English words in all lowercase.
  */  
  
  
  let regexConsStart = /^[^aeoiu]+/g;
  let ay = "ay";
  let way = "way";
  let remainingString = "";
  let removedCons = "";
  
  if (regexConsStart.test(str)) { // if cons at start of string
    removedCons = str.match(regexConsStart); // find all cons at start ["gl"]
    //console.log(removedCons);
    let consArray = removedCons[0].split(""); // split cons into array for each con ["g", "l"]
    //console.log(consArray);
    remainingString = str.slice(consArray.length); // ove
    return remainingString + removedCons + ay; // ove + gl + ay
  } else {
    return str + way;
  } 

===================================================

function translatePigLatin(str) {
  let regexConsStart = /^[^aeoiu]+/g;
  let ay = "ay";
  let way = "way";
  let remainingString = "";
  let removedCons = "";
  
  if (regexConsStart.test(str)) { // if cons at start of string
    removedCons = str.match(regexConsStart); // find all cons at start ["gl"]
    remainingString = str.substring(removedCons[0].length); // ove
    return remainingString + removedCons + ay; // ove + gl + ay
  } else {
    return str + way;
  } 
}




//translatePigLatin("consonant"); //
//translatePigLatin("california") // "aliforniacay".
//translatePigLatin("paragraphs") // "aragraphspay".
translatePigLatin("glove") // "oveglay".
//translatePigLatin("algorithm") // "algorithmway".
//translatePigLatin("eight") // "eightway".
//translatePigLatin("frghti") // "ifrghtay".
//translatePigLatin("glyphs") // "glyphsay".
//Should handle words where the first vowel comes in the end of the word.
//Should handle words without vowels.

