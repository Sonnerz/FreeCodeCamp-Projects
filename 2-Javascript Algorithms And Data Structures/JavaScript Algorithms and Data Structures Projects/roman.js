function convertToRoman(num) {

  let numbers = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
  let romans = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];
  let final = "";

  for(let i=0;i<numbers.length;i++) {
    debugger;
    while (numbers[i] <= num) {
      final += romans[i];
      num -= numbers[i];        
    }
  }
  return final;
}

convertToRoman(36);