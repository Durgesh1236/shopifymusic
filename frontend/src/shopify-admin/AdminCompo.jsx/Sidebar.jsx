import React from 'react'
// import { assets } from '../assets/assets'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom'
import { IoIosHome } from "react-icons/io";
import { FaDatabase } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
      navigate(`/admins/${path}`); 
    };

  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw]'>
      <div className='flex flex-col gap-5 mt-10'>
      <div onClick={()=> navigate('/')} className="flex mt-4 items-center gap-2.5 cursor-pointer text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
        <IoIosHome className='w-5 text-xl'/>
            <p className='hidden sm:block'>Shopify Home</p>
        </div>

      <div onClick={() => handleNavigate('user-data')} className="flex items-center gap-2.5 cursor-pointer text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
        <FaDatabase className='w-5 text-xl'/>
            <p className='hidden sm:block'>All Data</p>
        </div>

        <div onClick={() => handleNavigate('add-song')} className="flex items-center gap-2.5 cursor-pointer text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
            <img src={assets.add_song} className='w-5 ' alt="" />
            <p className='hidden sm:block'>Add Song</p>
        </div>

        <div onClick={()=>handleNavigate('list-song')} className="flex items-center cursor-pointer gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
            <img src={assets.song_icon} className='w-5 ' alt="" />
            <p className='hidden sm:block'>List Song</p>
        </div>

        <div onClick={()=>handleNavigate('add-album')} className="flex items-center cursor-pointer gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
            <img src={assets.add_album} className='w-5 ' alt="" />
            <p className='hidden sm:block'>Add Album</p>
        </div>

        <div onClick={()=>handleNavigate('list-album')} className="flex items-center cursor-pointer gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
            <img src={assets.album_icon} className='w-5 ' alt="" />
            <p className='hidden sm:block'>List Album</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
