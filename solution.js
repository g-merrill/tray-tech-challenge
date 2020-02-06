const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

input = input.split('\n');

const roomDimensions = input.shift();
const roomXDim = parseInt(roomDimensions[0]);
const roomYDim = parseInt(roomDimensions[2]);
const hooverPosition = input.shift();
const hooverXPos = hooverPosition[0];
const hooverYPos = hooverPosition[2];
let numDirtPatches = input.length - 1;
let dirtPatches = [];
while (numDirtPatches > 0) {
  let dirtPatch = input.shift();
  dirtPatches.push({ X: parseInt(dirtPatch[0]), Y: parseInt(dirtPatch[2])});
  numDirtPatches--;
}
const drivingInstructions = input.shift();

console.log(`roomDimensions: ${roomXDim} x ${roomYDim}`);
console.log(`hooverPosition: X: ${hooverXPos}, Y: ${hooverYPos}`);
console.log('dirtPatches: ', dirtPatches);
console.log(`drivingInstructions: ${drivingInstructions}`);



// create the room as an array
  // lets make it an array of objects
// lets flatten the array, by keeping track of an additional offset variable


let roomArray = new Array(roomXDim * roomYDim).fill({ clean: true });
let offset = roomXDim;
if (dirtPatches.length) {
  dirtPatches.forEach(dp => {
    let arrayIdx = dp.Y * offset + dp.X;
    roomArray[arrayIdx] = { clean: false };
  })
}

