import { useState } from "react";
import tocData from './Db/TableofContent.json'; 
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt,FaSignOutAlt } from 'react-icons/fa'; 

const TableOfContents = ({isLoggedIn,setIsLoggedIn}) => {
  const [items] = useState(
    tocData.map(item => ({
      ...item,
      title: item.tittle 
    }))
  );
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

const handleAuthClick = () => {
  if (isLoggedIn) {

    // Handle logout logic here
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login state from local storage
  } else {
    // Navigate to login page
    navigate('/login');
  }
};


  return (
     <div className="min-h-screen bg-gray-50">
      {/* Top Nav Bar */}
      <div className="bg-blue-600 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-end">
          <button className="cursor-pointer flex items-center hover:opacity-80 transition-opacity" onClick={handleAuthClick}>
            {!isLoggedIn? (<FaSignInAlt className="text-white text-2xl" />) : (<FaSignOutAlt className="text-white text-2xl" />)}
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
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold group-hover:bg-blue-200 transition-colors">
                    {item.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:underline transition-all duration-200">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
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
