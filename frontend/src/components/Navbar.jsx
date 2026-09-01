import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import {Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const {setShowSearch, getCartCount, navigate, token, setToken , setCartItems}= useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const cartCount = getCartCount();

  return ( 
    <div className='flex items-center justify-between py-4 font-medium sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 mb-2'>

    <Link to='/' className='flex items-center gap-1'>
      <img src={assets.logo} className='w-32 sm:w-36' alt="Forever" />
    </Link>

    <ul className='hidden sm:flex gap-6 text-xs sm:text-sm tracking-wide text-gray-700 font-medium'>
        <NavLink to='/' className='flex flex-col items-center gap-1 hover:text-black transition'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-black hidden'/>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1 hover:text-black transition'>
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-black hidden'/>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1 hover:text-black transition'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-black hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1 hover:text-black transition'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-black hidden'/>
        </NavLink>
    </ul> 

    <div className='flex items-center gap-5 sm:gap-6'>
        <button 
          onClick={()=>setShowSearch(true)} 
          className='hover:opacity-75 transition cursor-pointer p-1'
          aria-label="Search"
        >
          <img src={assets.search_icon} alt="Search" className='w-5'/>
        </button>

        <div className='group relative'>
            <button 
              onClick={()=> token ? null : navigate('/login')} 
              className="hover:opacity-75 transition cursor-pointer p-1 flex items-center"
              aria-label="Account"
            >
              <img className="w-5" src={assets.profile_icon} alt="Profile" />
            </button>
           {/* Dropdown Menu */}
           {token && 
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                <div className='flex flex-col gap-2 w-40 py-3 px-4 bg-white border border-gray-100 shadow-xl rounded-xl text-xs text-gray-600 font-medium'>
                    <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black py-1 transition'>📦 My Orders</p>
                    <hr className='border-gray-100' />
                    <p onClick={logout} className='cursor-pointer hover:text-red-600 py-1 transition'>🚪 Logout</p>
                </div>
            </div>}
        </div>

        <Link to='/cart' className='relative hover:opacity-75 transition p-1' aria-label="Cart">
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          {cartCount > 0 && (
            <p className='absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-4.5 h-4.5 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-bold shadow-xs'>
              {cartCount}
            </p>
          )}
        </Link>

        <button 
          onClick={() => setVisible(true)} 
          className='cursor-pointer sm:hidden p-1' 
          aria-label="Menu"
        >
          <img src={assets.menu_icon} className='w-5' alt="Menu" />
        </button>
    </div>

    {/* Sidebar menu for mobile */}
    <div className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={()=>setVisible(false)}>
        <div 
          onClick={(e)=>e.stopPropagation()} 
          className={`absolute top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl transition-transform duration-300 flex flex-col ${visible ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className='flex items-center justify-between p-5 border-b'>
                <img src={assets.logo} className='w-28' alt="Forever" />
                <button onClick={()=>setVisible(false)} className='p-2 text-gray-500 hover:text-black text-xl font-bold'>
                  ✕
                </button>
            </div>
            <div className='flex flex-col divide-y divide-gray-100 text-sm font-medium text-gray-700'>
                <NavLink className='py-3.5 px-6 hover:bg-gray-50' onClick={()=>setVisible(false)} to='/'>HOME</NavLink>
                <NavLink className='py-3.5 px-6 hover:bg-gray-50' onClick={()=>setVisible(false)} to='/collection'>ALL COLLECTIONS</NavLink>
                <NavLink className='py-3.5 px-6 hover:bg-gray-50' onClick={()=>setVisible(false)} to='/collection?category=Men'>MEN'S CLOTHING</NavLink>
                <NavLink className='py-3.5 px-6 hover:bg-gray-50' onClick={()=>setVisible(false)} to='/collection?category=Women'>WOMEN'S CLOTHING</NavLink>
                <NavLink className='py-3.5 px-6 hover:bg-gray-50' onClick={()=>setVisible(false)} to='/collection?category=Kids'>KIDS' CLOTHING</NavLink>
                <NavLink className='py-3.5 px-6 hover:bg-gray-50' onClick={()=>setVisible(false)} to='/about'>ABOUT US</NavLink>
                <NavLink className='py-3.5 px-6 hover:bg-gray-50' onClick={()=>setVisible(false)} to='/contact'>CONTACT</NavLink>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar