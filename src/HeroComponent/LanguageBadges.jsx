import React from 'react';

const languages = [
  { name: 'JavaScript', color: 'bg-yellow-500' },
  { name: 'Python', color: 'bg-blue-500' },
  { name: 'HTML', color: 'bg-orange-500' },
  { name: 'CSS', color: 'bg-indigo-500' },
  
];

const LanguageBadges = () => {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-slate-300">Popular languages you'll learn:</p>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang, index) => (
          <div 
            key={index} 
            className={`flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${lang.color} bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {lang.name}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-2">
        And many more programming languages and technologies...
      </p>
    </div>
  );
};

export default LanguageBadges;