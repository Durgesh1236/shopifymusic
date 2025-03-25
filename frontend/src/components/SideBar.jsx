import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import PlayListCard from './PlayListCard'
import { UserData } from '../context/User'

const SideBar = () => {

    const navigate = useNavigate()
    const {user} = UserData()

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
     <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
     <div onClick={()=>navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer">
            <img src={assets.home_icon} alt="" className='w-6' />
            <p className='font-bold'>Home</p>
        </div>

        <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img src={assets.search_icon} alt="" className='w-6' />
            <p onClick={()=>navigate("/search")} className='font-bold'>Search</p>
        </div>
     </div>

     <div className='bg-[#121212] h-[85%] rounded'>
     <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img className='w-8' src={assets.stack_icon} alt="" />
                <p className='font-semibold'>Your Library</p>
            </div>
            <div className='flex items-center gap-3'>
                <img className='w-5 cursor-pointer' src={assets.arrow_icon} alt="" />
                <img className='w-5 cursor-pointer' src={assets.plus_icon} alt="" />
            </div>
        </div>

        <div onClick={()=>navigate("/playlist")}>
            <PlayListCard />
        </div>

        <div className="bg-[#121212] rouded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
            <p className='text-start mt-5 text-white text-xl'>Our Best Website...</p>
          <Link to={'/shopify/forever'} onClick={() => setVisible(false)} className='py-2 flex pl-6 w-full hover:bg-[#ffffff26] rounded-lg text-white mr-2 cursor-pointer'>
          <img src={assets.forever_logo} className='w-7 mr-2 ml-[-5px]' alt="" /> Forever Shopping
          </Link>

          <Link to={"/shopify/vedantaAI"} onClick={() => setVisible(false)} className='py-2 pl-6 flex text-white w-full hover:bg-[#ffffff26] rounded-lg cursor-pointer'>
           <img src={assets.ai_logo} className='w-7 mr-2 ml-[-5px]' alt="" /> Chat With AI
           </Link>
        </div>

        {
             user && user.role === "admin" ? (
                <button onClick={()=>navigate("/admins/*")} className='px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4 ml-6'>Admin Dashboard</button>
             ) : ""
        }
     </div>
    </div>
  )
}

export default SideBar
