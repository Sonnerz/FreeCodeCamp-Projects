/*
Sum all the prime numbers up to and including the provided number.

A prime number is defined as a number greater than one and having 
only two divisors, one and itself. For example, 2 is a prime 
number because it's only divisible by one and two.

The provided number may not be a prime.
*/

function sumPrimes(num) {
  let array = [];
  let sum = 0;
  array = getPrimes(num);
  sum = array.reduce(function(a, b) {
    return a + b;
  });

  function getPrimes(max) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
      if (!sieve[i]) {
        primes.push(i);
        for (j = i << 1; j <= max; j += i) {
          sieve[j] = true;
        }
      }
    }
    return primes;
  }
  return sum;
}


//=================



function sumPrimes(num) {
  let array = [];
  let sum = 0;
  array = getPrimes(num);
  sum = array.reduce(function(a, b) {
    return a + b;
  });

  function getPrimes(max) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
      if (!sieve[i]) {
        primes.push(i);
        for (j = i << 1; j <= max; j += i) {
          sieve[j] = true;
        }
      }
    }
    return primes;
  }
  return sum;
}





//sumPrimes(10);
//sumPrimes(10) // 17.
//sumPrimes(977) // 73156.
sumPrimes(60) // 440.




sumPrimes(10);


