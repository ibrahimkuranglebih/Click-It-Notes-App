'use client'
import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange, isDarkMode }) => {
  const categories = ['All','others', 'work', 'task', 'event','study'];

  
  return (
    <div className="flex flex-wrap gap-2 mx-10 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-indigo-500 text-white'
              : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;