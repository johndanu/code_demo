import { useState } from 'react';
import Task from './home/Task';
import Editor from './home/Editor';
import Terminal from './home/Terminal';
import { useLocation } from 'react-router-dom';
const Home = () => {
  const location = useLocation();
  const taskcode = location.state?.taskcode || '//write your code here'; 
     const [output, setOutput] = useState({});
  return (
     <div style={{ display: 'flex', height: '100vh' }}>
      
      <div style={{ flex: 4 }}>
        <Task />
      </div>

      <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 2.5 }}>
          <Editor setOutput={setOutput} taskcode={taskcode} />
        </div>
        <div style={{ flex: 1.5 }}>
          <Terminal output={output} />
        </div>
      </div>
    </div>
  )
}

export default Home