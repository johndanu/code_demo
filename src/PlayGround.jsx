import { useEffect, useState } from 'react';
import Task from './playElements/Task';
import Editor from './playElements/Editor';
import Terminal from './playElements/Terminal';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useContentApi } from "./hooks/useContentApi";

const PlayGround = () => {
  const { id } = useParams();
  const [taskcode, setTaskCode] = useState('');
  const [taskDetails, setTaskDetails] = useState(null);
  const [output, setOutput] = useState({});
  const [expectedOutput, setExpectedOutput] = useState({});
  const { getTaskById } = useContentApi();

  useEffect(() => {
    const fetchTaskCode = async () => {
      try {
        const data = await getTaskById(id);
        console.log("Fetched from API:", data);

        if (data) {
          setTaskCode(data.initial_code || `// Write your code here`);
          setTaskDetails({
            id: data.id,
            title: data.header,
            concept: data.concept,
            task: data.description,
            example: data.example
          });
          console.log("type of:",typeof data.initial_test_case.expected_output.consoleOutput);
          console.log("output",data.initial_test_case.expected_output||{});
          setExpectedOutput({
            output: data.initial_test_case.expected_output||{},
          });

          // Handle localStorage task status
          const taskStatusStr = localStorage.getItem('taskStatusList');
          let taskStatusList = taskStatusStr ? JSON.parse(taskStatusStr) : [];
          const exists = taskStatusList.some(task => task.id === parseInt(id));
          if (!exists) {
            taskStatusList.push({ id: parseInt(id), status: false });
            localStorage.setItem('taskStatusList', JSON.stringify(taskStatusList));
          }

          setOutput({});
        } else {
          console.error('No task found for id:', id);
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    fetchTaskCode();
  }, [id]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {!taskDetails ? (
        <div className='flex justify-center items-center w-full h-full'>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div style={{ flex: 4 }}>
            <Task taskDetails={taskDetails} />
          </div>
          <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 2.5 }}>
              <Editor setOutput={setOutput} taskcode={taskcode} output={output} expectedOutput={expectedOutput} />
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
