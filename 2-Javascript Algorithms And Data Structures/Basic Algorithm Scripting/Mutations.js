// Return true if the string in the first element of the array contains all of the 
// letters of the string in the second element of the array.

// For example, ["hello", "Hello"], should return true because all of the letters 
// in the second string are present in the first, ignoring case.

// The arguments ["hello", "hey"] should return false because the string "hello" 
// does not contain a "y".

// Lastly, ["Alien", "line"], should return true because all of the letters 
// in "line" are present in "Alien".

function mutation(arr) {
    const str1 = arr[0].toLowerCase();
    const str2 = arr[1].toLowerCase();
    let count = 0;

    for (let i = 0; i < str2.length; i++) {
        if (str1.includes(str2[i])) {
            count++;
            console.log(count);
        }
    }
    if (count >= str2.length) {
        return true;
    } else {
        return false;
    }
}
  
/////////////////////////////////////////

mutation(["yxwvutsrqponmlkjihgfedcba", "zqrstu"]) // false.
  //mutation(["hello", "hey"]) // false.
  //mutation(["hello", "Hello"]) // true.
  //mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]) // true.
  //mutation(["Mary", "Army"]) // true.
  //mutation(["Mary", "Aarmy"]) // true.
  //mutation(["voodoo", "oo"]) // true.
  //mutation(["Alien", "line"]) // true.
  //mutation(["floor", "for"]) // true.
  //mutation(["hello", "neo"]) // false.
  //mutation(["voodoo", "no"]) // false.