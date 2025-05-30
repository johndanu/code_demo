import React, { useState, useEffect } from 'react';

const CodeDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const codeExample = `// Welcome to CODE DEMO!
// Let's write your first JavaScript program

function greetUser(name) {
  // This function says hello
  return "Hello, " + name + "!";
}

// Call the function
const greeting = greetUser("Coder");
console.log(greeting); // Outputs: Hello, Coder!

// Try changing the name to yours!`;

  useEffect(() => {
    if (currentStep < codeExample.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedCode(codeExample.substring(0, currentStep + 1));
        setCurrentStep(currentStep + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else if (currentStep >= codeExample.length) {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentStep(0);
          setDisplayedCode('');
          setIsTyping(true);
        }, 3000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isTyping]);

  const highlightCode = (line) => {
    return line
      .split(/(\/\/.*|"[^"]*"|function|const|let|var|return|if|else|for|while)/)
      .map((part, i) => {
        if (part.match(/^\/\/.*/)) {
          return <span key={i} className="text-slate-500">{part}</span>;
        }
        if (part.match(/^"[^"]*"$/)) {
          return <span key={i} className="text-amber-400">{part}</span>;
        }
        if (part.match(/^(function|const|let|var|return|if|else|for|while)$/)) {
          return <span key={i} className="text-indigo-400">{part}</span>;
        }
        return part;
      });
  };

  return (
    <div className="relative bg-slate-900 p-4 sm:p-6">
      {/* Code editor header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-slate-400">JavaScript</div>
      </div>
      
      {/* Code content */}
      <pre className="text-sm sm:text-base font-mono overflow-auto p-2 rounded text-white">
        <code className="language-javascript">
          {displayedCode.split('\n').map((line, index) => (
            <div key={index} className="block">
              {highlightCode(line)}
            </div>
          ))}
          <span className={`inline-block w-2 h-5 bg-indigo-400 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
        </code>
      </pre>
      
      
     
    </div>
  );
};

export default CodeDemo;