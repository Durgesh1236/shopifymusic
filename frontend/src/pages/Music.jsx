import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { SongData } from '../context/Song'
// import { useParams } from 'react-router-dom';
// import { assets } from '../assets/assets';
import { FaBookmark } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa6';
import { UserData } from '../context/User';

const Music = () => {

  const { albumSong, setSelectedSong, setIsPlaying, song } = SongData();
  const { addToPlaylist } = UserData();

//   useEffect(() => {
//     fetchAlbumSong(params.id);
//   }, [params.id]);

  const onclickHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  }

  return (
    <Layout>
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
              song && song.map((item, index) => (
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

export default Music
