'use client'
import React, { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { useTheme } from '@/lib/theme'  
import { ChartPieLabel } from '@/components/ui/pie-chart'
import { getNotes } from '@/lib/data'
import { ChartBarHorizontal } from '@/components/ui/h-bar-chart'

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const userNotes = await getNotes(token);
          setNotes(userNotes);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className={`gap-3 flex flex-col min-h-screen font-Instrument_Sans ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <Sidebar />
        <div className='p-4 sm:ml-60'>
          <h1 className='text-3xl font-bold ml-3'>Dashboard</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`gap-3 flex flex-col min-h-screen font-Instrument_Sans ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <Sidebar />
      <div className='p-4 sm:ml-60'>
        <h1 className='text-3xl font-bold ml-3'>Dashboard</h1>
        <div className='flex flex-row gap-8 m-6'>
          <ChartPieLabel notes={notes} />
          <ChartBarHorizontal notes={notes} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard