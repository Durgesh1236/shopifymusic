import React from 'react'
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
        {album
      .filter((album) => album.description === "Song Album") 
      .map((item, index) => (
        <AlbumItem
          key={index}
          name={item.title}
          desc={item.description}
          id={item._id}
          image={item.thumbnail.url}
        />
      ))}
        </div>
      </div>

      <div className="mb-4">
  <h1 className="my-5 font-bold text-2xl">Best Singer Album Songs</h1>
  <div className="flex overflow-auto">
    {album
      .filter((album) => album.description === "Singer Album") 
      .map((item, index) => (
        <AlbumItem
          key={index}
          name={item.title}
          desc={item.description}
          id={item._id}
          image={item.thumbnail.url}
        />
      ))}
  </div>
</div>

<div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Best Bhakti Song</h1>
        <div className='flex overflow-auto'>
        {song
        .filter((song) => song.description === "Bhakti Song")
        .map((item,index) => (
          <SongItem key={index} name={item.title} desc={item.description} image={item.thumbnail.url} id={item._id} />
        ))}
        </div>
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Best New Song</h1>
        <div className='flex overflow-auto'>
        {song
        .filter((song) => song.description === "New Song")
        .map((item,index) => (
          <SongItem key={index} name={item.title} desc={item.description} image={item.thumbnail.url} id={item._id} />
        ))}
        </div>
      </div>
      
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Best 90's Old Song</h1>
        <div className='flex overflow-auto'>
        {song
        .filter((song) => song.description === "90's Old Song")
        .map((item,index) => (
          <SongItem key={index} name={item.title} desc={item.description} image={item.thumbnail.url} id={item._id} />
        ))}
        </div>
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Best Bhojpuri Songs</h1>
        <div className='flex overflow-auto'>
        {song
        .filter((song) => song.description === "Bhojpuri Song")
        .map((item,index) => (
          <SongItem key={index} name={item.title} desc={item.description} image={item.thumbnail.url} id={item._id} />
        ))}
        </div>
      </div>
    </Layout>
    </>
  )
}

export default Home
