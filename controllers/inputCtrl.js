const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
  try {

    let input = fs.readFileSync('input.txt', 'utf8');
    input = input.split('\n');
    
    const roomDimensions = input.shift();
    const roomXDim = parseInt(roomDimensions[0]);
    const roomYDim = parseInt(roomDimensions[2]);
    
    const hooverInitialPosition = input.shift();
    let hooverXPos = parseInt(hooverInitialPosition[0]);
    let hooverYPos = parseInt(hooverInitialPosition[2]);
    
    let numDirtPatches = input.length - 1;
    let dirtPatches = [];
    while (numDirtPatches > 0) {
      let dirtPatch = input.shift();
      dirtPatches.push({ X: parseInt(dirtPatch[0]), Y: parseInt(dirtPatch[2])});
      numDirtPatches--;
    }
    
    let drivingInstructions = input.shift();
    
    // console.log(`roomDimensions: ${roomXDim} x ${roomYDim}`);
    // console.log(`hooverInitialPosition: X: ${hooverXPos}, Y: ${hooverYPos}`);
    // console.log('dirtPatches: ', dirtPatches);
    // console.log(`drivingInstructions: ${drivingInstructions}`);

    const data = { 
      roomXDim, 
      roomYDim, 
      dirtPatches, 
      drivingInstructions, 
      hooverXPos, 
      hooverYPos,
    };

    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
