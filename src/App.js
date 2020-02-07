import React, { useState, useEffect } from 'react';
import './App.scss';
import inputService from './utils/input';

const App = () => {

  const setDirtPiles = (dirtPiles) => {
    dirtPiles.forEach(dirtPile => {
      document.getElementById(`Y: ${dirtPile.Y}`)
        .children[dirtPile.X]
        .classList.toggle('dirty');
    });
  };

  const setHoover = (hooverX, hooverY, directions, roomX, roomY) => {
    let offset = roomX;
    document.getElementById(`Y: ${hooverY}`)
      .children[hooverX]
      .classList.add('hoover');
    const timeoutFunction = (k) => {
      let hooverLocation = document.getElementById(`Y: ${hooverY}`)
        .children[hooverX];
      hooverLocation.classList.remove('hoover');
      hooverLocation.classList.add('cleaned');
      switch (directions[k]) {
        case 'N':
          if (hooverY >= roomY - 1) break;
          hooverY++;
          document.getElementById(`Y: ${hooverY}`)
            .children[hooverX].classList.remove('cleaned');
          document.getElementById(`Y: ${hooverY}`)
            .children[hooverX].classList.add('hoover');
          break;
        case 'S':
          if (hooverY === 0) break;
          hooverY--;
          document.getElementById(`Y: ${hooverY}`)
            .children[hooverX].classList.remove('cleaned');
          document.getElementById(`Y: ${hooverY}`)
            .children[hooverX].classList.add('hoover');
          break;
        case 'E':
          if ((hooverX + 1) % offset === 0) break;
          hooverX++;
          document.getElementById(`Y: ${hooverY}`)
            .children[hooverX].classList.remove('cleaned');
          document.getElementById(`Y: ${hooverY}`)
            .children[hooverX].classList.add('hoover');
          break;
        case 'W':
          if (hooverX % offset === 0) break;
          hooverX--;
          document.getElementById(`Y: ${hooverY}`)
            .children[hooverX].classList.remove('cleaned');
          document.getElementById(`Y: ${hooverY}`)
            .children[hooverX].classList.add('hoover');
          break;
        default:
          break;
      }
    };
    for (let k = 0; k < directions.length; k++) {
      setTimeout(() => timeoutFunction(k), 200 * (k + 1));
    }
    // document.getElementById(`Y: ${hooverY}`)
    //   .children[hooverX]
    //   .classList.remove('cleaned');
    // document.getElementById(`Y: ${hooverY}`)
    //   .children[hooverX]
    //   .classList.add('hoover');
  };

  const [inputFromBackEnd, setInputFromBackEnd] = useState('');
  useEffect(() => {
    const settingTheInput = async () => {
      let result = await inputService.getInputFromBackend();
      setInputFromBackEnd(result);
      setDirtPiles(result.dirtPatches);
      setHoover(result.hooverXPos, result.hooverYPos, result.drivingInstructions);
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
          className='column'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            border: '1px solid'
          }}
        ></div>
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
