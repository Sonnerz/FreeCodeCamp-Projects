function reverseString(str) {
    let rStr = [...str];
    console.log("converted to arrary:  " + rStr + ' - ' + typeof (rStr)); // converted to arrary:  h,e,l,l,o - object

    rStr.reverse();
    console.log("reversed:  " + rStr + ' - ' + typeof (rStr)); // reversed:  o,l,l,e,h - object

    rStr = rStr.join('').toString();
    console.log("Back to String:  " + rStr + ' - ' + typeof (rStr)); // Back to String:  olleh - string

    return str;
}

console.log(reverseString("hello"));




//   function reverseString(str) {
//     str = [...str].reverse().join('').toString();
//     return str;
//   }