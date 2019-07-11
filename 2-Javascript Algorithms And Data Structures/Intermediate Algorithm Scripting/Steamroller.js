function steamrollArray(arr) {
  debugger;
  return arr.reduce(function (acc, item) {
    if (Array.isArray(item)) {
      return acc.concat(steamrollArray(item));
    }
    return acc.concat(item);
  }, [])
}

console.log(steamrollArray([[["a"]], [["b"]]])); // ["a", "b"].
console.log(steamrollArray([1, [2], [3, [[4]]]])); // [1, 2, 3, 4].
console.log(steamrollArray([1, [], [3, [[4]]]])); // [1, 3, 4].
console.log(steamrollArray([1, {}, [3, [[4]]]])); // [1, {}, 3, 4].

//   console.log(); 