import React, { useState, useEffect } from 'react';
import './App.scss';
import { getInputAPICall } from './utils/input';
import { solveProblem } from './utils/solution';

const App = () => {

  const setDirtPiles = (dirtPiles) => {
    dirtPiles.forEach(dirtPile => {
      document.getElementById(`Y: ${dirtPile.Y}`)
        .children[dirtPile.X]
        .classList.toggle('dirty');
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

    let currentTileClass;
    const getTileClass = (hY, hX) => {
      currentTileClass = document.getElementById(`Y: ${hY}`)
        .children[hX]
        .classList
    };

    getTileClass(hooverYPos, hooverXPos);
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

      getTileClass(hooverYPos, hooverXPos);
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
