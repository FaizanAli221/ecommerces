import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewsletterBox = () => {

   const [email, setEmail] = useState('')

   const onSubmitHandler = (event) =>{
    event.preventDefault();  
    if(email){
      toast.success("Thank you for subscribing! Your 20% coupon code: WELCOME20");
      setEmail('');
    }
   }

  return (
    <div className='text-center my-16 bg-stone-50 border border-gray-200 rounded-2xl p-8 sm:p-12'>
        <p className='text-2xl sm:text-3xl font-medium text-gray-900'>Subscribe now & get 20% off</p>
        <p className='text-gray-500 text-sm max-w-md mx-auto mt-3'>
        Join our inner circle to receive exclusive early access to private sales, new drops, and seasonal styling guides.</p>
        <form onSubmit={onSubmitHandler} className='w-full max-w-md flex items-center mx-auto my-6 border border-gray-300 rounded-full overflow-hidden bg-white shadow-xs focus-within:border-black'>
            <input 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              className='w-full flex-1 px-4 py-3 text-sm outline-none text-gray-800' 
              type="email" 
              placeholder='Enter your email address' 
              required
            />
            <button type='submit' className='bg-black hover:bg-neutral-800 text-white text-xs font-semibold px-6 sm:px-8 py-3.5 tracking-wider transition cursor-pointer'>
              SUBSCRIBE
            </button>
        </form>
    </div>
  )
}

export default NewsletterBox