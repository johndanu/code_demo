// runCode.js

import * as acorn from 'acorn';
import { codeFrameColumns } from '@babel/code-frame';
export function runInIframe(code, language = 'javascript') {
  return new Promise((resolve) => {
    if (language !== 'javascript') {
      resolve(`❌ Language '${language}' not supported`);
      return;
    }

    // Create temporary iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Setup message listener
    const handleMessage = (event) => {
      if (event.data.type === 'sandbox-result') {
        resolve(event.data);
        window.removeEventListener('message', handleMessage);
        document.body.removeChild(iframe);
      }
    };

    window.addEventListener('message', handleMessage);

    // Generate sandbox HTML
    // In runCode.js - update the iframe srcdoc content
iframe.srcdoc = `
  <!DOCTYPE html>
  <html>
  <head>
    <script>
      const outputs = [];
      const errors = [];
      
      // Override console methods
      const originalConsole = { ...console };
      
      console.log = (...args) => {
        outputs.push({ type: 'log', content: args.join(' ') });
        originalConsole.log(...args);
      };
      
      console.error = (...args) => {
        errors.push({ type: 'error', content: args.join(' ') });
        originalConsole.error(...args);
      };
      
      // Improved error handler
      window.onerror = (message, source, lineno, colno, error) => {
        const errorMsg = error ? error.stack : message;
        errors.push({ 
          type: 'unhandled', 
          content: \`\${errorMsg}\\n(at line \${lineno}:\${colno})\`
        });
        return true; // Prevent default error reporting
      };
      
      window.addEventListener('unhandledrejection', (event) => {
        errors.push({ 
          type: 'promise', 
          content: event.reason?.stack || event.reason.toString() 
        });
      });
      
      try {
         const fn = new Function(\`${code}\`);
          fn();
      } catch (err) {
       const stackLine = err.stack?.split('\\n')[1] || '';
  const match = stackLine.match(/<anonymous>:(\\d+):(\\d+)/);
  const line = match ? Number(match[1]) : null;
  const column = match ? Number(match[2]) : null;

       
        errors.push({ 
          type:  err.name, 
          content: \`\${err.message}\\n\${err.stack}\` ,
           line,
          column
        });
      }
      
      // Send results back
      window.parent.postMessage({
        type: 'sandbox-result',
        outputs,
        errors,
        success: errors.length === 0
      }, '*');
    </script>
  </head>
  <body></body>
  </html>
`;
  });
}

// Maintain your original functions for non-iframe use
export function runJavaScript(code) {
  let output = [];
  const originalLog = console.log;

  try {
    console.log = (...args) => {
      output.push(args.join(' '));
    };

    new Function(code)();
    return { outputs: output.map(content => ({ type: 'log', content })), errors: [] };
  } catch (err) {
    return { outputs: [], errors: [{ type: 'execution', content: err.message }] };
  } finally {
    console.log = originalLog;
  }
}

export async function runCode(code, language = 'javascript', useIframe = true) {
  if (useIframe) {
     const syntaxError = validateSyntax(code);
      if (syntaxError) {
      return {
        outputs: [],
        errors: [syntaxError],
        success: false
      };
    }

    return await runInIframe(code, language);
  }
  
  switch (language) {
  case 'javascript': return runJavaScript(code);
  

  default:
    return {
      outputs: [],
      errors: [{
        type: 'language',
        content: `❌ Language '${language}' not supported`
      }],
      success: false
    };
}
}

// Function to validate JavaScript syntax
function validateSyntax(code) {
  try {
    console.log('Validating syntax...', code);
    acorn.parse(code, { ecmaVersion: 2020 });
    return null;
  } catch (err) {
    console.log('Syntax error:', err);
    const loc = err.loc || { line: 1, column: 0 };

    const frame = codeFrameColumns(code, {
      start: { line: loc.line, column: loc.column }
    }, {
      highlightCode: true, // Set true if you're using a terminal or supporting ANSI in the browser
      message: err.message,
      linesAbove: 0, // ← only show error line
      linesBelow: 0
    });

    return {
      type: 'syntax',
      content: `${frame}\n\n${err.name}: ${err.message}`
    };
  }
}
