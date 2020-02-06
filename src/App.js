import React, { useState, useEffect } from 'react';
import './App.scss';
import { getInputFromBackend } from './utils/input';

const App = () => {
  const [inputFromBackEnd, setInputFromBackEnd] = useState('');
  useEffect(() => {
    const settingTheInput = async () => {
      let result = await getInputFromBackend();
      setInputFromBackEnd(result);
    }
    settingTheInput();
  }, [])
  return (
    <div className="App">
      Hello world
      {inputFromBackEnd}
    </div>
  );
};

export default App;
