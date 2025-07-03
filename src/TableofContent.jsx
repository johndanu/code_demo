import { useState,useEffect } from "react";
import tocData from './Db/TableofContent.json'; 
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt,FaSignOutAlt,FaCheckCircle,FaHourglassHalf , FaChevronDown, FaChevronUp } from 'react-icons/fa'; 
import { useAuthApi } from './hooks/useAuthApi'; 
import { useContentApi } from "./hooks/useContentApi";
import { useStatusApi } from "./hooks/useStatusApi";

const TableOfContents = ({isLoggedIn,setIsLoggedIn}) => {
  const [items, setItems] = useState([]);
  const { logout } = useAuthApi(); // Import the logout function from the custom hook
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [openTasks, setOpenTasks] = useState({});
  const { getAllcontents } = useContentApi(); // Import the getAllcontents function from the custom hook
  const { updateTaskStatus } = useStatusApi(); // Import the updateTaskStatus function from the custom hook
  // Fetch the table of contents data from the API
  
  useEffect(() => {
     
   
       tableContent(); // Call the function to fetch table of contents with default id
    
   

  }, []);
 
  const navigate = useNavigate();
  const handleItemClick = async (item) => {
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

    console.log("task status:", item);

    if (item.taskStatus==null || item.taskStatus.status == 'not_started') {
        const  statusUpdate=await updateTaskStatus(item.id, 'in_progress');
        if(statusUpdate.message != "Task status updated successfully") {
          console.error("Failed to update task status:", statusUpdate);
          alert("Failed to update task status. Please try again later.");
          return;  
        }

    }

    // If logged in, proceed normally
    navigate(`/syllabus/js/${item.id}`);
  };

const handleAuthClick = () => {
  if (isLoggedIn) {
    setShowSignOutModal(true); // Show confirmation modal
  } else {
    navigate('/login');
  }
};

const confirmSignOut = async () => {
  try {
    const refresh_token = localStorage.getItem('refresh_token');
    const res = await logout(refresh_token);
    console.log('Logout successful:', res);
    setIsLoggedIn(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('taskStatusList');
    localStorage.removeItem('id'); // Clear user ID from localStorage
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    setShowSignOutModal(false); // Close modal
  }
};

const tableContent=async () => { 
  try {
    let id=-1
    if(localStorage.getItem('id')){
      id=localStorage.getItem('id');
    }
    const data = await getAllcontents(id);
    console.log('Table of contents fetched successfully:', data);
    const taskStatusStr = localStorage.getItem('taskStatusList');
    const taskStatusList = taskStatusStr ? JSON.parse(taskStatusStr) : [];

    // Map tocData to include a "status" based on localStorage (default: false)
    const itemsWithStatus = data.map(item => {
      // const matched = taskStatusList.find(task => task.id === item.id);
      return {
  ...item,
  title: item.content,
  status: isLoggedIn
    ? (() => {
        const statuses = item.tasks.map(task => task.taskStatus?.status);

        if (statuses.every(status => status == null || status === 'not_started')) {
          return "undefined";
        }

        if (statuses.every(status => status === 'completed')) {
          return true;
        }

        return false;
      })()
    : "undefined"
};

    });

    setItems(itemsWithStatus);
    console.log("Items with status:", itemsWithStatus);



  } catch (error) {
    console.error('Failed to fetch table of contents:', error);
  }
 }




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
            {items.map((item,index) => (
              <div
                key={item.id}
                // onClick={() => handleItemClick(item)}
                // className="group cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
              >
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold group-hover:bg-blue-200 transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 
                      onClick={()=>setOpenTasks((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))} className="flex justify-between items-center w-full ">
                         <span>{item.title}</span>
  {openTasks[item.id] ? (
    <FaChevronUp className="ml-2 text-lg" />
  ) : (
    <FaChevronDown className="ml-2 text-lg" />
  )}
                      </h3>
                         {item.tasks && openTasks[item.id] && item.tasks.map((task) => (
                        <div key={task.id} className="flex justify-between mt-4 ml-4 border-l-2 pl-4 border-gray-300">
                          <h4   onClick={() => handleItemClick(task)} className="text-md font-semibold text-blue-600 cursor-pointer">{task.header}</h4>
                          <div>
                            {task.taskStatus !=null ? task.taskStatus.status === 'completed' ?  <FaCheckCircle className="text-green-500 text-xl" title="Completed" />: <FaHourglassHalf className="text-yellow-500 text-xl" title="Pending" />:""}
                          </div>
                          {/* <p className="text-sm text-gray-800 mt-1"><strong>Concept:</strong> {task.concept}</p>
                          <p className="text-sm text-gray-600 mt-1"><strong>Description:</strong> {task.description}</p>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Example:</p>
                            <pre className="bg-gray-100 text-sm p-2 rounded overflow-auto">
                              <code>{task.example}</code>
                            </pre>
                          </div> */}
                          {/* {task.initial_code && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700">Initial Code:</p>
                              <pre className="bg-gray-100 text-sm p-2 rounded overflow-auto">
                                <code>{task.initial_code}</code>
                              </pre>
                            </div>
                          )} */}
                        </div>
                      ))}
                      
                      
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
      {showSignOutModal && (
  <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Sign Out</h2>
      <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowSignOutModal(false)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={confirmSignOut}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TableOfContents;
