/*
Return the length of the longest word in the provided sentence.

Your response should be a number.
*/

function findLongestWordLength(str) {
    str = str.split(' ');
    //console.log(str);  //[ 'The', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'dog' ]
    let longest = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i].length > longest) {
            longest = str[i].length;
            //console.log("AFTER:  " + longest + str[i]);  // 3The  5quick  5brown  6jumped
        }
    }
    return longest;
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");