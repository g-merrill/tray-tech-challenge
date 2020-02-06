const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');

input = input.split('\n');

const roomDimensions = input.shift();
const roomXDim = parseInt(roomDimensions[0]);
const roomYDim = parseInt(roomDimensions[2]);
const hooverPosition = input.shift();
let hooverXPos = parseInt(hooverPosition[0]);
let hooverYPos = parseInt(hooverPosition[2]);
let numDirtPatches = input.length - 1;
let dirtPatches = [];
while (numDirtPatches > 0) {
  let dirtPatch = input.shift();
  dirtPatches.push({ X: parseInt(dirtPatch[0]), Y: parseInt(dirtPatch[2])});
  numDirtPatches--;
}
let drivingInstructions = input.shift();

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

drivingInstructions = drivingInstructions.split('');
let numDirtPilesCleaned = 0;

const cleanDirt = (xPosition, yPosition) => {
  let arrayPosition = yPosition * offset + xPosition;
  roomArray[arrayPosition] = { clean: true };
};

while (drivingInstructions.length) {
  const directionToMove = drivingInstructions.shift();

// clean dirt pile
  cleanDirt(hooverXPos, hooverYPos);

// figure out where to go next
  switch (directionToMove) {
    case 'N':
      if (hooverYPos >= roomYDim - 1) break;
      hooverYPos += 1;
      break;
    case 'S':
      if (hooverYPos === 0) break;
      hooverYPos -= 1;
      break;
    case 'E':
      if ((hooverXPos + 1) % offset === 0) break;
      hooverXPos += 1;
      break;
    case 'W':
      if (hooverXPos % offset === 0) break;
      hooverXPos -= 1;
      break;
    default:
      break;
  }
}

// clean dirt pile at final location
cleanDirt(hooverXPos, hooverYPos);

console.log(`${hooverXPos} ${hooverYPos}`);
console.log(numDirtPilesCleaned);