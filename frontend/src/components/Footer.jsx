import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-20 pt-10 border-t border-gray-200'>
        <div className='grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1fr] gap-10 mb-12 text-sm'>

            <div>
                <img src={assets.logo} className='mb-4 w-32' alt="Forever" />
                <p className='w-full md:w-4/5 text-gray-500 leading-relaxed text-xs sm:text-sm font-light'>
                    Forever is an international apparel brand dedicated to crafting timeless, sustainable, and modern clothing for men, women, and kids. Elevated essentials built to last.
                </p>
            </div>

            <div>
                <p className='text-sm font-semibold tracking-wider text-gray-900 uppercase mb-4'>Explore</p>
                <ul className='flex flex-col gap-2.5 text-gray-600 text-xs sm:text-sm'>
                    <li><Link to='/' className='hover:text-black transition'>Home</Link></li>
                    <li><Link to='/collection' className='hover:text-black transition'>All Collections</Link></li>
                    <li><Link to='/collection?category=Men' className='hover:text-black transition'>Men's Wear</Link></li>
                    <li><Link to='/collection?category=Women' className='hover:text-black transition'>Women's Wear</Link></li>
                    <li><Link to='/collection?category=Kids' className='hover:text-black transition'>Kids' Wear</Link></li>
                </ul>
            </div>
            
            <div>
                <p className='text-sm font-semibold tracking-wider text-gray-900 uppercase mb-4'>Customer Care</p>
                <ul className='flex flex-col gap-2.5 text-gray-600 text-xs sm:text-sm'>
                    <li><Link to='/about' className='hover:text-black transition'>About Us</Link></li>
                    <li><Link to='/contact' className='hover:text-black transition'>Contact Support</Link></li>
                    <li><Link to='/orders' className='hover:text-black transition'>Track Orders</Link></li>
                    <li className='text-gray-500'>support@forever.com</li>
                </ul>
            </div>
        </div>

        <div className='border-t border-gray-100 py-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2'> 
            <p>© 2026 Forever Inc. All rights reserved.</p>
            <p className='text-gray-400'>Designed with modern minimalism</p>
        </div>
    </footer>
  )
}

export default Footer