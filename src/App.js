import React, { useState, useEffect } from 'react';
import './App.scss';
import { getInputAPICall } from './utils/input';
import { solveProblem } from './utils/solution';

const App = () => {

  const [inputFromBackEnd, setInputFromBackEnd] = useState('');
  useEffect(() => {
    const setInputAsync = async () => {
      let result = await getInputAPICall();
      setInputFromBackEnd(result);

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

      setDirtPiles(result.dirtPatches);

      const setAndStartHoover = (input) => {
        let { 
          hooverXPosition, 
          hooverYPosition, 
          drivingInstructions, 
          roomXDimension, 
          roomYDimension
        } = input;

        getTileClass(hooverXPosition, hooverYPosition);
        currentTileClass.add('hoover');
        currentTileClass.remove('dirty');

        const timeoutFunction = (k) => {
          currentTileClass.remove('hoover');
          currentTileClass.add('cleaned');

          switch (drivingInstructions[k]) {
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

          getTileClass(hooverXPosition, hooverYPosition);
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

      setAndStartHoover(result);
    }
    setInputAsync();
  }, []);

  const rows = [];
  const individualSquares = [];
  if (inputFromBackEnd) {
    solveProblem(inputFromBackEnd);
    
    let { roomXDimension, roomYDimension } = inputFromBackEnd;

    for (let j = 0; j < roomXDimension; j++) {
      individualSquares.push(
        <div 
          key={`column-${j + 1}`}
          className='square'
        />
      )
    }
    
    for (let i = roomYDimension - 1; i >= 0; i--) {
      rows.push(
        <div 
          key={`row-${i + 1}`}
          id={`Y: ${i}`}
          className='row'
        >
          {individualSquares}
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
