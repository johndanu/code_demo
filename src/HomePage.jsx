import { useState } from "react";
import tocData from './Db/Course.json'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [items] = useState(
    tocData.map(item => ({
      ...item,
    }))
  );
  const navigate = useNavigate();
  const handleItemClick = (item) => {
  navigate(`/syllabus/${item.slug}`);
};


  return (
    <div className=" max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4"> Courses List</h1>
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
                    {item.name}
                  </h3>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
