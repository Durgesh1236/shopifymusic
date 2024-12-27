import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout"
import { SongData } from '../context/Song'
import { assets } from '../assets/assets';
import { FaBookmark } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa6';
import { UserData } from '../context/User';

const PlayList = ({ user }) => {

  const { song, setSelectedSong, setIsPlaying } = SongData();
  const [myPlaylist, setMyPlaylist] = useState([])
  const { addToPlaylist } = UserData()

  useEffect(() => {
    if (song && user && Array.isArray(user.playlist)) {
      const filteredSongs = song.filter((e) => user.playlist.includes(e._id.toString())
      );
      setMyPlaylist(filteredSongs);
    }
  }, [song, user]);

  const onclickHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  }

  return (
    <Layout>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        {
          myPlaylist && myPlaylist[0] ? (
            <img src={myPlaylist[0].thumbnail.url} className='rounded w-48' alt="" />
          ) : (
            <img className='rounded w-48' src="https://via.placeholder.com/250" alt="" />
          )}

        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 id='username' className="text-3xl font-bold mb-4 md:text-5xl bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">{user.name} Playlist</h2>
          <h4>Your Favourate Songs</h4>
          <p className='mt-1'>
            <img src={assets.spotify_logo} className='inline-block w-6' alt="" />
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className='mr-4'>#</b>
        </p>
        <p>Artist</p>
        <p className='hidden sm:block'>Description</p>
        <p className='text-center'>Actions</p>
      </div>
      <hr />
      {
        myPlaylist && myPlaylist.map((item, index) => (
          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer" key={index}>
            <p className='text-white'>
              <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
              <img src={item.thumbnail.url} className='inline w-10 mr-5' alt="" />
              {item.title.slice(0, 14)}...
            </p>
            <p className='text-[15px] mt-2'>{item.singer.slice(0, 26)}...</p>
            <p className='text-[15px] mt-2 hidden sm:block'>{item.description.slice(0, 20)}...</p>
            <p className='flex justify-center items-center gap-5'>
              <p className='text-[15px] text-center' onClick={() => savePlayListHandler(item._id)}><FaBookmark /></p>
              <p className='text-[15px] text-center'
                onClick={() => onclickHandler(item._id)} ><FaPlay /></p>
            </p>
          </div>
        ))
      }
    </Layout>
  )
}

export default PlayList
