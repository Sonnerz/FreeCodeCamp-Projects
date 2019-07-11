//Write a function that splits an array (first argument) into groups the length of size (second argument) and 
//returns them as a two-dimensional array.

function chunkArrayInGroups(arr, size) {
    // Break it up.
    let newArr = [];
    for (let i = 0; i < arr.length; i + size) {
        //console.log(arr);
        let subArr = arr.splice(0, size)
        //console.log(arr);
        //console.log(subArr);
        newArr = newArr.concat([subArr]);
    }
    //console.log(newArr);
    return newArr;
}

//OR

function chunkArrayInGroups(arr, size) {
    let newArr = [];
    for (let i = 0; i < arr.length; i += size) {
        let subArr = arr.slice(i, i + size)
        newArr.push(subArr);
    }
    return newArr;
}


chunkArrayInGroups(["a", "b", "c", "d"], 2); //[["a", "b"], ["c", "d"]]

  //chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3) // [[0, 1, 2], [3, 4, 5]].
  //chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2) // [[0, 1], [2, 3], [4, 5]].
  //chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4) // [[0, 1, 2, 3], [4, 5]].
  //chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3) // [[0, 1, 2], [3, 4, 5], [6]].
  //chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4) // [[0, 1, 2, 3], [4, 5, 6, 7], [8]].
  //chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 2) // [[0, 1], [2, 3], [4, 5], [6, 7], [8]].