import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { FaPlay, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { runCode } from '../Runcode';
import { useStatusApi } from '../hooks/useStatusApi';
import isEqual from 'lodash/isEqual';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const languageExtensions = {
  javascript: javascript(),
  python: python(),
  html: html(),
};

const Editor = ({ setOutput, taskcode, output, expectedOutput }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const basePath = `/${pathSegments[1]}/${pathSegments[2]}`;
  const [code, setCode] = useState(taskcode || `// Write your code here`);
  const [language, setLanguage] = useState('javascript');
  const [enableCheck, setEnableCheck] = useState(false);
  const [previousCode, setPreviousCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateTaskStatus } = useStatusApi();

  const handleChange = (value) => {
    setCode(value);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    if (code === previousCode) {
      setEnableCheck(true);
    } else {
      setEnableCheck(false);
    }
  }, [code, previousCode]);

  useEffect(() => {
    setCode(taskcode || `// Write your code here`);
    setPreviousCode('');
  }, [taskcode]);

  const handleCheck = async () => {
    if (output.errors.length > 0) {
      alert("Please fix the errors before checking.");
      return;
    }
    console.log("Checking output:", output.logs);
    console.log("Expected output:", expectedOutput.output.consoleOutput);
   if ( expectedOutput.output.consoleOutput!=null && !isEqual(output.logs, expectedOutput.output.consoleOutput)) {
  setShowFailureModal(true);
  return;
}

    const taskUpStatus= await updateTaskStatus(id, 'completed');

    if(taskUpStatus.status === 200){
      fireConfetti();
    }

    

    const taskStatusStr = localStorage.getItem('taskStatusList');
    let taskStatusList = taskStatusStr ? JSON.parse(taskStatusStr) : [];

    const currentId = Number(id);
    const taskIndex = taskStatusList.findIndex(task => task.id === currentId);
    if (taskIndex !== -1) {
      taskStatusList[taskIndex].status = true;
    }

    localStorage.setItem('taskStatusList', JSON.stringify(taskStatusList));

    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

  const handleModalResponse = (goNext) => {
    setShowModal(false);
    if (goNext) {
      navigate(`/syllabus/js/${Number(id) + 1}`);
    } else {
      navigate(basePath, { replace: true });
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <div className="p-2 bg-zinc-900 text-white flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(basePath, { replace: true })}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded flex items-center gap-2"
          >
            <FaArrowLeft />
            Back
          </button>
          <div className="text-sm">
            <label htmlFor="language">Language: </label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="text-white px-2 py-1 rounded"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-2"
            onClick={async () => {
              try {
                const exists = /<!DOCTYPE html>/i.test(code);
                const result = await runCode(code, language, !exists);

                setOutput({
                  logs: result.outputs.map(o => o.content),
                  errors: result.errors
                });
                if (result.errors.length === 0) {
                  setPreviousCode(code);
                }
              } catch (error) {
                setOutput({
                  logs: [],
                  errors: [`Execution failed: ${error.message}`]
                });
              }
            }}
          >
            <FaPlay />
            Run
          </button>

          <button
            disabled={!enableCheck}
            onClick={handleCheck}
            className={`px-3 py-1 rounded flex items-center ${
              enableCheck
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed opacity-60'
            } text-white`}
          >
            Check
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          theme="light"
          extensions={[languageExtensions[language]]}
          onChange={handleChange}
        />
      </div>

      {/* ✅ Success Modal */}
      <Dialog open={showModal} onClose={() => handleModalResponse(false)}>
        <DialogTitle className="text-xl font-semibold text-center">
          Proceed to Next Question?
        </DialogTitle>
        <DialogContent>
          <Typography className="text-gray-700 text-center">
            Are you sure you want to continue to the next question?
          </Typography>
        </DialogContent>
        <DialogActions className="justify-center pb-4">
          <Button
            onClick={() => handleModalResponse(true)}
            variant="contained"
            color="primary"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Yes
          </Button>
          <Button
            onClick={() => handleModalResponse(false)}
            variant="outlined"
            color="error"
            className="hover:bg-red-100"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* ❌ Failure Modal */}
      <Dialog open={showFailureModal} onClose={() => setShowFailureModal(false)}>
        <DialogTitle className="text-xl font-semibold text-center text-red-600">
          Incorrect Output
        </DialogTitle>
        <DialogContent>
          <Typography className="text-gray-700 text-center">
            Output does not match the expected result. Please try again.
          </Typography>
        </DialogContent>
        <DialogActions className="justify-center pb-4">
          <Button
            onClick={() => setShowFailureModal(false)}
            variant="contained"
            color="error"
          >
            Try Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Editor;
