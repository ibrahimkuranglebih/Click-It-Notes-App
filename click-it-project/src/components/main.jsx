'use client'
import React from 'react'
import SplitText from './ui/split_text';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

export default function Main() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div className='flex font-Instrument_Sans'>
      <div className='flex h-screen pl-20 items-center gap-10'>
        <div className='flex flex-col items-start gap-10 justify-center'>
            <SplitText
                    text="Create Your Plans Just One Click"
                    className="text-6xl font-semibold text-center ind"
                    delay={30}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                    onLetterAnimationComplete={handleAnimationComplete}
            />
            <h1 className='text-2xl font-medium' data-aos='fade-up' data-aos-duration='1000'>With a customize Stuff to Arrange your plans</h1>
          </div>
          <div className='grid grid-cols-2'>
            <div className="w-36 h-36 shadow-lg rounded-lg"></div>
            <div className="w-36 h-36 shadow-lg rounded-lg"></div>
            <div className="w-36 h-36 shadow-lg rounded-lg"></div>
            <div className="w-36 h-36 shadow-lg rounded-lg"></div>
          </div>
      </div>
    </div>
  )
}
