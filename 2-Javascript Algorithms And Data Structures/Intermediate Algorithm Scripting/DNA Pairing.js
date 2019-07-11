function pairElement(str) {
  let array = str.split(""); //[ 'G', 'C', 'G' ]
  let finalArray = [];
  array.forEach(function(item) {
    let subArray = [];
    if(item === "G") {
      subArray.push(item, "C") 
    } else if (item === "C") {
      subArray.push(item, "G") 
    } else if (item === "A") {
      subArray.push(item, "T") 
    } else if (item === "T") {
      subArray.push(item, "A") 
    }
    finalArray.push(subArray);    
  })
  return finalArray;
} 

===============================================

function pairElement(str) {
  let array = str.split(""); //[ 'G', 'C', 'G' ]
  let finalArray = [];
  let regex = /T|A|G|C/g;

  for(let i = 0; i<array.length; i++) {
    let subArray = [];
    switch(array[i]) {
      case "T":
        subArray.push(array[i], "A");
        break; 
      case "A":
        subArray.push(array[i], "T");
        break;
      case "C":
        subArray.push(array[i], "G");
        break;
      case "G":
        subArray.push(array[i], "C");
        break;
      Default:
        break;       
    }
    finalArray.push(subArray); 
  }
  return finalArray;      
}



// pairElement("GCG"); // [["G", "C"], ["C","G"],["G", "C"]]
//pairElement("ATCGA") // [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]].
//pairElement("TTGAG") // [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]].
pairElement("CTCTA") // [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]].
