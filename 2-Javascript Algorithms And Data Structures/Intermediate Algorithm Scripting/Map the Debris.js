/*
Return a new array that transforms the elements' average 
altitude into their orbital periods (in seconds).

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on Wikipedia.

The values should be rounded to the nearest whole number. 
The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, 
and the GM value of earth is 398600.4418 km3s-2.

*/


function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var semiMajorAxis = earthRadius / 2;
  var twoPie = Math.pow(Math.PI, 2);

  return arr.map(obj => {
    var a3 = Math.pow(obj.avgAlt + earthRadius, 3);
    var T = Math.round(Math.sqrt((4 * twoPie * a3) / GM))
    return { name: obj.name, orbitalPeriod: T };
  })
}


console.log(orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]));
// [{name: "sputnik", orbitalPeriod: 86400}].


console.log(orbitalPeriod([{ name: "iss", avgAlt: 413.6 }, { name: "hubble", avgAlt: 556.7 }, { name: "moon", avgAlt: 378632.553 }]));
// [{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, {name: "moon", orbitalPeriod: 2377399}].




/*
T = SQRT [(4 • pi2 • R3) / (G*Mcentral)]

Return a new array that transforms the elements' average altitude into their orbital periods (in seconds).

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on Wikipedia.

The values should be rounded to the nearest whole number. The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.

*/

//  console.log();