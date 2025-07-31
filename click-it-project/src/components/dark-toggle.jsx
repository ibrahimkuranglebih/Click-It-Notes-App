import React from "react";
import { useTheme } from "../lib/theme";

export const DarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div>
      <label
        className="relative flex items-center w-14 h-6 bg-gray-800 rounded-full p-1 cursor-pointer transition-colors duration-500"
        htmlFor="switch"
      >
        <input
          id="switch"
          type="checkbox"
          className="peer hidden"
          checked={!isDarkMode} // Gunakan `isDarkMode` di sini
          onChange={toggleDarkMode} // Gunakan `toggleDarkMode`
        />
        {/* Moon Icon */}
        <svg
          viewBox="0 0 384 512"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-2 w-2 fill-gray-400 transition-opacity duration-300 peer-checked:opacity-0"
        >
          <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
        </svg>
        {/* Sun Icon */}
        <div className="absolute flex items-center justify-center top-1/2 left-[calc(100%-1.5rem)] w-3 h-3 opacity-0 bg-white rounded-full scale-75 peer-checked:opacity-100 transition-opacity duration-300 transform -translate-y-1/2">
          <span className="block w-1 h-1 bg-gray-800 rounded-full shadow-[0_0_0_4px_rgba(0,0,0,0.2)]"></span>
        </div>
        {/* Toggle Circle */}
        <span className="w-4 h-4 bg-gray-600 rounded-full shadow-md transition-transform duration-500 peer-checked:translate-x-7 peer-checked:bg-white" />
      </label>
    </div>
  );
};
