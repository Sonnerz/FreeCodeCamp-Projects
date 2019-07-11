//Truncate a string (first argument) if it is longer than the 
//given maximum string length (second argument). 
//Return the truncated string with a ... ending.

function truncateString(str, num) {
    console.log(num);
    let newStr = '';
    if (str.length > num) {
        newStr = str.slice(0, num) + '...';
    } else {
        return str
    }
    return newStr;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);