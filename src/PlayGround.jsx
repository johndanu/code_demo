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
  const [taskDetails, setTaskDetails] = useState('');
  useEffect(() => {
    // Fetch the task code based on the id from the URL
    const fetchTaskCode = async () => {
      // try {
      //   // const response = await fetch(`/api/tasks/${id}`); // Adjust the API endpoint as necessary
      //   // if (!response.ok) {
      //   //   throw new Error('Network response was not ok');
      //   // }
      //   const data = tocData.find(item => item.id === parseInt(id));
      //   // const data = await response.json();
      //   setTaskCode(data.code); // Assuming the API returns an object with a 'code' property
      // } catch (error) {
      //   console.error('Error fetching task code:', error);
      // }
        const data = tocData.find(item => item.id === parseInt(id));
        if (data) {
          setTaskCode(data.intialCode?data.intialCode:`// Write your code here`); // Assuming the task code is stored in a 'code' property
          setTaskDetails(data.task? data.task : ''); // Assuming the task details are stored in a 'task' property
        } else {
          console.error('Task or intial code not found for id:', id);
        }

    };

    fetchTaskCode();
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
              <Editor setOutput={setOutput} taskcode={taskcode} />
            </div>
            <div style={{ flex: 1.5 }}>
              <Terminal output={output} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayGround;
