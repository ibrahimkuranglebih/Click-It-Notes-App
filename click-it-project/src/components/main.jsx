'use client'
import React, { useEffect } from 'react'
import SplitText from './ui/split_text';
import AOS from 'aos';
import 'aos/dist/aos.css';

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

export default function Main() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='flex font-Instrument_Sans'>
      <div className='flex flex-col md:flex-row h-screen pl-6 md:pl-20 items-center gap-10'>
        <div className='flex flex-col items-start gap-6 justify-center text-center md:text-left '>
          <SplitText
              text="Create Your Plans Just One Click"
              className="text-3xl sm:text-4xl md:text-6xl font-semibold"
              delay={30}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
              onLetterAnimationComplete={handleAnimationComplete}
          />
          <h1 
            className='text-lg sm:text-xl md:text-2xl font-medium max-[760px]:text-center' 
            data-aos='fade-up' 
            data-aos-duration='1000'
          >
            With a customize Stuff to Arrange your plans
          </h1>
          <a 
            href="/auth" 
            className='bg-indigo-400 px-4 py-2 rounded-xl shadow-md font-medium text-white hover:shadow-xl hover:px-5 hover:py-2 duration-300'
          >
            Start Now
          </a>
        </div>

       <div className='grid grid-cols-2 max-[700px]:grid-cols-1 gap-2 '>
          <div className="w-28 h-28 md:w-36 md:h-36 shadow-lg font-medium rounded-lg flex items-center justify-center bg-red-300">
            Task
          </div>
          <div className="w-28 h-28 md:w-36 md:h-36 shadow-lg font-medium rounded-lg flex items-center justify-center bg-green-300">
            Work
          </div>
          <div className="w-28 h-28 md:w-36 md:h-36 shadow-lg font-medium rounded-lg flex items-center justify-center bg-yellow-300">
            Study
          </div>
          <div className="w-28 h-28 md:w-36 md:h-36 shadow-lg font-medium rounded-lg flex items-center justify-center bg-blue-300">
            Others
          </div>
        </div>
      </div>
    </div>
  )
}
