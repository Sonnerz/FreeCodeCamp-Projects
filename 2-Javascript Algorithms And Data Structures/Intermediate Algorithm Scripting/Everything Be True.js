/*
Check if the predicate (second argument) is truthy 
on all elements of a collection (first argument).

In other words, you are given an array collection of objects. 
The predicate pre will be an object property and you need 
to return true if its value is truthy. Otherwise, return false.

In JavaScript, truthy values are values that translate to 
true when evaluated in a Boolean context.

Remember, you can access object properties through either 
dot notation or [] notation.
*/

function truthCheck(collection, pre) {
  let result;
  debugger;

  result = collection.map(obj => {
    if (!Object.keys(obj).includes(pre) ||
      obj[pre] == undefined ||
      obj[pre] == 0 ||
      obj[pre] == null ||
      obj[pre] == "" ||
      Number.isNaN(obj[pre])) {
      return false;
    } else {
      return true;
    }
  });
  console.log(result);

  return result.every(function (currentValue) {
    return currentValue === true;
  });
}

//  console.log();

//console.log(truthCheck([{ "user": "Tinky-Winky", "sex": "male" }, { "user": "Dipsy", "sex": "male" }, { "user": "Laa-Laa", "sex": "female" }, { "user": "Po", "sex": "female" }], "sex"));
// true.

//console.log(truthCheck([{ "user": "Tinky-Winky", "sex": "male" }, { "user": "Dipsy" }, { "user": "Laa-Laa", "sex": "female" }, { "user": "Po", "sex": "female" }], "sex"));
// false.

//console.log(truthCheck([{ "user": "Tinky-Winky", "sex": "male", "age": 0 }, { "user": "Dipsy", "sex": "male", "age": 3 }, { "user": "Laa-Laa", "sex": "female", "age": 5 }, { "user": "Po", "sex": "female", "age": 4 }], "age"));
// false.

//console.log(truthCheck([{ "name": "Pete", "onBoat": true }, { "name": "Repeat", "onBoat": true }, { "name": "FastFoward", "onBoat": null }], "onBoat"));
// false

//console.log(truthCheck([{ "name": "Pete", "onBoat": true }, { "name": "Repeat", "onBoat": true, "alias": "Repete" }, { "name": "FastFoward", "onBoat": true }], "onBoat"));
// true

//console.log(truthCheck([{ "single": "yes" }], "single")); // true

//console.log(truthCheck([{ "single": "" }, { "single": "double" }], "single")); // false

//console.log(truthCheck([{ "single": "double" }, { "single": undefined }], "single")); // false

console.log(truthCheck([{ "single": "double" }, { "single": NaN }], "single")); // false


