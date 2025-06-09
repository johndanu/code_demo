import { useState,useEffect } from "react";
import tocData from './Db/TableofContent.json'; 
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt,FaSignOutAlt,FaCheckCircle,FaHourglassHalf  } from 'react-icons/fa'; 
import { useAuthApi } from './hooks/useAuthApi'; 

const TableOfContents = ({isLoggedIn,setIsLoggedIn}) => {
  const [items, setItems] = useState([]);
  const { logout } = useAuthApi(); // Import the logout function from the custom hook
  useEffect(() => {
     const taskStatusStr = localStorage.getItem('taskStatusList');
    const taskStatusList = taskStatusStr ? JSON.parse(taskStatusStr) : [];

    // Map tocData to include a "status" based on localStorage (default: false)
    const itemsWithStatus = tocData.map(item => {
      const matched = taskStatusList.find(task => task.id === item.id);
      return {
        ...item,
        title: item.tittle,
        status: matched && isLoggedIn  ? matched.status : "undefined", // Default to "undefined" if not found
      };
    });

    setItems(itemsWithStatus);

  }, []);
 
  const navigate = useNavigate();
  const handleItemClick = (item) => {
    if (!isLoggedIn) {
      const confirmed = window.confirm("You must log in to view this content. Do you want to log in and continue?");
      if (confirmed) {
        // Push the intended URL first
        window.history.pushState(null, '', `/syllabus/js/${item.id}`);
        // Then navigate to login
        navigate('/login');
      }
      return;
    }

    // If logged in, proceed normally
    navigate(`/syllabus/js/${item.id}`);
  };

const handleAuthClick = async() => {
  if (isLoggedIn) {

    try{

    const refresh_token= localStorage.getItem('refresh_token'); // store user info if needed  
    const res = await logout(refresh_token);
    console.log('Logout successful:', res);
    setIsLoggedIn(false);
    localStorage.removeItem('access_token'); // Remove access token from local storage
    localStorage.removeItem('refresh_token'); // Remove refresh token from local storage
    localStorage.removeItem('isLoggedIn'); // Remove login state from local storage
    localStorage.removeItem('taskStatusList');

    }

    catch (error) {
      console.error('Logout failed:',error);
    }
    // Handle logout logic here
    
  } else {
    // Navigate to login page
    navigate('/login');
  }
};


  return (
     <div className="min-h-screen bg-gray-50">
      {/* Top Nav Bar */}
       <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CODE DEMO</h1>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={handleAuthClick}
          >
            <span className="hidden sm:inline">{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
            {!isLoggedIn ? (
              <FaSignInAlt className="text-xl" />
            ) : (
              <FaSignOutAlt className="text-xl" />
            )}
          </button>
        </div>
      </div>

      <div className=" max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Syllabus of the Course</h1>
          <p className="text-lg text-gray-600">Click on any item to navigate</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="group cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
              >
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold group-hover:bg-blue-200 transition-colors">
                      {item.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:underline transition-all duration-200">
                        {item.lesson}
                      </h3>
                      
                    </div>
                  </div>
                  <div>
                    {typeof item.status === "boolean" &&( <>

                    {item.status ? (
                      <FaCheckCircle className="text-green-500 text-xl" title="Completed" />
                    ) : (
                      <FaHourglassHalf className="text-yellow-500 text-xl" title="Pending" />
                    )}
                    </>
                      
                    )}
                  </div>
                </div>
                

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
