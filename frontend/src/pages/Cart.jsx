import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, delivery_fee, getCartAmount } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(()=>{
    if(products && products.length > 0){
      const tempData = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  },[cartItems, products])

  const cartAmount = getCartAmount();
  const freeShippingThreshold = 100;
  const progressPercent = Math.min(100, Math.round((cartAmount / freeShippingThreshold) * 100));

  return (
    <div className='border-t pt-10 min-h-[70vh]'>

      <div className='text-2xl mb-4'>
        <Title text1={"SHOPPING"} text2={"BAG"}/>
      </div>

      {cartData.length === 0 ? (
        /* Empty Cart State */
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl text-gray-400'>
            🛒
          </div>
          <h2 className='text-2xl font-medium text-gray-800 mb-2'>Your shopping bag is empty</h2>
          <p className='text-gray-500 text-sm max-w-sm mb-8'>
            Explore our curated collections and add your favorite apparel to your bag.
          </p>
          <Link 
            to='/collection' 
            className='bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition active:scale-95 shadow-md'
          >
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div>
          {/* Free Shipping Progress Indicator */}
          <div className='bg-stone-50 border border-gray-200 rounded-xl p-4 mb-8'>
            <div className='flex justify-between items-center text-xs sm:text-sm font-medium mb-2 text-gray-700'>
              {cartAmount >= freeShippingThreshold ? (
                <span className='text-emerald-600 font-semibold flex items-center gap-1.5'>
                  🎉 Congratulations! You have unlocked <b>FREE Delivery</b>!
                </span>
              ) : (
                <span>
                  Add <b className='text-black'>{currency}{freeShippingThreshold - cartAmount}</b> more to unlock <b>FREE Delivery</b>!
                </span>
              )}
              <span className='text-gray-500 font-normal'>{progressPercent}%</span>
            </div>
            <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
              <div 
                className='bg-black h-full transition-all duration-500 rounded-full' 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className='divide-y divide-gray-200'>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              if (!productData) return null;

              const itemImage = Array.isArray(productData.image) ? productData.image[0] : (productData.image || '/default-product.jpg');

              return (
                <div key={index} className='py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                  <div className='flex items-start gap-4 sm:gap-6 flex-1'>
                    <Link to={`/product/${productData._id}`}>
                      <img className='w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-lg border border-gray-100 flex-shrink-0' src={itemImage} alt={productData.name} />
                    </Link>
                    <div className='flex flex-col justify-between flex-1'> 
                      <div>
                        <Link to={`/product/${productData._id}`} className='text-sm sm:text-base font-medium text-gray-800 hover:text-black transition'>
                          {productData.name}
                        </Link>
                        <div className='flex items-center gap-3 mt-1 text-xs text-gray-500'>
                          <span>Category: {productData.category}</span>
                          <span>•</span>
                          <span className='px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-800 font-medium'>Size: {item.size}</span>
                        </div>
                      </div>
                      <p className='text-base sm:text-lg font-semibold text-gray-900 mt-2'>
                        {currency}{productData.price}
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className='flex items-center justify-between sm:justify-end gap-6 sm:gap-8'>
                    <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        className='px-3 py-1 bg-gray-50 hover:bg-gray-200 text-gray-700 transition text-sm font-semibold'
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className='px-4 py-1 text-sm font-medium text-gray-800 min-w-8 text-center'>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className='px-3 py-1 bg-gray-50 hover:bg-gray-200 text-gray-700 transition text-sm font-semibold'
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className='text-right min-w-20'>
                      <p className='text-sm sm:text-base font-bold text-gray-900'>
                        {currency}{productData.price * item.quantity}
                      </p>
                    </div>

                    <button 
                      onClick={() => updateQuantity(item._id, item.size, 0)} 
                      className='text-gray-400 hover:text-red-500 transition p-1 cursor-pointer'
                      title="Remove item"
                    >
                      <img className='w-4 sm:w-5' src={assets.bin_icon} alt="Delete" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Totals & Checkout Actions */}
          <div className='flex justify-end my-14'>
            <div className='w-full sm:max-w-md bg-stone-50 border border-gray-200 rounded-2xl p-6 shadow-sm'>
              <CartTotal/>
              <div className='w-full mt-6'>
                <button 
                  onClick={()=>navigate('/place-order')} 
                  className='w-full bg-black hover:bg-neutral-800 text-white text-sm font-medium py-3.5 rounded-full transition duration-300 shadow-md active:scale-98 tracking-wide cursor-pointer'
                >
                  PROCEED TO CHECKOUT
                </button>
                <p className='text-center text-xs text-gray-400 mt-3'>
                  🔒 Guaranteed safe & secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart