import React from 'react'
import { assets } from '../assets/assets'
const SearchBarVisible = ({setSearchBar}) => {
  return (
    <div className='text-center'>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
      <input className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder='Search...'/>
      <img className='w-4 cursor-pointer' src={assets.search_icon} alt="" />
      <img onClick={()=>setSearchBar(false)} className='inline w-3 cursor-pointer ml-2' src={assets.cross_icon} alt="" />
      </div>
      </div>
  )
}

export default SearchBarVisible
