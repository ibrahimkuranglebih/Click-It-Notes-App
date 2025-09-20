'use client'
import React, { useState } from 'react';

const SearchBar = ({ onSearch, isDarkMode }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative mx-10 mb-4">
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={handleSearch}
        className={`w-full p-3 pl-10 rounded-full border ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-black'
        } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
      />
      <svg 
        className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  );
};

export default SearchBar;