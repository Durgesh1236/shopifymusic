import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { SongData } from '../context/Song'
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaBookmark } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa6';
import { UserData } from '../context/User';

const Album = () => {

  const { fetchAlbumSong, albumData, albumSong, setSelectedSong, setIsPlaying } = SongData();
  const params = useParams();
  const { addToPlaylist } = UserData();

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [params.id]);

  const onclickHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  }

  return (
    <Layout>
      {
        albumData && (
          <>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
              {
                albumData.thumbnail &&
                <img src={albumData.thumbnail.url} className='rounded w-48' alt="" />
              }

              <div className="flex flex-col">
                <p>Playlist</p>
                <h2 id='username' className="text-3xl font-bold mb-4 md:text-5xl bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">{albumData.title} Playlist</h2>
                <h4>{albumData.description}</h4>
                <p className='mt-1'>
                  <img src={assets.logo_img} className='inline-block w-6' alt="" />
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
              albumSong && albumSong.map((item, index) => (
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
          </>
        )}
    </Layout>
  )
}

export default Album
