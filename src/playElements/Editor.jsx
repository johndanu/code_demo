// Editor.jsx
import { useState,useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { FaPlay } from 'react-icons/fa';

import { runCode } from '../Runcode'; // Adjust the import path as necessary

const languageExtensions = {
  javascript: javascript(),
  python: python(),
  html: html(),
};

const Editor = ({setOutput,taskcode}) => {
  const [code, setCode] = useState(taskcode || `// Write your code here`);
  const [language, setLanguage] = useState('javascript');
  const [enableCheck, setEnableCheck] = useState(false);
  const [previousCode, setPreviousCode] = useState('');

  const handleChange = (value) => {
    setCode(value);
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
        <div>
          <label htmlFor="language">Language: </label>
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
          </select>
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
    if(result.errors.length===0) {
      setPreviousCode(code); // Update previousCode only if there are no errors
      ;
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
