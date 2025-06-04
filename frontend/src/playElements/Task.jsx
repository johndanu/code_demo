import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const Task = ({ taskDetails }) => {
  const { id,title, concept, task, example } = taskDetails;
  
  return (
    <div className="bg-white shadow-lg overflow-hidden h-full ">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">{id}. {title}</h1>
      </div>

      <div className="p-6 space-y-6">
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Concept</h3>
          <p className="text-gray-600 text-lg leading-relaxed">{concept}</p>
        </section>

        <section>
          <h3 className="text-2xl  font-semibold text-gray-800 mb-3">Task</h3>
          <p className="text-gray-600 text-lg leading-relaxed">{task}</p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Example</h3>
          <div className="relative text-lg rounded-lg overflow-hidden">
            <CodeMirror
              value={example}
              extensions={[javascript()]}
              theme="dark"
              readOnly={true}
              className="min-h-[200px]"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Task;