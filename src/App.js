import React, { useState, useEffect } from 'react';
import './App.scss';
import { getInputAPICall } from './utils/input';
import { solveProblem } from './utils/solution';

const App = () => {

  let currentTileClass;
  const getTileClass = (X, Y) => {
    currentTileClass = document.getElementById(`Y: ${Y}`)
      .children[X]
      .classList
  };

  const setDirtPiles = (dirtPiles) => {
    dirtPiles.forEach(dirtPile => {
      getTileClass(dirtPile.X, dirtPile.Y);
      currentTileClass.add('dirty');
    });
  };

  const setAndStartHoover = (input) => {
    let { 
      hooverXPos, 
      hooverYPos, 
      drivingInstructions, 
      roomXDim, 
      roomYDim
    } = input;

    getTileClass(hooverXPos, hooverYPos);
    currentTileClass.add('hoover');
    currentTileClass.remove('dirty');

    const timeoutFunction = (k) => {
      currentTileClass.remove('hoover');
      currentTileClass.add('cleaned');

      switch (drivingInstructions[k]) {
        case 'N':
          if (hooverYPos >= roomYDim - 1) break;
          hooverYPos++;
          break;
        case 'S':
          if (hooverYPos === 0) break;
          hooverYPos--;
          break;
        case 'E':
          if ((hooverXPos + 1) % roomXDim === 0) break;
          hooverXPos++;
          break;
        case 'W':
          if (hooverXPos % roomXDim === 0) break;
          hooverXPos--;
          break;
        default:
          break;
      }

      getTileClass(hooverXPos, hooverYPos);
      currentTileClass.remove('dirty');
      currentTileClass.remove('cleaned');
      currentTileClass.add('hoover');
    };

    for (let k = 0; k < drivingInstructions.length; k++) {
      setTimeout(
        () => timeoutFunction(k), 
        k === 0 ? 1500 : 1500 + 200 * k 
      );
    }
  };

  const [inputFromBackEnd, setInputFromBackEnd] = useState('');
  useEffect(() => {
    const setInputAsync = async () => {
      let result = await getInputAPICall();
      setInputFromBackEnd(result);
      setDirtPiles(result.dirtPatches);
      setAndStartHoover(result);
    }
    setInputAsync();
  }, []);

  const rows = [];
  const indivSquares = [];
  if (inputFromBackEnd) {
    solveProblem(inputFromBackEnd);
    
    let { roomXDim, roomYDim } = inputFromBackEnd;

    for (let j = 0; j < roomXDim; j++) {
      indivSquares.push(
        <div 
          key={`column-${j + 1}`}
          className='square'
        />
      )
    }
    
    for (let i = roomYDim - 1; i >= 0; i--) {
      rows.push(
        <div 
          key={`row-${i + 1}`}
          id={`Y: ${i}`}
          className='row'
        >
          {indivSquares}
        </div>
      );
    }
  }

  return (
    <div className="App">
    {inputFromBackEnd ? (
      <div className='room'>
        {rows}
      </div>
    ) : (
      <p>Loading data...</p>
    )}
    </div>
  );
};

export default App;
