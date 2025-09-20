'use client'
import React, { useState, useEffect } from 'react';
import { DarkMode } from './dark-toggle';
import { useTheme } from '../lib/theme';
import { RiDashboardLine } from "react-icons/ri";
import { FaNoteSticky } from "react-icons/fa6";

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Pastikan komponen sudah dimount sebelum render
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Hindari render sampai komponen dimount
  if (!mounted) {
    return null;
  }

  return (
    <div>
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-[5px] sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${
          isDarkMode ? 'dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' : ''
        }`}>
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isDarkMode ? 'bg-gray-700' : 'bg-white'
        } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 border-r-2 dark:border-gray-600`}
        aria-label="Sidebar"
      >
        <div className="h-full px-2 py-4 overflow-y-auto font-instrument_sans">
          <div className="space-y-2 font-bold flex flex-row">
            <p className={`text-[30px] rounded-[6px] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Click-It Notes
            </p>
          </div>
          <ul className="space-y-2 font-medium mt-3">
            <li className="relative">
              <a
                href="/notes"
                className={`flex items-center p-2 rounded-[6px] ${
                  isDarkMode
                    ? 'text-white hover:bg-gray-600'
                    : 'text-black hover:bg-indigo-200'
                } duration-200 group`}
              >
                <FaNoteSticky className='text-lg'/>
                <span className="ms-3">Notes</span>
                <svg
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden group-hover:block w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </a>
            </li>

            <li className='relative'>
              <a
                href="/dashboard"
                className={`flex items-center p-2 rounded-[6px] ${
                  isDarkMode 
                    ? 'text-white hover:bg-gray-600' 
                    : 'text-black hover:bg-indigo-200'
                } duration-200 group`}
              >
                <RiDashboardLine className='text-lg'/>
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                <svg
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden group-hover:block w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </a>
            </li>
            <li className="flex flex-row gap-3 p-2 items-center justify-between">
              <p className="text-black dark:text-white">Dark Mode</p>
              <DarkMode />
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};