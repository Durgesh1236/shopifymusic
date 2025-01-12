import React, { useState } from 'react'
import SideBar from './SideBar'
import Navbar from './Navbar'
import Player from './Player'
import SearchBarVisible from './SearchBarVisible'
import EmailVerify from '../pages/EmailVerify'
import Music from '../pages/Music'


const Layout = ({ children }) => {

  const [searchBar, setSearchBar] = useState(false);
  
  return (
    <div className='h-screen'>
      <div className="h-[90%] flex">
        <SideBar searchBar={searchBar} setSearchBar={setSearchBar}/>
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
          <Navbar searchBar={searchBar} setSearchBar={setSearchBar} />
          {
            searchBar === true ?
            <SearchBarVisible setSearchBar={setSearchBar}/>
            : ""
          }
          {children}
        </div>
      </div>
      <Player />
    </div>
  )
}

export default Layout
