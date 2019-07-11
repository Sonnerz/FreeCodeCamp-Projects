function addTogether() {
  debugger;
  let args = [...arguments];
  let result = 0;
  let x = 0;
  args.map(num => {
    if (typeof num === "string") {
      result = undefined;
    } else if (args.length > 1) {
      x += num;
      result = x;
    } else {
      //result = addTogether(args[0], 3);
      result = function (next) {
        if (!Number.isInteger(next)) {
          return undefined;
        } else {
          return args[0] + next;
        }

      }
    }
  })
  return result;
}

//console.log(addTogether(2, 3)); // 5.
addTogether(2)(3) // 5.
//console.log(addTogether("http://bit.ly/IqT6zt")); // undefined.
//console.log(addTogether(2, "3")); // undefined.
//console.log(addTogether(2)([3]));// undefined.




