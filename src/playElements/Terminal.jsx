
const Terminal = ({output}) => {
  const { logs = [], errors = [] } = output;

  
  return (
    <div style={{ backgroundColor: 'black', height: '100%', width: '100%',color:'white',padding: '10px', overflowY: 'auto' }}>
      <h2>Terminal</h2>
      {logs.length > 0 && (
        <div >
          {logs.map((log, i) => (
            <div key={`log-${i}`}>
              {log}
            </div>
          ))}
        </div>
      )}

      {errors.length > 0 && (
            <div>
              <div>Errors:</div>
              {errors.map((error, i) => {
                console.log(error);
                const errorType = error.type;
                const message = error.content;
                const lineInfo = (error.line && error.column)
                  ? ` (line: ${error.line>1?error.line-2:error.line}, column: ${error.column})`
                  : '';
                
                return (
                  <div key={`error-${i}`}>
                    {`${errorType=='syntax'?'SyntaxError':errorType}: ${message}${lineInfo}`}
                  </div>
                );
              })}
            </div>
          )}

    </div>
  );
};

export default Terminal;
