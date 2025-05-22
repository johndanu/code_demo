
const Terminal = ({output}) => {
  const { logs = [], errors = [] } = output;
  return (
    <div style={{ backgroundColor: 'lightgreen', height: '100%', width: '100%' }}>
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
        <div >
          <div >
            Errors:
          </div>
          {errors.map((error, i) => (
            <div key={`error-${i}`} >
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Terminal;
