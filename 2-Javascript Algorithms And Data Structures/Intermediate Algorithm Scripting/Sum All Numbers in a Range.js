/*
We'll pass you an array of two numbers. 
Return the sum of those two numbers plus 
the sum of all the numbers between them.

The lowest number will not always come first.
*/

function sumAll(arr) {
  let sortedArray = arr.sort((a,b) => a - b);

  let newFullArray = [];
  for (let i = sortedArray[0]; i <= sortedArray[1]; i++) {
    newFullArray.push(i);
  }

  let sumOfArray = newFullArray.reduce((a,b) => a + b); 
  return sumOfArray;
}

sumAll([1, 4]) // a number.
sumAll([1, 4]) // 10.
sumAll([4, 1]) // 10.
sumAll([5, 10]) // 45.
sumAll([10, 5]) //45.
