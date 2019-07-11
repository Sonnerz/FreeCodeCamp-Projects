function uniteUnique(arr) {
  let objArray = arguments; // { '0': [ 1, 3, 2 ], '1': [ 1, [ 5 ] ], '2': [ 2, [ 4 ] ] }
  let copyArray = [...arr];  // [ 1, 3, 2 ]
  let returnArray = [];

  for(let i=1;i<objArray.length;i++) {
    objArray[i].filter(item => {
      if (!copyArray.includes(item)) {
        returnArray.push(item);
      }
    })
  }   
  return copyArray.concat(returnArray);
}


//uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]) // [1, 3, 2, 5, 4].
uniteUnique([1, 3, 2], [1, [5]], [2, [4]]) // [1, 3, 2, [5], [4]].
//uniteUnique([1, 2, 3], [5, 2, 1]) // [1, 2, 3, 5].
//uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]) // [1, 2, 3, 5, 4, 6, 7, 8].
