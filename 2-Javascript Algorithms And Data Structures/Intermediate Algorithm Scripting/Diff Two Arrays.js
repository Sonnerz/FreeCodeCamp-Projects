function diffArray(arr1, arr2) {
  var newArr = [];
  let sortedArr = [];
  // Same, same; but different.
  sortedArr = arr1.concat(arr2).sort((a,b) => a > b ? 1 : -1);
  //console.log(sortedArr);

  sortedArr.filter(item => {
    if (!arr1.includes(item) || !arr2.includes(item)) {
      newArr.push(item);
    }
  })

  return newArr;
}

//diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

//diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]) // an array.

//diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]); // ["pink wool"].

//diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]); // an array with one item.

//diffArray(["andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]); // ["diorite", "pink wool"].

//diffArray(["andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]); // an array with two items.

//diffArray(["andesite", "grass", "dirt", "dead shrub"], ["andesite", "grass", "dirt", "dead shrub"]); // [].

//diffArray(["andesite", "grass", "dirt", "dead shrub"], ["andesite", "grass", "dirt", "dead shrub"]); // an empty array.

//diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]); // [4].

//diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]); // an array with one item.

//diffArray([1, "calf", 3, "piglet"], [1, "calf", 3, 4]); // ["piglet", 4].

//diffArray([1, "calf", 3, "piglet"], [1, "calf", 3, 4]); // an array with two items.

//diffArray([], ["snuffleupagus", "cookie monster", "elmo"]); // ["snuffleupagus", "cookie monster", "elmo"].

//diffArray([], ["snuffleupagus", "cookie monster", "elmo"]); // an array with three items.

diffArray([1, "calf", 3, "piglet"], [7, "filly"]); // [1, "calf", 3, "piglet", 7, "filly"].

//diffArray([1, "calf", 3, "piglet"], [7, "filly"]); // an array with six items. 

