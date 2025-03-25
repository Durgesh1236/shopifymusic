import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../AdminCompo/Sidebar';
import AddSong from './AddSong';
import AddAlbum from './AddAlbum';
import ListAlbum from './ListAlbum';
import ListSong from './ListSong';
import Userdata from './UserAlldata'
import AdminNavbar from '../AdminCompo/AdminNav';


const AdminHome = () => {

  return (
    <div className='flex items-start min-h-screen'>
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
      <AdminNavbar/>
        <div className="PT-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
          <Route path='user-data' element={<Userdata />} />
            <Route path='add-song' element={<AddSong />} />
            <Route path='add-album' element={<AddAlbum />} />
            <Route path='list-album' element={<ListAlbum />} />
            <Route path='list-song' element={<ListSong />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;