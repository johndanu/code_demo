import { useState } from 'react';
import TableOfContents from './TableofContent';
import PlayGround from './PlayGround';
import LoginPage from './LoginPage';
import Home from './HomePage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const[isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  
 

  return (
   
    <Routes>
      {isLoggedIn &&(<Route path="/syllabus/js/:id" element={<PlayGround  />} />)}
      <Route path="/syllabus/js" element={<TableOfContents isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />} />
      <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
