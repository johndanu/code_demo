// Editor.jsx
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { FaPlay } from 'react-icons/fa';
import './codemirror-fix.css';
import { runCode } from './Runcode'; // Adjust the import path as necessary

const languageExtensions = {
  javascript: javascript(),
  python: python(),
  html: html(),
};

const Editor = ({setOutput}) => {
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');

  const handleChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

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
    console.log('Running code:', code);
    const result = await runCode(code, language, true); // true for iframe usage
    console.log('Execution result:', result);
    setOutput({
      logs: result.outputs.map(o => o.content),
      errors: result.errors.map(e => e.content)
    });
  } catch (error) {
    console.log('Error during execution:', error);
    console.error('Execution error:', error);
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
