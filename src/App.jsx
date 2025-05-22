// src/App.jsx
import { useState } from 'react';
import Task from './Task';
import Editor from './Editor';
import Terminal from './Terminal';

const App = () => {
  const [output, setOutput] = useState({});

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
      <div style={{ flex: 4 }}>
        <Task />
      </div>

      <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 2.5 }}>
          <Editor setOutput={setOutput}/>
        </div>
        <div style={{ flex: 1.5 }}>
          <Terminal output={output} />
        </div>
      </div>
    </div>
  );
};

export default App;
