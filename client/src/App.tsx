import React from 'react';
import './App.css';
import { Main } from './Main';

const App: React.FC = () => {
  return (
    <div className="App" style={{ margin: 0, padding: "20px 40px", backgroundColor: "#282c34", height: '100vh', color: "white", overflow: "hidden" }}>
      <Main/>
    </div>
  );
}

export default App;
