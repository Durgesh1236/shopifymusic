import React from 'react'
import { SongData } from '../../context/Song'
import { MdDelete } from 'react-icons/md'

const ListAlbum = () => {

const {album, loading, deleteAlbum} = SongData()

const deleteAlbumHandler = (id) => {
  if(confirm("Are you sure you want to delete this song")){
    deleteAlbum(id);
  }
}

  return  loading ? <div className='grid place-items-center min-h-[80vh]'>
  <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
</div> : (
    <div className='md:mb-24 mb-24 mt-8 md:mt-0'>
      <p>All Album = ({album.length})</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr__1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Action</b>
        </div>
        {
            album.map((item,index)=>{
                return (
                    <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                        <img className='w-12' src={item.thumbnail.url} alt="" />
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                         {/* <input type="color" value={item.bgColour} /> */}
                        <button onClick={()=>deleteAlbumHandler(item._id)} className='px-2 w-8 h-8 text-center py-1 cursor-pointer bg-red-500 text-white rounded'><MdDelete /></button>
                    </div>
                )
            })
        }
      </div>
    </div>
  
  )
}

export default ListAlbum
