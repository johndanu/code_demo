import { useEffect, useState } from 'react';
import Task from './playElements/Task';
import Editor from './playElements/Editor';
import Terminal from './playElements/Terminal';
import {  useParams } from 'react-router-dom';
import tocData from './Db/TableofContent.json'; 
import CircularProgress from '@mui/material/CircularProgress';


const PlayGround = () => {
  
  const { id } = useParams(); // dynamic id from URL
  const[taskcode, setTaskCode] = useState('');
  const [taskDetails, setTaskDetails] = useState({});
  useEffect(() => {
  const fetchTaskCode = async () => {
    const data = tocData.find(item => item.id === parseInt(id));

    if (data) {
      setTaskCode(data.intialCode ? data.intialCode : `// Write your code here`);
      setTaskDetails({
        id: data.id,
        title:data.lesson,
        concept:data.concept,
        task:data.Task,
        example:data.codeexample
      });
    } else {
      console.error('Task or initial code not found for id:', id);
    }

    // --- Local Storage Task Status Handling ---
    const taskStatusStr = localStorage.getItem('taskStatusList');
    let taskStatusList = taskStatusStr ? JSON.parse(taskStatusStr) : [];

    const exists = taskStatusList.some(task => task.id === parseInt(id));
    if (!exists) {
      taskStatusList.push({ id: parseInt(id), status: false });
      localStorage.setItem('taskStatusList', JSON.stringify(taskStatusList));
    }
  };

  fetchTaskCode();
  setOutput({});
}, [id]);


  const [output, setOutput] = useState({});

  return (

    <div style={{ display: 'flex', height: '100vh' }}>
      {taskDetails === '' && (
        <div className='flex justify-center items-center w-full h-full'>
          <CircularProgress />
        </div> 
      )}
     
      {taskDetails !== '' && (
        <>
          <div style={{ flex: 4 }}>
            <Task taskDetails={taskDetails} />
          </div>
          <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 2.5 }}>
              <Editor  setOutput={setOutput} taskcode={taskcode} />
            </div>
            <div style={{ flex: 1.5 }}>
              <Terminal  output={output} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayGround;
