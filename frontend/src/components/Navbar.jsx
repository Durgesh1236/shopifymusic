import React, { useState } from 'react'
// import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../context/User';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { HiMenuAlt2 } from "react-icons/hi";
// import { IoSearch } from "react-icons/io5";
import { MdInstallMobile } from "react-icons/md";

const Navbar = ({searchBar, setSearchBar}) => {
  const navigate = useNavigate();
  const {logoutUser, user} = UserData();
  const [visible, setVisible] = useState(false);
  const menuvisible = () => {
    setVisible(true);
  };

  return (
    <>
    <div className='w-full flex justify-between items-center font-semibold'>
      <div className="flex items-center gap-2">
      <p onClick={menuvisible} className="menu-icon mr-1 text-2xl sm:hidden"><HiMenuAlt2/></p>
      <p onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer'><GoArrowLeft /></p>
      <p onClick={()=>navigate(+1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer'><GoArrowRight /></p>
      {/* <div className="w-8 h-8 ml-24 flex justify-center items-center md:hidden rounded-full bg-white text-black relative group">
      <p onClick={()=>setSearchBar(true)} className='cursor-pointer md:hidden text-xl'><IoSearch/></p>
      </div> */}
      </div>

           <div className="w-8 h-8 flex justify-center text-xl items-center rounded-full bg-white text-black relative group">
            {
              user.name[0].toUpperCase()
            }
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-10">
              <ul className='list-none w-40 m-0 p-2 bg-gray-100 text-sm rounded-2xl'>
                <li>
                <li onClick={()=>navigate("/my-profile")} className='py-1 px-2 rounded-full hover:bg-black hover:text-white cursor-pointer hidden md:block pr-10'>My Profile</li>
                 <a href='https://storage.appilix.com/uploads/app-apk-678c841d24778-1737262109.apk' className='py-1 px-2 rounded-full hidden md:block hover:bg-black hover:text-white cursor-pointer pr-10' >Install App</a>
                </li>
                <li onClick={logoutUser} className='py-1 px-2 rounded-full hover:bg-black hover:text-white cursor-pointer pr-10'>Logout</li>
              </ul>
            </div>
          </div>
        </div> 

        <div className='flex items-center overflow-auto gap-2 mt-4'>
        <p onClick={()=>navigate("/")} className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p onClick={()=> navigate('/music')} className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        {searchBar === false ?
        <p onClick={()=>setSearchBar(true)} className='bg-black px-4 py-1 rounded-2xl cursor-pointer md:hidden'>Search</p>
        : "" }
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block'>Podcasts</p>
        <p onClick={()=>navigate("/playlist")} className='bg-black px-4 py-1 rounded-2xl cursor-pointer md:hidden'>PlayList</p>
      </div>

      <div className={`absolute top-0 bottom-0 left-0 overflow-hidden bg-black transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600 rounded-2xl'>
          <div onClick={() => setVisible(false)} className='flex text-white  items-center gap-4 p-3 cursor-pointer'>
            <p className='h-4 text-white  rotate-180'><GoArrowRight/></p>
            <p>Back</p>
          </div>
          <p onClick={()=>navigate("/my-profile")} className='py-2 text-white  pl-6 border'>My Profile</p>
          {/* <p onClick={() => setVisible(false)} className='py-2 pl-6 border'></p> */}
          {
             user && user.role === "admin" ? (
              <p onClick={()=>navigate("/admin")} className='pl-6 text-white border py-2 cursor-pointer md:hidden'>AdminPanel</p>
             ) : ""
          }
          <p onClick={() => setVisible(false)} className='py-2 pl-6 text-white  border cursor-pointer'>About</p>
          <p onClick={() => setVisible(false)} className='py-2 pl-6 text-white  border cursor-pointer'>Contact</p>
          <a href='https://storage.appilix.com/uploads/app-apk-676f84f73affa-1735361783.apk' className='py-2 text-white border flex pl-6 px-2 cursor-pointer pr-10' >Install App
          <MdInstallMobile className='mt-1 ml-1' /> 
        </a>
        </div>
      </div>
        </>
  )
}

export default Navbar
