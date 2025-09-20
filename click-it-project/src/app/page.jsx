'use client'
import React, { useEffect } from 'react'
import SplitText from '@/components/ui/split_text';
import AOS from 'aos';
import 'aos/dist/aos.css';

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='flex font-Instrument_Sans justify-center text-center items-center bg-indigo-300'>
      <div className='flex flex-col md:flex-row h-screen justify-center text-center items-center gap-10'>
        <div className='flex flex-col items-center gap-6 justify-center text-center md:text-left '>
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
            className='bg-white px-4 py-2 rounded-xl shadow-md font-medium text-indigo-600 hover:shadow-xl hover:px-5 hover:py-2 duration-300'
          >
            Start Now
          </a>
        </div>
      </div>
    </div>
  )
}
