
function checkCashRegister(price, cash, cid) {

  let totalChangeRequired = cash - price;
  let totalCID = 0;
  let totalChangeReturned = 0;
  let cashInDrawer = cid.reverse();
  let coinsObj = { "ONE HUNDRED": 100, "TWENTY": 20, "TEN": 10, "FIVE": 5, "ONE": 1, "QUARTER": 0.25, "DIME": 0.1, "NICKEL": 0.05, "PENNY": 0.01 };
  let change = [];

  // total cash-in-drawer
  for (let i = 0; i < cid.length; i++) {
    totalCID += cid[i][1];
  }
  console.log("totalCID:  " + totalCID.toFixed(2));
  console.log("totalChangeRequired:  " + totalChangeRequired + "\n\n--------------------\n");

  change = getChangeCoins(totalChangeRequired);
  for (let i = 0; i < change.length; i++) {
    totalChangeReturned += change[i][1];
  }

  if (totalCID < totalChangeRequired || totalChangeReturned < totalChangeRequired) {
    return { 'status': "INSUFFICIENT_FUNDS", 'change': [] }
  } else if (totalCID == totalChangeReturned) {
    return { 'status': "CLOSED", 'change': change.reverse() }
  } else {
    return { 'status': "OPEN", 'change': change }
  }

  function getChangeCoins(changeVal) {
    debugger;
    cashInDrawer.map(item => {
      //console.log("NEW LOOP -------------------" + "\n" + "Current item   " + item + "   Current ChangeValue   " + changeVal + "   Current Change   " + change );
      if (+item[1] < +changeVal) {
        changeVal = parseFloat(+changeVal - +item[1]).toFixed(2);
        change.push(item);
      } else if (coinsObj[item[0]] <= +changeVal) {
        let loop = 0;
        while (+item[1] >= +changeVal && +changeVal >= +coinsObj[item[0]]) {
          //console.log("BEFORE WHILE   " + changeVal + "  Current Item  " + item[1]);
          changeVal = parseFloat(+changeVal - +coinsObj[item[0]]).toFixed(2);
          item[1] = parseFloat(+item[1] - +coinsObj[item[0]]).toFixed(2);
          //console.log("AFTER WHILE   " + changeVal + "  Current Item  " + item[1]);
          ++loop;
          //console.log(loop);
        }
        change.push([item[0], +coinsObj[item[0]] * loop]);
      }
    })
    return change;
  }
}
//  console.log();

console.log(
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  // {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
);
