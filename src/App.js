import React, { useState, useEffect } from 'react';
import './App.scss';
import inputService from './utils/input';

const App = () => {

  const [inputFromBackEnd, setInputFromBackEnd] = useState('');
  useEffect(() => {
    const settingTheInput = async () => {
      let result = await inputService.getInputFromBackend();
      setInputFromBackEnd(result);
      console.log(result);
    }
    settingTheInput();
  }, []);

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
    for (let j = 0; j < roomXDim; j++) {
      indivSquares.push(
        <div>square {j + 1}</div>
      )
    }
    
    
    
    for (let i = roomYDim - 1; i >= 0; i--) {
      rows.push(
        <div>
          row {i}:
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
            width: '500px' 
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
