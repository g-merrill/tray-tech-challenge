const solveProblem = (input) => {
  let {
    roomXDim, 
    roomYDim, 
    dirtPatches, 
    drivingInstructions, 
    hooverXPos, 
    hooverYPos
  } = input;


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
    if (roomArray[arrayPosition].clean === false) {
      roomArray[arrayPosition] = { clean: true };
      numDirtPilesCleaned++;
    }
  };
  
  while (drivingInstructions.length) {
    const directionToMove = drivingInstructions.shift();
  
  // clean dirt pile
    cleanDirt(hooverXPos, hooverYPos);
  
  // figure out where to go next
    switch (directionToMove) {
      case 'N':
        if (hooverYPos >= roomYDim - 1) break;
        hooverYPos++;
        break;
      case 'S':
        if (hooverYPos === 0) break;
        hooverYPos--;
        break;
      case 'E':
        if ((hooverXPos + 1) % offset === 0) break;
        hooverXPos++;
        break;
      case 'W':
        if (hooverXPos % offset === 0) break;
        hooverXPos--;
        break;
      default:
        break;
    }
  }
  
  // clean dirt pile at final location
  cleanDirt(hooverXPos, hooverYPos);
  
  console.log(
`${hooverXPos} ${hooverYPos}
${numDirtPilesCleaned}`
  );

};

export {
  solveProblem
};