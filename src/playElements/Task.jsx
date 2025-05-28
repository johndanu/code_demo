
const Task = ({taskDetails}) => {
  return (
    <div style={{ backgroundColor: 'lightcoral', height: '100%', width: '100%' }}>
      <h2>Task</h2>
      <p>{taskDetails}</p>
    </div>
  );
};

export default Task;
