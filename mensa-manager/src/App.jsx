// src/App.js
import React from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture';
import Welcome from './components/Welcome'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Welcome />
        <WebcamCapture />
      </header>
    </div>
  );
}

export default App;
