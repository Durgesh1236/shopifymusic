import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/User';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdInstallMobile } from "react-icons/md";
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const { logoutUser, user } = UserData();
  const [visible, setVisible] = useState(false);
  const menuvisible = () => {
    setVisible(true);
  };

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className="flex items-center gap-2">
          <p onClick={menuvisible} className="menu-icon mr-1 text-2xl sm:hidden"><HiMenuAlt2 /></p>
          <p onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer'><GoArrowLeft /></p>
          <p onClick={() => navigate(+1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer'><GoArrowRight /></p>
        </div>

        <div className="w-8 h-8 flex justify-center text-xl items-center rounded-full bg-white text-black relative group">
          {
            user.thumbnail ?
              <img src={user.thumbnail.url} className='rounded-full' alt="" />
              :
              user.name[0].toUpperCase()
          }
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-10">
            <ul className='list-none w-40 m-0 p-2 bg-gray-100 text-sm rounded-2xl'>
              <li>
                <li onClick={() => navigate("/my-profile")} className='py-1 px-2 rounded-full hover:bg-black hover:text-white cursor-pointer pr-10'>My Profile</li>
                <a href='https://warehouse.appilix.com/uploads/app-apk-67a2f058e5806-1738731608.apk' className='py-1 px-2 rounded-full hidden md:block hover:bg-black hover:text-white cursor-pointer pr-10' >Install App</a>
              </li>
              {/* <li onClick={()=> navigate('/my-profile')} className='py-1 px-2 rounded-full hover:bg-black hover:text-white cursor-pointer pr-10'>My Profile</li> */}
              <li onClick={logoutUser} className='py-1 px-2 rounded-full hover:bg-black hover:text-white cursor-pointer pr-10'>Logout</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='flex items-center overflow-auto gap-2 mt-4'>
        <p onClick={() => navigate("/")} className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>Home</p>
        <p onClick={() => navigate('/music')} className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        <p onClick={() => navigate('/videos')} className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Videos</p>
        <p onClick={() => navigate("/search")} className='bg-black px-4 py-1 rounded-2xl cursor-pointer md:hidden'>Search</p>
        <p onClick={() => navigate("/about")} className='bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block'>About</p>
        <p onClick={() => navigate("/contact")} className='bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block'>Contact</p>
        <p onClick={() => navigate("/career")} className='bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block'>Career</p>
        <p onClick={() => navigate("/playlist")} className='bg-black px-4 py-1 rounded-2xl cursor-pointer md:hidden'>PlayList</p>
      </div>

      <div className={`absolute z-20 top-0 bottom-0 left-0 overflow-hidden bg-black transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600 rounded-2xl'>
          <div onClick={() => setVisible(false)} className='flex text-white mb-2 items-center gap-4 p-3 cursor-pointer'>
            <p className='h-4 text-white rotate-180'><GoArrowRight /></p>
            <p>Back</p>
          </div>
          <p onClick={() => navigate("/my-profile")} className='py-2 text-white ml-2 mr-2  pl-6 border'>My Profile</p>
          {/* <p onClick={() => setVisible(false)} className='py-2 pl-6 border'></p> */}
          {
            user && user.role === "admin" ? (
              <p onClick={() => navigate("/admin")} className='pl-6 text-white ml-2 mr-2 border py-2 cursor-pointer md:hidden'>AdminPanel</p>
            ) : ""
          }
          <Link to={'/contact'} onClick={() => setVisible(false)} className='py-2 pl-6 text-white ml-2 mr-2 border cursor-pointer'>Contact</Link>
          <Link to={'/about'} onClick={() => setVisible(false)} className='py-2 pl-6 text-white ml-2 mr-2 border cursor-pointer'>About</Link>
          <Link to={'/career'} onClick={() => setVisible(false)} className='py-2 pl-6 text-white ml-2 mr-2 border cursor-pointer'>Career</Link>
          <a href='https://warehouse.appilix.com/uploads/app-apk-67a2f058e5806-1738731608.apk'
            className='py-2 text-white ml-2 mr-2 border flex pl-6 px-2 cursor-pointer pr-10' >Install App
            <MdInstallMobile className='mt-1 ml-1' />
          </a>
          <Link onClick={() => {setVisible(false); logoutUser;}} className='py-2 pl-6 text-white ml-2 mr-2 border cursor-pointer'>Logout</Link>

          <p className='text-center mt-5 text-white text-2xl mb-2'>Our Best Website...</p>
          <Link to={'/shopify/forever'} onClick={() => setVisible(false)} className='py-2 flex pl-6 text-white ml-2 mr-2 border cursor-pointer'>
            <img src={assets.forever_logo} className='w-7 mr-2 ml-[-5px]' alt="" />Forever Shopping</Link>
          {/* <a href={'https://vidtube-s6si.vercel.app/'} onClick={() => setVisible(false)} className='py-2 flex pl-6 text-white ml-2 mr-2 border cursor-pointer'>
            <img src={assets.vid_img} className='w-7 mr-2 ml-[-5px]' alt="" />VideoTube</a> */}
          <Link to={'/shopify/vedantaAI'} onClick={() => setVisible(false)} className='py-2 flex pl-6 text-white ml-2 mr-2 border cursor-pointer'>
            <img src={assets.ai_logo} className='w-7 mr-2 ml-[-5px]' alt="" /> Chat With AI
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
