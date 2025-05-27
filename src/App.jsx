
import TableOfContents from './TableofContent';
import Home from './HomePage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
 

  return (
   
    <Routes>
      <Route path="/home" element={<Home  />} />
      <Route path="/" element={<TableOfContents  />} />
    </Routes>
  );
};

export default App;
