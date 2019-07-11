//Repeat a given string str (first argument) for num times (second argument). 
//Return an empty string if num is not a positive number.


function repeatStringNumTimes(str, num) {
    let arr = str.split('');
    let newarr = [];

    for (let i = 0; i < num; i++) {
        newarr = newarr.concat(arr);
    }

    return num >= 0 ? newarr.join('') : "";
}

repeatStringNumTimes("abc", -8);