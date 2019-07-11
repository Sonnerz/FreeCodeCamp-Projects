//Return an array consisting of the largest number from each provided sub-array. 
//For simplicity, the provided array will contain exactly 4 sub-arrays.


function largestOfFour(arr) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        //console.log(Math.max(...arr[i]));
        let largest = Math.max(...arr[i]);
        newArray.push(largest);
        console.log("newArray: " + newArray);
    }
    return newArray;
}

largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]])