import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useSearchParams } from 'react-router-dom';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Read URL search params on mount (e.g. ?category=Men)
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && ['Men', 'Women', 'Kids'].includes(catParam)) {
      setCategory([catParam]);
    }
  }, [searchParams]);

  const toggleCategory = (e) => {
    const val = e.target.value;
    if(category.includes(val)) {
      setCategory(prev => prev.filter(item => item !== val))
    } else {
      setCategory(prev => [...prev, val])
    }
  } 

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if(subCategory.includes(val)){
      setSubCategory(prev => prev.filter(item => item !== val))
    }
    else {
      setSubCategory(prev => [...prev, val])
    }
  }

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  const applyFilter = () =>{
    let productsCopy = (products || []).slice();
    
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    if (sortType === 'low-high') {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy)
  }

  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch, products, sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-8 border-t'>      

      {/* Filter Sidebar */}
      <div className='min-w-64'>
        <div 
          onClick={()=>setShowFilter(!showFilter)} 
          className='my-2 flex items-center justify-between cursor-pointer sm:cursor-default py-2 border-b sm:border-none'
        >
          <p className='text-lg sm:text-xl font-medium tracking-wide text-gray-900'>FILTERS</p>
          <img className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </div>

        {/* Active Filters Clear Button */}
        {(category.length > 0 || subCategory.length > 0) && (
          <button 
            onClick={clearAllFilters}
            className='text-xs text-red-600 hover:text-red-700 font-medium mb-3 underline cursor-pointer'
          >
            Clear all filters ({category.length + subCategory.length})
          </button>
        )}

        {/* Category Filter */}
        <div className={`border border-gray-200 rounded-xl p-5 mb-5 bg-white shadow-xs ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-xs font-bold text-gray-900 uppercase tracking-wider'>Category</p>
          <div className='flex flex-col gap-2.5 text-sm text-gray-600'>
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className='flex items-center gap-3 cursor-pointer select-none hover:text-black'>
                <input 
                  className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer' 
                  type="checkbox" 
                  value={cat} 
                  checked={category.includes(cat)} 
                  onChange={toggleCategory}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-200 rounded-xl p-5 bg-white shadow-xs ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-xs font-bold text-gray-900 uppercase tracking-wider'>Product Type</p>
          <div className='flex flex-col gap-2.5 text-sm text-gray-600'>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label key={type} className='flex items-center gap-3 cursor-pointer select-none hover:text-black'>
                <input 
                  className='w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer' 
                  type="checkbox" 
                  value={type} 
                  checked={subCategory.includes(type)} 
                  onChange={toggleSubCategory}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product List Right Side */}
      <div className='flex-1'>

        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6'>
          <div>
            <div className='text-xl sm:text-2xl font-medium'>
              <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            </div>
            <p className='text-xs text-gray-500 mt-1'>
              Showing <span className='font-semibold text-gray-800'>{filterProducts.length}</span> of {products?.length || 0} products
            </p>
          </div>

          {/* Product Sort Dropdown */}
          <div className='flex items-center gap-2'>
            <label className='text-xs text-gray-500 hidden sm:inline'>Sort by:</label>
            <select 
              value={sortType}
              onChange={(e)=>setSortType(e.target.value)} 
              className='border border-gray-300 rounded-lg text-xs sm:text-sm px-3 py-2 bg-white cursor-pointer focus:outline-none focus:border-black shadow-xs'
            >
              <option value="relevant">Featured / Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid or Empty Results */}
        {filterProducts.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center bg-stone-50 rounded-2xl border border-dashed border-gray-300 p-8'>
            <p className='text-3xl mb-2'>🔍</p>
            <h3 className='text-lg font-medium text-gray-800 mb-1'>No matching products found</h3>
            <p className='text-sm text-gray-500 mb-4 max-w-sm'>
              Try adjusting your category filters or search keywords to find what you are looking for.
            </p>
            <button 
              onClick={clearAllFilters}
              className='bg-black text-white px-6 py-2.5 rounded-full text-xs font-medium hover:bg-neutral-800 transition'
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 gap-y-8'>
            {filterProducts.map((item, index) => (
              <ProductItem 
                key={item._id || index} 
                name={item.name} 
                id={item._id} 
                price={item.price} 
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection