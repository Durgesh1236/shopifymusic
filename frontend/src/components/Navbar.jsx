import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../context/User';

const Navbar = () => {
  const navigate = useNavigate();
  const {logoutUser, user} = UserData();
  return (
    <>
    <div className='w-full flex justify-between items-center font-semibold'>
      <div className="flex items-center gap-2">
      <img onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
      <img onClick={()=>navigate(+1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
      </div>

      <div className='flex items-center gap-4'>
          <p className='hover:bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
          <a href='https://storage.appilix.com/uploads/app-apk-676f84f73affa-1735361783.apk' className='bg-white text-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</a>
          <p onClick={logoutUser} className='bg-white text-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Logout</p>
        </div>
        </div>

        <div className='flex items-center gap-2 mt-4'>
        <p onClick={()=>navigate("/")} className='bg-white hover:bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block'>Music</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block'>Podcasts</p>
        <p onClick={()=>navigate("/playlist")} className='bg-black px-4 py-1 rounded-2xl cursor-pointer md:hidden'>PlayList</p>
        {
             user && user.role === "admin" ? (
              <p onClick={()=>navigate("/admin")} className='bg-black px-4 py-1 rounded-2xl cursor-pointer md:hidden'>AdminPanel</p>
             ) : ""
        }
      </div>
        </>
  )
}

export default Navbar
