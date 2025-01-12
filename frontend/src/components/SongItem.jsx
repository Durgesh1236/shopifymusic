import React, { useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { UserData } from '../context/User';
import { SongData } from '../context/Song';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

const SongItem = ({name,image,desc,id}) => {

  const [saved, setSaved] = useState(false)
  const { setSelectedSong, isPlaying, setIsPlaying } = SongData();
  const { addToPlaylist, user } = UserData();

  const playList = user.playlist;
  useEffect(()=>{
    if(playList && playList.includes(id)){
      setSaved(true)
    }
  },[user]);
   
  const savetoPlaylistHandler = () => {
    setSaved(!saved);
    addToPlaylist(id);
  }

  return (
    <div className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <div className="relative group">
              <img className='rounded w-[160px]' src={image} alt="" />
              <div className="flex gap-2">
                <button className='absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' onClick={()=>{
                  setSelectedSong(id);
                  setIsPlaying(true);
                }}><FaPlay /></button>
                <button onClick={savetoPlaylistHandler} className='absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  { saved ? <FaHeart className='text-red-500 text-xl' /> : <FaRegHeart className='text-xl'/>}
                  </button>
              </div>
      </div>
      <p className='font-bold mt-2 mb-1'>{name.slice(0,12)}..</p>
      <p className='text-slate-200 text-sm'>{desc.slice(0,18)}..</p>
    </div>
  )
}

export default SongItem