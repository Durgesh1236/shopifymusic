import React, { useState } from 'react'
import Layout from '../components/Layout'
import { SongData } from '../context/Song'
import AlbumItem from '../components/AlbumItem'
import SongItem from '../components/SongItem'


const Home = () => {

  const { song, album } = SongData();
  
  return (
    <>
    <Layout>
    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
        {album.map((item,index) => (
          <AlbumItem key={index} name={item.title} desc={item.description} id={item._id} image={item.thumbnail.url} />
        ))}
        </div>
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto'>
        {song.map((item,index) => (
          <SongItem key={index} name={item.title} desc={item.description} image={item.thumbnail.url} id={item._id} />
        ))}
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Home
