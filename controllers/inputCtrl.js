const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async (req, res) => {
  try {

    let input = fs.readFileSync('input.txt', 'utf8');
    input = input.split('\n');
    
    let roomDimensions = input.shift();
    roomDimensions = roomDimensions.split(' ');
    const roomXDimension = parseInt(roomDimensions[0]);
    const roomYDimension = parseInt(roomDimensions[1]);
    
    let hooverInitialPosition = input.shift();
    hooverInitialPosition = hooverInitialPosition.split(' ');
    let hooverXPosition = parseInt(hooverInitialPosition[0]);
    let hooverYPosition = parseInt(hooverInitialPosition[1]);
    
    let numDirtPatches = input.length - 1;
    let dirtPatches = [];
    while (numDirtPatches > 0) {
      let dirtPatch = input.shift();
      dirtPatch = dirtPatch.split(' ');
      dirtPatches.push({ X: parseInt(dirtPatch[0]), Y: parseInt(dirtPatch[1])});
      numDirtPatches--;
    }
    
    let drivingInstructions = input.shift();

    res.json({
      roomXDimension, 
      roomYDimension, 
      hooverXPosition, 
      hooverYPosition,
      dirtPatches, 
      drivingInstructions, 
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
