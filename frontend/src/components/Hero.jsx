import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='my-6 rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-r from-stone-100 via-stone-50 to-neutral-100 shadow-sm'>
      <div className='flex flex-col lg:flex-row items-center justify-between'>
        {/* Hero Left Content */}
        <div className='w-full lg:w-1/2 p-8 sm:p-14 lg:p-16 flex flex-col justify-center items-start'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-gray-800 text-xs font-semibold uppercase tracking-widest mb-4'>
            <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
            New Season 2026 Collection
          </div>
          
          <h1 className='prata-regular text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-4'>
            Elevate Your <br />
            <span className='italic font-light text-gray-600'>Everyday Style.</span>
          </h1>

          <p className='text-gray-600 text-sm sm:text-base max-w-md mb-8 leading-relaxed font-light'>
            Discover premium apparel engineered for effortless comfort, modern minimalism, and timeless quality.
          </p>

          {/* Quick Action Buttons */}
          <div className='flex flex-wrap gap-3 w-full sm:w-auto'>
            <Link 
              to='/collection' 
              className='bg-black hover:bg-neutral-800 text-white px-7 py-3.5 rounded-full text-sm font-medium transition duration-300 shadow-md hover:shadow-lg active:scale-95 text-center flex-1 sm:flex-initial'
            >
              Explore Collection
            </Link>
            <Link 
              to='/collection?category=Men' 
              className='border border-gray-300 hover:border-black bg-white/80 hover:bg-white text-gray-800 px-6 py-3.5 rounded-full text-sm font-medium transition duration-300 active:scale-95 text-center'
            >
              Shop Men
            </Link>
            <Link 
              to='/collection?category=Women' 
              className='border border-gray-300 hover:border-black bg-white/80 hover:bg-white text-gray-800 px-6 py-3.5 rounded-full text-sm font-medium transition duration-300 active:scale-95 text-center'
            >
              Shop Women
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className='grid grid-cols-3 gap-4 sm:gap-8 pt-8 mt-8 border-t border-gray-200 w-full text-xs text-gray-500'>
            <div>
              <p className='font-bold text-gray-900 text-sm sm:text-base'>40+ New</p>
              <p>Curated Styles</p>
            </div>
            <div>
              <p className='font-bold text-gray-900 text-sm sm:text-base'>100%</p>
              <p>Pure Cotton</p>
            </div>
            <div>
              <p className='font-bold text-gray-900 text-sm sm:text-base'>Free Shipping</p>
              <p>On Orders $100+</p>
            </div>
          </div>
        </div>

        {/* Hero Right Image */}
        <div className='w-full lg:w-1/2 relative h-[380px] sm:h-[480px] lg:h-[540px] overflow-hidden'>
          <img 
            className='w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out' 
            src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80' 
            alt='Luxury Fashion Banner' 
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden'></div>
          <div className='absolute bottom-6 left-6 right-6 lg:hidden text-white'>
            <p className='text-xs uppercase tracking-widest opacity-80'>Autumn / Winter Drop</p>
            <p className='text-lg font-medium'>Refined silhouettes for every moment</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero