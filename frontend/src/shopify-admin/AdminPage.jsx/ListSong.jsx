import React, { useEffect, useState } from 'react'
import { SongData } from '../../context/Song'
import { MdDelete } from 'react-icons/md';

const ListSong = () => {

  const {song, loading, deleteSong, fetchSong} = SongData();
  const deleteHandler = (id) => {
    if(confirm("Are you sure you want to delete this song")){
      deleteSong(id);
    }
  }

  useEffect(()=>{
    fetchSong();
  },[])

  return loading ? <div className='grid place-items-center min-h-[80vh]'>
  <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
</div> : (
    <div className='md:mb-24 mb-24 mt-8 md:mt-0'>
      <p>All Songs List</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr__1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Album</b>
            <b>Singer</b>
            <b>Action</b>
        </div>
        {
            song.map((item,index)=>{
                return (
                    <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                        <img className='w-12' src={item.thumbnail.url} alt="" />
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <p>{item.singer}</p>
                        <p onClick={()=>deleteHandler(item._id)} className='px-2 w-8 h-8 py-2 bg-red-500 text-white rounded'><MdDelete /></p>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default ListSong
