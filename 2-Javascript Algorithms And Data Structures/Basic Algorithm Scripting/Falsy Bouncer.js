// Remove all falsy values from an array.
// Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.
// Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.



function bouncer(arr) {
    // Don't show a false ID to this bouncer.
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        console.log("VALUES:   " + arr[i] + "  " + Boolean(arr[i]));
        if (Boolean(arr[i]) === true) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
}

/////////////////////////////////////////////////////////////

function bouncer(arr) {
    // Don't show a false ID to this bouncer.
    let newArray = arr.filter((elem) => Boolean(elem) === true);
    return newArray;
}

/////////////////////////////////////////////////////////////

function bouncer(arr) {
    // Don't show a false ID to this bouncer.
    let newArray = arr.filter((elem) => Boolean(elem));
    return newArray;
}

console.log(bouncer([7, "ate", "", false, 9]));


//bouncer([7, "ate", "", false, 9]) //[7, "ate", 9].
//bouncer(["a", "b", "c"]) //["a", "b", "c"].
//bouncer([false, null, 0, NaN, undefined, ""]) //[].
//bouncer([1, null, NaN, 2, undefined]) //[1, 2].