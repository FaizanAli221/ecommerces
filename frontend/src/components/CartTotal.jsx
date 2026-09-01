import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
    const amount = getCartAmount();
    const isFreeShipping = amount >= 100;
    const finalShipping = amount === 0 ? 0 : (isFreeShipping ? 0 : delivery_fee);
    const total = amount === 0 ? 0 : (amount + finalShipping);

  return (
    <div className='w-full'>
        <div className='text-xl sm:text-2xl font-medium mb-3'>
            <Title text1={'ORDER'} text2={'SUMMARY'}/>
        </div>

        <div className='flex flex-col gap-3 text-sm text-gray-600'>
            <div className='flex justify-between items-center'>
                <p>Subtotal</p>
                <p className='font-medium text-gray-900'>{currency}{amount}.00</p>
            </div>                          
            <div className='flex justify-between items-center'>
                <p>Estimated Delivery</p>
                <p className='font-medium text-gray-900'>
                  {amount === 0 ? (
                    `${currency}0.00`
                  ) : isFreeShipping ? (
                    <span className='text-emerald-600 font-semibold'>FREE</span>
                  ) : (
                    `${currency}${delivery_fee}.00`
                  )}
                </p>
            </div>
            <hr className='border-gray-200' />
            <div className='flex justify-between items-center text-base sm:text-lg font-bold text-gray-900'>
                <span>Total</span>
                <span>{currency}{total}.00</span>
            </div>
        </div>
    </div>
  )
}

export default CartTotal