// Editor.jsx
import { useState,useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { FaPlay,FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams ,useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';


import { runCode } from '../Runcode'; // Adjust the import path as necessary

const languageExtensions = {
  javascript: javascript(),
  python: python(),
  html: html(),
};

const Editor = ({setOutput,taskcode}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // ["", "syllabus", "js", "1"]
  const basePath = `/${pathSegments[1]}/${pathSegments[2]}`; // "/syllabus/js"
  const [code, setCode] = useState(taskcode || `// Write your code here`);
  const [language, setLanguage] = useState('javascript');
  const [enableCheck, setEnableCheck] = useState(false);
  const [previousCode, setPreviousCode] = useState('');
  const navigate= useNavigate();
  const{id}=useParams();

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
      if(code===previousCode){
        setEnableCheck(true);
      }
      else{
        setEnableCheck(false);
      }
  
  }, [code, previousCode]);

  useEffect(() => {
  setCode(taskcode || `// Write your code here`);
  setPreviousCode('');
}, [taskcode]);
  

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Language Selector + Run Button */}
      <div style={{ 
        padding: '8px', 
        background: '#222', 
        color: '#fff', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div className='flex space-x-4 '>
          <button
            onClick={() => navigate(basePath, { replace: true })
}
            style={{
              backgroundColor: '#555',
              color: 'white',
              border: 'none',
              padding: '6px 10px',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FaArrowLeft />
            Back
          </button>
          <div>
            <label htmlFor="language">Language: </label>
            <select id="language" value={language} onChange={handleLanguageChange}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
            </select>
          </div>
        </div>
        
        <div className='flex space-x-4'>
           <button style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          cursor: 'pointer',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        
          // In your main component where the Run button exists
onClick={async () => {
  try {
    const exists=/<!DOCTYPE html>/i.test(code);
    const result = await runCode(code, language,!exists); // true for iframe usage
    console.log('Execution result:', result);
    setOutput({
      logs: result.outputs.map(o => o.content),
      errors: result.errors
    });
    
    if(result.errors.length===0 ) {
      setPreviousCode(code); // Update previousCode only if there are no errors
      
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
          onClick={async () => {
  if (enableCheck) {
    // 🎉 Show confetti
    fireConfetti();

    // ✅ Update localStorage
    const taskStatusStr = localStorage.getItem('taskStatusList');
    let taskStatusList = taskStatusStr ? JSON.parse(taskStatusStr) : [];

    const currentId = Number(id);
    const taskIndex = taskStatusList.findIndex(task => task.id === currentId);
    if (taskIndex !== -1) {
      taskStatusList[taskIndex].status = true;
    }

    localStorage.setItem('taskStatusList', JSON.stringify(taskStatusList));

    // ⏳ Wait before navigation (e.g., 1.5 seconds)
    setTimeout(() => {
      navigate(`/syllabus/js/${currentId + 1}`);
    }, 2000);
  }
}}



         style={{
          backgroundColor:enableCheck? '#0000FF': '#A9A9A9',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          cursor: enableCheck? 'pointer':'not-allowed',
           borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          opacity: enableCheck ? 1 : 0.6, 
          // gap: '2px'
        }}
        >
         Check
        </button>
        </div>
       
      </div>

      {/* Code Editor */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <CodeMirror
          value={code}
          height="100%"
          theme="light"
          extensions={[languageExtensions[language]]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Editor;
