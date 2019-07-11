function destroyer(arr) {
  //console.log(arguments); //{ '0': [ 1, 2, 3, 1, 2, 3 ], '1': 2, '2': 3 }
  //convert arguments to real array
  let allArgsArray = [...arguments]; // [ [ 1, 2, 3, 1, 2, 3 ], 2, 3 ]
  let elementsArray = [];
  // get lose elements into their own array
  for (let i=1;i<allArgsArray.length;i++) {
    elementsArray.push(allArgsArray[i]); // [ 2, 3 ]
  }
  let newArray = [];
  arr.filter(item => {
      if(!elementsArray.includes(item)) {
        newArray.push(item);
      }
  }); 
  return newArray  // [1, 1]
}

OR ==========================

 function destroyer(arr) {
  let allArgsArray = [...arguments]; // [ [ 1, 2, 3, 1, 2, 3 ], 2, 3 ]
  let newArray = [];
  arr.filter(item => {
      if(!allArgsArray.includes(item)) {
        newArray.push(item);
      }
  }); 
  return newArray 
} 



//destroyer([1, 2, 3, 1, 2, 3], 2, 3) // [1, 1].
//destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3) // [1, 5, 1].
//destroyer([3, 5, 1, 2, 2], 2, 3, 5) // [1].
//destroyer([2, 3, 2, 3], 2, 3) // [].
//destroyer(["tree", "hamburger", 53], "tree", 53) // ["hamburger"].
destroyer(["possum", "trollo", 12, "safari", "hotdog", 92, 65, "grandma", "bugati", "trojan", "yacht"], "yacht", "possum", "trollo", "safari", "hotdog", "grandma", "bugati", "trojan") //  [12,92,65]