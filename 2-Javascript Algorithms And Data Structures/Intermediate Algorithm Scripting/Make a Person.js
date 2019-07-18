/*
Fill in the object constructor with the following methods below:

getFirstName() getLastName() getFullName() setFirstName(first) 
setLastName(last) setFullName(firstAndLast)
Run the tests to see the expected output for each method.

The methods that take an argument must accept only one 
argument and it has to be a string.

These methods must be the only available means of 
interacting with the object.

*/

var Person = function (firstAndLast) {
  let nameArray = firstAndLast.split(" ");
  let firstName = nameArray[0];
  let lastName = nameArray[1];

  this.getFirstName = function () {
    return firstName;
  }

  this.getLastName = function () {
    return lastName;
  }

  this.getFullName = function () {
    return firstName + " " + lastName;
  };

  this.setFirstName = function (first) {
    firstName = first;
  };

  this.setLastName = function (last) {
    lastName = last;
  };

  this.setFullName = function (firstAndLast) {
    let array = firstAndLast.split(" ");
    firstName = array[0];
    lastName = array[1];
  };

};



var bob = new Person('Bob Ross');

bob.setFullName("Haskell Curry")
console.log(bob.getLastName()); // "Curry"

console.log(Object.keys(bob).length); // 6.
//console.log(bob instanceof Person); // true.
//console.log(bob.firstName); // undefined.
//console.log(bob.lastName); // undefined.
//console.log(bob.getFirstName()); // "Bob".
//console.log(bob.getLastName()); // "Ross".
//console.log(bob.getFullName()); // "Bob Ross".
//bob.getFullName() // "Haskell Ross" after bob.setFirstName("Haskell").
//bob.getFullName() // "Haskell Curry" after bob.setLastName("Curry").
//bob.getFullName() // "Haskell Curry" after bob.setFullName("Haskell Curry").
//bob.getFirstName() // "Haskell" after bob.setFullName("Haskell Curry").
//bob.getLastName() // "Curry" after bob.setFullName("Haskell Curry").


//  console.log();

/*
Fill in the object constructor with the following methods below:

getFirstName() getLastName() getFullName() setFirstName(first) setLastName(last) setFullName(firstAndLast)
Run the tests to see the expected output for each method.

The methods that take an argument must accept only one argument and it has to be a string.

These methods must be the only available means of interacting with the object.
*/