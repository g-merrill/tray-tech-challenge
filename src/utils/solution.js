const createRoom = (xDimension, yDimension) => {
  return new Array(xDimension * yDimension).fill({ clean: true });
};

const setDirtLocations = (dirtPatches, roomXDimension, roomArray) => {
  dirtPatches.forEach(dirtPatch => {
    let arrayIdx = dirtPatch.Y * roomXDimension + dirtPatch.X;
    roomArray[arrayIdx] = { clean: false };
  });
};

const parseDirections = drivingInstructions => drivingInstructions.split('')

const cleanDirt = (xPosition, yPosition, roomXDimension, roomArray, numDirtPilesCleaned) => {
  let arrayPosition = yPosition * roomXDimension + xPosition;
  if (roomArray[arrayPosition].clean === false) {
    roomArray[arrayPosition] = { clean: true };
    numDirtPilesCleaned++;
  }
  return numDirtPilesCleaned;
};

const solveProblem = (input) => {
  let {
    roomXDimension,
    roomYDimension, 
    dirtPatches, 
    drivingInstructions, 
    hooverXPosition, 
    hooverYPosition
  } = input;
  let numDirtPilesCleaned = 0;

  let roomArray = createRoom(roomXDimension, roomYDimension);

  if (dirtPatches.length) {
    setDirtLocations(dirtPatches, roomXDimension, roomArray);
  }
  
  let parsedDirections = parseDirections(drivingInstructions);
  
  while (parsedDirections.length) {
    // clean dirt pile at current location
    numDirtPilesCleaned = cleanDirt(hooverXPosition, hooverYPosition, roomXDimension, roomArray, numDirtPilesCleaned);
  
    // figure out where hoover goes next
    let directionToMove = parsedDirections.shift();
    switch (directionToMove) {
      case 'N':
        if (hooverYPosition >= roomYDimension - 1) break;
        hooverYPosition++;
        break;
      case 'S':
        if (hooverYPosition === 0) break;
        hooverYPosition--;
        break;
      case 'E':
        if ((hooverXPosition + 1) % roomXDimension === 0) break;
        hooverXPosition++;
        break;
      case 'W':
        if (hooverXPosition % roomXDimension === 0) break;
        hooverXPosition--;
        break;
      default:
        break;
    }
  }
  
  // clean dirt pile at final location
  numDirtPilesCleaned = cleanDirt(hooverXPosition, hooverYPosition, roomXDimension, roomArray, numDirtPilesCleaned);
  
  // print output to console
  console.log(
`${hooverXPosition} ${hooverYPosition}
${numDirtPilesCleaned}`
  );
};

export {
  solveProblem
};