import React, { useState, useEffect } from 'react';
import './App.scss';
import inputService from './utils/input';

const App = () => {

  const [inputFromBackEnd, setInputFromBackEnd] = useState('');
  useEffect(() => {
    const settingTheInput = async () => {
      let result = await inputService.getInputFromBackend();
      setInputFromBackEnd(result);
    }
    settingTheInput();
  }, []);

  const solveProblem = (      
    roomXDim, 
    roomYDim, 
    dirtPatches, 
    drivingInstructions, 
    hooverXPos, 
    hooverYPos
  ) => {

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
        // console.log('X: ', xPosition, 'Y: ', yPosition);
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
    
    console.log(`${hooverXPos} ${hooverYPos}`);
    console.log(numDirtPilesCleaned);

  };

  const setDirtPiles = (dirtPiles) => {
    console.log(dirtPiles);
    
  }

  const rows = [];
  const indivSquares = [];

  if (inputFromBackEnd !== '') {

    let { roomXDim, 
      roomYDim, 
      dirtPatches, 
      drivingInstructions, 
      hooverXPos, 
      hooverYPos
    } = inputFromBackEnd;

    solveProblem(
      roomXDim, 
      roomYDim, 
      dirtPatches, 
      drivingInstructions, 
      hooverXPos, 
      hooverYPos
    );

    for (let j = 0; j < roomXDim; j++) {
      indivSquares.push(
        <div 
          key={`column-${j + 1}`}
          id={`X: ${j}`}
          className='column'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            border: '1px solid'
          }}
        >
          square {j + 1}
        </div>
      )
    }
    
    
    for (let i = roomYDim - 1; i >= 0; i--) {
      rows.push(
        <div 
          key={`row-${i + 1}`}
          id={`Y: ${i}`}
          className='row'
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          {indivSquares}
        </div>
      );
    }
    setDirtPiles(dirtPatches);
  }

  return (
    <div 
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {inputFromBackEnd !== '' ? (
        <div
          style={{ 
            border: '1px solid', 
            height: '500px', 
            width: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {rows}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
